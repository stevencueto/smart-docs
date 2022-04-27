import React, {useState, useEffect, useCallback} from "react";
import ReactQuill, {Quill} from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import socketLink from "../helpers/socketDoc";

export const Editor = () => {
    const {id} = useParams()
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
        editor.enable()
      })
  
      socket.emit('find-document', id)
    }, [socket, editor, id])
  
    
  
    useEffect(() => {
      if (socket == null || editor == null) return
  
      const socketC = setInterval(() => {
        socket.emit('save-document', editor.getContents())
      }, 1000)
  
      return () => {
        clearInterval( socketC )
      }
    }, [socket, editor])
  
    useEffect(() => {
      if (!socket|| !editor) return
  
      const setChange = delta => {
        editor.updateContents(delta)
        console.log('is it updating?')
      }
      socket.on('receive-changes', setChange)
  
      return () => {
        socket.off('receive-changes', setChange)
      }
    }, [socket, editor])
const editorRef = useCallback(container => {
    if (!container) return

    const quill = new Quill('.quill')
    quill.disable()
    quill.setText('Loading...')
    setEditor(quill)
  }, [])
  useEffect(() => {
    if (!socket|| !editor) return

    const handleChange = (delta, oldDelta, source) => {
      console.log(source)
      if (source !== 'user') return
      socket.emit('send-changes', delta )
    }
    editor.on('text-change', handleChange)

    return () => {
      editor.off('text-change', handleChange)
    }
  }, [socket, editor])

  return (
    <div className="text-editor">
      {/* <EditorToolbar /> */}
      <ReactQuill
      //disable the state so is uncontrolled
        ref={editorRef}

        theme="snow"
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;