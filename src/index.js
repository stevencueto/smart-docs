import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { FriendsProvider } from './context/FriendContex';
import './index.css'
import './input.css'
import { BrowserRouter, } from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <FriendsProvider>
        <App />
    </FriendsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
