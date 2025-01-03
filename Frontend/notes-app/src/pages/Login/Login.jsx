import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import PasswordInput from '../../components/Input/PasswordInput'
import {useDispatch} from "react-redux"
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice'
import axios from "axios"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const Login = () => {
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState(null);
    const  dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)){
            setError("please enter a valid email adress");
            return;
        }

        if(!password){
            setError("Please enter the password");
            return;
        }

        setError("");

        try {
            dispatch(signInStart());
            
            const res = await axios.post("http://localhost:3000/api/auth/login",{email,password},{withCredentials:true})

            if(res.data.success === false){
                toast.error(res.data.message)
                console.log(res.data);
                dispatch(signInFailure(data.message))
            }
            
            toast.success(res.data.message)
            dispatch(signInSuccess(res.data))

            navigate("/");
            
        } catch (error) {
            toast.error(err.message)
            dispatch(signInFailure(error.message))

        }
    };
  return (
    <div>

        <div className='flex items-center justify-center mt-28'>
            <div className='w-96 border rounded bg-white px-7 py-10'>
                <form onSubmit={loginHandler}>
                    <h4 className='text-2xl mb-7'>Login</h4>
                    <input 
                    type="text" placeholder='Email'
                     className='input-box'
                      value={email} 
                      onChange={(e)=>setEmail(e.target.value)}
                      />
                    <PasswordInput  value={password}
                     onChange={(e)=>setPassword(e.target.value)}/>
                     {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                    <button type='submit' className='button-primary'>Login</button>
                    <p className='text-sm text-center mt-4'>Not Registered yet?{""}<Link to="/signup" className='text-blue-600'>
                    Create an Account</Link></p>
                </form>
            </div>
        </div>
    
    
    
    
    
    
    </div>
  )
}

export default Login