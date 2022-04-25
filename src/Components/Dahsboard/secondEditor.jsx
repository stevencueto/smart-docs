import { useRef, useState, useEffect } from 'react'
import {Editor} from '@tinymce/tinymce-react'
import socketLink from '../helpers/socketDoc'
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"

function SecondEditor() {
    const id = useParams()
    const [socket, setSocket] = useState()
    const [findingDoc, setFindingDoc] = useState(false)
    const [editorState, setEditorState] = useState('')
    const editorRef = useRef(null)
    const getVal = ()=>{
        const tttt = editorRef.current.getContent()
        console.log(typeof tttt)
        console.log(editorRef.current.getContent())
    }

    const findDoc = () =>{
        socket.once('send-document', document => {
            console.log(document)
            setEditorState(document.data)
        })

        socket.emit('find-document', id)

    }

    useEffect(() => {
        if(!findingDoc) return
        findDoc()

      }, [findingDoc])

      useEffect(()=>{
        if (!socket || !editorState) return
        const handler = () => {
            setEditorState(editorRef.current.getContent())
        }
        socket.on('receive-changes', handler)
    
        return () => {
          socket.off('receive-changes', handler)
        }

    },[editorState, socket])

    useEffect(() => {
        const socketConection = io(socketLink, { transports : ['websocket'] })
        setSocket(socketConection)
        setFindingDoc(true)
    
        return () => {
          socketConection.disconnect()
        }
      }, [])

      useEffect(() => {
        if (!socket|| !editorState) return
    
        const socketC = setInterval(() => {
          socket.emit('save-document', editorRef.current.getContent())
        }, 1000)
        return () => {
          clearInterval( socketC )
        }
      }, [socket, editorState])
  return (
    <div>
        <Editor
        value={editorState}
        onEditorChange={(newValue, editor) => setEditorState(newValue)}
        onInit={(evt, editor)=>editorRef.current = editor}
        initialValue='<p>Loading Document</p>'

        />
        <button onClick={getVal}>vlivk</button>
    </div>
  )
}

export default SecondEditor