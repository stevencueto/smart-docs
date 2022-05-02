import React, {useState, useEffect, useCallback} from "react";
import "react-quill/dist/quill.snow.css";
import Quill from 'quill'
import "./styles.css";
import { io } from "socket.io-client"
import {useNavigate, useParams } from "react-router-dom"
import socketLink from "../helpers/socketDoc";
import ModalPermission from "./requestPermission";
import toolbarOptions from "./toolBarOptions";
import './docs-css.css'
import { handlers } from "./toolBarOptions";
import DocHeader from "./DocHeader";
import ShareModal from './ShareModal'
import docsLink from "../helpers/docsAPI";
export const Editor = (props) => {
  let navigate = useNavigate()
  const [showModalFriends, setShowModalFriends] = useState(false);
  const [doc, setDoc] = useState({})
    const handleModalFriends = ()=>{
        setShowModalFriends(!showModalFriends)
    }

    const [showModal, setShowModal] = useState(false);
    const handleModal = ()=>{
        setShowModal(!showModal)
    }
    const {id} = useParams()
    const [socket, setSocket] = useState()
    const [editor, setEditor] = useState()
    const token = localStorage.getItem('docs-token')

    const findDoc = async() =>{
      try {
          const req = await fetch(`${docsLink}doc/data/${id}`, {
           method: 'GET',
           headers: {
               'x-access-token': token,
           }
         })
          const res = await req.json()
          if(res.success === true){
           setDoc(res.data)
          }
          console.log(res)
      } catch (error) {
       console.log(error)
      } 
   }
   
  
    useEffect(() => {
      if(!localStorage.getItem('docs-token')) navigate('/login', {replace: true}) 
      const socketConection = io(socketLink, { transports : ['websocket'] ,auth: {
          token: token
      }})
      setSocket(socketConection)
      props.handleShow()
      findDoc()
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
        props.handleShow(true)
        handleModal() 
      }
      socket.on('close-editor', setChange)
  
      return () => {
        socket.disconnect()
      }
    }, [socket, editor])
const editorRef = useCallback(div => {
    if (!div) return

    div.innerHTML = ""
    const newQuill = document.createElement("div")
    div.append(newQuill)
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
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('link', handlers);
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
      <ShareModal doc={doc} showModalFriends={showModalFriends} setShowModalFriends={setShowModalFriends} handleModalFriends={handleModalFriends}/>
      <DocHeader doc={doc} handleModalFriends={handleModalFriends}/>
      {showModal && <ModalPermission showModal={showModal} setShowModal={setShowModal} handleModal={handleModal} doc={id}/>}

      <div
      //disable the state so is uncontrolled
        ref={editorRef}
        className="quill"
      />
    </div>
  );
};

export default Editor;