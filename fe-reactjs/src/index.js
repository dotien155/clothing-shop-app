import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Blog from './components/Blog/Index';
import Detail from './components/Blog/Detail';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Member/Register';
import Login from './components/Member/Login';
import Index from './components/Member/Index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>

          {/* Blog */}
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/blog' element={<Blog />}></Route>
          <Route path='/blog/detail/:id' element={<Detail />}></Route>

          {/* Member/ Login, Register */}
          <Route path='/member' element={<Index />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
