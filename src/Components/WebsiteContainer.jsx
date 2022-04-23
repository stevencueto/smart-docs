
import { useContext, useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom'
import DocsEditor from './Docs/DocsEditor';
import DocsContext from '../context/DocsContext';
import React from 'react';
import Dashboard from './Dahsboard/Dashboard';
import Register from './register/Register';
import docsLink from './helpers/docsAPI';
import { NewDoc } from './Dahsboard/NewDoc';
const WebsiteContainer = () => {
    const [docs, setDocs]= useState([])
    const newDocAPICall = async(doc)=>{
      try {
        const req = await fetch(`${docsLink}/doc`,  {
          method: 'PUT',
          body: JSON.stringify(doc),
          headers: {
              'x-access-token': localStorage.getItem('docs-token'),
              'Content-Type': 'application/json',
          }
        })
        const res = await req.json()
        if(res.success === true){
          setDocs([...docs, res.data])
          console.log(res.data)
        }
      } catch (error) {
        
      }
    }
  return (
      <DocsContext.Provider value={'some'}>
        <Routes>
          <Route path="/" exact element={<Dashboard/>} />
          <Route path="/new" exact element={<NewDoc/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/documents/:id"  element={<DocsEditor/>} />
        </Routes>
      </DocsContext.Provider>
  )
}

export default WebsiteContainer;