
import { useEffect, useState, useMemo} from 'react';
import {Route, Routes , useNavigate} from 'react-router-dom'
import DocsEditor from './Docs/DocsEditor1';
import DocsContext from '../context/DocsContext';
import React from 'react';
import Dashboard from './Dahsboard/Dashboard';
import Register from './register/Register';
import docsLink from './helpers/docsAPI';
import { NewDoc } from './Dahsboard/NewDoc';
const Wrapper = () => {
  let navigate = useNavigate();
  const [docs, setDocs]= useState([])
  const [newDoc, setNewDoc]= useState({
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
        setDocs(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const newDocAPICall = async()=>{
    console.log(newDoc)
    try {
      const req = await fetch(`${docsLink}doc`,  {
        method: 'POST',
        body: JSON.stringify(newDoc),
        headers: {
          'x-access-token': localStorage.getItem('docs-token'),
          'Content-Type': 'application/json',
        }
      })
      const res = await req.json()
      if(res.success === true){
        setDocs([...docs, res.data])
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
        const newDocs = docs.filter(doc => doc._id !== edit._id)
        console.log(newDocs)
        setDocs([res.data, ...newDocs])
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    populateFunction()
  }, [])
  const provValue = useMemo(()=>({newDocAPICall, populateFunction, editDocAPICall}), [])
  return (
    <DocsContext.Provider value={provValue}>
        <Routes>
          <Route path="/" exact element={<Dashboard docs={docs}/>} />
          <Route path="/new" exact element={<NewDoc newDoc={newDoc} handleChange={handleChange}/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/documents/:id"  element={<DocsEditor/>} />
        </Routes>
      </DocsContext.Provider>
  )
}

export default Wrapper;