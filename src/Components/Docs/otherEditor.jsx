import React, {useState, useEffect, useCallback} from "react";
import ReactQuill, {Quill} from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import socketLink from "../helpers/socketDoc";
import ModalPermission from "./requestPermission";


export const Editor = (props) => {
    const [showModal, setShowModal] = useState(false);
    const handleModal = ()=>{
        setShowModal(!showModal)
    }
    const {id} = useParams()
    const [socket, setSocket] = useState()
    const [editor, setEditor] = useState()
    const token = localStorage.getItem('docs-token')
  
    useEffect(() => {
      const socketConection = io(socketLink, { transports : ['websocket'] ,auth: {
          token: token
      }})
      setSocket(socketConection)
      props.handleShow()
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
      }
      socket.on('receive-changes', setChange)
  
      return () => {
        socket.off('receive-changes', setChange)
      }
    }, [socket, editor])

    useEffect(() => {
      if (!socket|| !editor) return
  
      const setChange = delta => {
        editor.setText(delta)
        socket.disconnect()
        handleModal() 
      }
      socket.on('close-editor', setChange)
  
      return () => {
        socket.off('close-editor', setChange)
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
      <ModalPermission showModal={showModal} setShowModal={setShowModal} handleModalDelete={handleModal} doc={id}/>

      <EditorToolbar />
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