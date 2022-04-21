import {Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import DocsEditor from './Docs/DocsEditor';
import React from 'react';
import RandomComp from './RandomComp';
const WebsiteContainer = (props) => {
    const doc = {}
  return (
    <div>
        <Routes>
			<Route path="/" exact element={<RandomComp/>} />
			<Route path="/documents/:id"  element={<DocsEditor document={doc}/>} />
        </Routes>
    </div>
  )
}

export default WebsiteContainer;