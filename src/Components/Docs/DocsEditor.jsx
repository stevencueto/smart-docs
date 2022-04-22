import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"

import './styles.css'
const SAVE_INTERVAL_MS = 2000
const Font = Quill.import('formats/font'); // <<<< ReactQuill exports it
Font.whitelist = ['mirza', 'roboto'] ; // allow ONLY these fonts and the default
Quill.register(Font, true);
const  toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean'],
    ['link', 'image'],                                         // remove formatting butto
  ] ;

export default function DocsEditor() {
  const { id: documentId } = useParams()
  const [socket, setSocket] = useState()
  const [editor, setEditor] = useState()

  useEffect(() => {
    const socketConection = io("http://localhost:3002/", { transports : ['websocket'] })
    setSocket(socketConection)

    return () => {
      socketConection.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!socket || !editor) return

    socket.once("send-document", document => {
      editor.setContents(document?.data)
      editor.enable()
    })

    socket.emit("find-document", '626251ffed1c710ec6581522')
  }, [socket, editor, documentId])

  useEffect(() => {
    if (socket == null || editor == null) return

    const interval = setInterval(() => {
      socket.emit("save-document", editor.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, editor])

  useEffect(() => {
    if (!socket|| !editor) return

    const handler = delta => {
      editor.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, editor])

  useEffect(() => {
    if (!socket|| !editor) return

    const handler = (delta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    }
    editor.on("text-change", handler)

    return () => {
      editor.off("text-change", handler)
    }
  }, [socket, editor])

  const editorRef = useCallback(container => {
    if (!container) return

    container.innerHTML = ""
    const newQuill = document.createElement("div")
    container.append(newQuill)
    const quill = new Quill(newQuill, {
      theme: "snow",
      modules: { 
          toolbar: toolbarOptions,
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
          }
        },
    })
    quill.disable()
    quill.setText('Loading...')
    setEditor(quill)
  }, [])
  return <div className="editor" ref={editorRef}>

  </div>
}