import React from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import{useSelector} from "react-redux"
import Navbar from './components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"



const App = () => {


  return (
  <Router>
    <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    <ToastContainer position="top-center"/>
 </Router>
  )
}

export default App

