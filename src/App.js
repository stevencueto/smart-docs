import './App.css';
import React, { useState, useEffect, useMemo } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Wrapper from './components/Wrapper';
import UserContext from './context/UserContex';
function App() {
  const [user, setUser]= useState(null)
  const findUser = ()=>{
    const locate =localStorage.getItem('docs-user')
    if(locate) return setUser(JSON.parse(locate))
  }
  const provValue = useMemo(()=>({user, setUser, findUser}), [user, setUser])
  return (
    <div className="App">
      <UserContext.Provider value={provValue}>
        <Wrapper/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
