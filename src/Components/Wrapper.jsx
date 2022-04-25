
import React, { useEffect, useMemo, useState} from 'react';
import {Route, Routes , useNavigate} from 'react-router-dom'
import DocsEditor  from './Docs/DocsEditor1'
import Dashboard from './Dahsboard/Dashboard';
import Register from './register/Register';
import docsLink from './helpers/docsAPI';
import { NewDoc } from './Dahsboard/NewDoc';
import ThemeContextPer from '../context/DocsContext';
import SecondEditor from './Dahsboard/secondEditor';
const Wrapper = () => {
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
        setDocs(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const newDocAPICall = async(doc)=>{
    console.log(doc)
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
    } catch (error) {
      console.log(error)
    }
  }
  const [theme, setTheme] = useState('Black')
  const toggleTheme =()=>{
    if(theme === "blakc"){
      setTheme('white')
    }else{
      setTheme('black')
    }
  }
  const provValue = useMemo(()=>({theme, toggleTheme}), [theme, setTheme, toggleTheme])
  useEffect(()=>{
    populateFunction()
  }, [])
  return (
    <ThemeContextPer.Provider value={provValue}>
        <Routes>
          <Route path="/" exact element={<Dashboard deleteDocAPICall={deleteDocAPICall} editDocAPICall={editDocAPICall} docs={docs}/>} />
          <Route path="/new" exact element={<NewDoc newDocAPICall={newDocAPICall} newDoc={newDoc} handleChange={handleChange}/>} />
          <Route path="/edit" exact element={<SecondEditor/> } />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/documents/:id"  element={<DocsEditor/>} />
        </Routes>
   </ThemeContextPer.Provider>

  )
}

export default Wrapper;