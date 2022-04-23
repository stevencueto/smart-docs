import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import toolbarOptions from "./toolBarOptions"
import socketLink from "../helpers/socketDoc"
import './styles.css'
export default function DocsEditor() {
  const { id: documentId } = useParams()
  const [socket, setSocket] = useState()
  const [editor, setEditor] = useState()

  useEffect(() => {
    const socketConection = io(socketLink, { transports : ['websocket'] })
    setSocket(socketConection)

    return () => {
      socketConection.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!socket || !editor) return

    socket.once('send-document', document => {
      editor.setContents(document?.data)
      editor.enable()
    })

    socket.emit('find-document', '626251ffed1c710ec6581522')
  }, [socket, editor, documentId])

  useEffect(() => {
    if (socket == null || editor == null) return

    const interval = setInterval(() => {
      socket.emit('save-document', editor.getContents())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [socket, editor])

  useEffect(() => {
    if (!socket|| !editor) return

    const handler = delta => {
      editor.updateContents(delta)
    }
    socket.on('receive-changes', handler)

    return () => {
      socket.off('receive-changes', handler)
    }
  }, [socket, editor])

  useEffect(() => {
    if (!socket|| !editor) return

    const handler = (delta, source) => {
      if (source !== 'user') return
      socket.emit('send-changes', delta)
    }
    editor.on('text-change', handler)

    return () => {
      editor.off('text-change', handler)
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