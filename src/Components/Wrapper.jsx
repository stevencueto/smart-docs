
import React, { useEffect, useMemo, useState, useContext} from 'react';
import {Route, Routes , useNavigate} from 'react-router-dom'
import DocsEditor  from './Docs/DocsEditor1'
import Dashboard from './Dahsboard/Dashboard';
import Register from './register/Register';
import docsLink from './helpers/docsAPI';
import { NewDoc } from './Dahsboard/NewDoc';
import Header from './Header/Header';
import Login from './Login';
import Profile from './profile/Profile';
import DocContext from '../context/DocContex';
// import SecondEditor from './Dahsboard/secondEditor';
import Editor from './Docs/otherEditor';
const Wrapper = () => {
  const [show, setShow] = useState(true)
  const handleShow = (newShow=false) =>{
    setShow(newShow)
  }
  let navigate = useNavigate();
  const [docs, setDocs]= React.useState([])
  const [newDoc, setNewDoc]= React.useState({
    title: "",
    type: "docs"
  })
  const handleChange = (e)=>{
    const {name, value}= e.target
    setNewDoc({
      ...newDoc,
      [name]: value
    })
    console.log(newDoc)
  }
  const populateFunction = async()=>{
    try {
      const req = await fetch(`${docsLink}doc/user`,  {
        method: 'GET',
        headers: {
            'x-access-token': localStorage.getItem('docs-token'),
        }
      })
      const res = await req.json()
      if(res.success){
        setDocs(res.data.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }
  const newDocAPICall = async(doc)=>{
    try {
      const req = await fetch(`${docsLink}doc`,  {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {
          'x-access-token': localStorage.getItem('docs-token'),
          'Content-Type': 'application/json',
        }
      })
      const res = await req.json()
      if(res.success === true){
        setDocs([res.data,...docs])
        setNewDoc({
          title: "",
          type: "docs"
        })
        navigate('/',{replace: true})
      }
    } catch (error) {
      console.log(error)
    }
  }
  const editDocAPICall = async(edit)=>{
    try {
      const req = await fetch(`${docsLink}doc/${edit._id}`,  {
        method: 'PUT',
        body: JSON.stringify(edit),
        headers: {
          'x-access-token': localStorage.getItem('docs-token'),
          'Content-Type': 'application/json',
        }
      })
      const res = await req.json()
      if(res.success === true){
        const newDocs = docs.map(doc => doc._id !== edit._id ? doc : edit)
        console.log(newDocs)
        setDocs(newDocs)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const deleteDocAPICall = async(doc)=>{
    try {
      const req = await fetch(`${docsLink}doc/${doc._id}`,  {
        method: 'DELETE',
        body: JSON.stringify(doc),
        headers: {
          'x-access-token': localStorage.getItem('docs-token'),
          'Content-Type': 'application/json',
        }
      })
      const res = await req.json()
      if(res.success === true){
        const newDocs = docs.filter(one => one._id !== doc._id)
        setDocs(newDocs)
      }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const provValue = useMemo(()=>({newDoc,newDocAPICall, editDocAPICall, deleteDocAPICall, docs, handleChange}), [newDoc,handleChange,newDocAPICall, editDocAPICall, deleteDocAPICall, docs])
  useEffect(()=>{
    populateFunction()
  }, [])

  return (
    <main>
      <DocContext.Provider value={provValue}>
      {show && <Header/>}
        <Routes>
          <Route path="/" exact element={<Dashboard handleShow={handleShow} deleteDocAPICall={deleteDocAPICall} editDocAPICall={editDocAPICall} docs={docs}/>} />
          <Route path="/new" exact element={<NewDoc newDocAPICall={newDocAPICall} newDoc={newDoc} handleChange={handleChange}/>} />
          <Route path="/edit" exact element={<Editor/> } />
          <Route path="/profile" exact element={<Profile/> } />
          <Route path="/login" exact element={<Login/> } />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/documents/:id"  element={<Editor handleShow={handleShow}/>} />
        </Routes>
        </DocContext.Provider>
  </main>
  )
}

export default Wrapper;