import { useCallback, useEffect, useState } from "react"
import { io } from "socket.io-client"
import Quill from "quill"
import socketLink from "../helpers/socketDoc"
import './minEditor.css'
export default function MinEditor({doc}) {
  const [editor, setEditor] = useState()

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
    quill.setText('')
    setEditor(quill)
  }, [])
  return <div className="min-editor" ref={editorRef}>

  </div>
}