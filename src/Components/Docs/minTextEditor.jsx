import { useCallback, useEffect, useState } from "react"
import { io } from "socket.io-client"
import Quill from "quill"
import socketLink from "../helpers/socketDoc"
import './minEditor.css'
export default function MinEditor({doc}) {
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
      editor.setContents(document.data)
    })

    socket.emit('find-document', doc.data)
  }, [socket, editor, doc.data])
  

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

  const editorRef = useCallback(minEditor => {
    if (!minEditor) return

    minEditor.innerHTML = ""
    const newQuill = document.createElement("div")
    minEditor.append(newQuill)
    const quill = new Quill(newQuill, {
      modules: { 
          toolbar: false,
        }
    })
    quill.disable()
    quill.setText('Loading...')
    setEditor(quill)
  }, [])
  return <div className="min-editor" ref={editorRef}>

  </div>
}