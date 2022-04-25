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

    const handleChange = (change) =>{
        setEditorState(change)
        socket.emit('send-changes', change)
    }
    useEffect(() => {
        const socketConection = io(socketLink, { transports : ['websocket'] })
        setSocket(socketConection)
    
        return () => {
          socketConection.disconnect()
        }
      }, [])
    useEffect(() => {
        if(!socket) return
        socket.once('send-document', document => {
            console.log('found')
            setEditorState(document.data)
        })
        socket.emit('find-document', id)
      }, [socket])


      useEffect(()=>{
        if (!socket || !editorState) return
            socket.on('receive-changes', change =>{
                setEditorState(change)
                console.log('te')
            })
            console.log('te')

    },[editorState, socket])

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
        ref={editorRef}
        value={editorState}
        onEditorChange={(newValue, editor) => handleChange(newValue)}
        onInit={(evt, editor)=>editorRef.current = editor}

        />
        <button onClick={getVal}>vlivk</button>
    </div>
  )
}

export default SecondEditor