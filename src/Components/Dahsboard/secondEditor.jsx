import { useRef, useState, useEffect } from 'react'
import {Editor} from '@tinymce/tinymce-react'
import socketLink from '../helpers/socketDoc'
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"

function SecondEditor() {
    // const id = useParams()
    const [socket, setSocket] = useState()
    const [editor, setEditor] = useState()
    const initialValue = ''
    const editorRef = useRef(null)
    const [value, setValue] = useState(initialValue ?? '');
    const getVal = ()=>{
        const tttt = editorRef.current.getContent()
        console.log(typeof tttt)
        console.log(editorRef.current.getContent())
    }

    useEffect(() => {
        const socketConection = io(socketLink, { transports : ['websocket'] })
        setSocket(socketConection)
    
        return () => {
          socketConection.disconnect()
        }
      }, [])

      useEffect(() => {
        if (socket == null || editor == null) return
    
        const socketC = setInterval(() => {
          socket.emit('save-document', editor.getContents())
        }, 1000)
    
        return () => {
          clearInterval( socketC )
        }
      }, [socket, editor])
  useEffect(() => 
  setValue(initialValue ?? ''),
   [initialValue]);
  return (
    <div>
        <Editor
        value={value}
        onEditorChange={(newValue, editor) => setValue(newValue)}
        onInit={(evt, editor)=>editorRef.current = editor}
        />
        <button onClick={getVal}>vlivk</button>
    </div>
  )
}

export default SecondEditor