import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axios from 'axios';
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const SignUp = () => {

    const [name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError]=useState(null);

    const navigate = useNavigate();

    const SignupHandler=async (e)=>{
        e.preventDefault();
        if(!name){
            setError("Please Enter Your Name");
            return;
        }
        
        if(!validateEmail(email)){
             setError("please enter a valid email adress");
             return;
        }

        if(!password){
            setError("Please Enter the Password");
            return;
        }

        setError('')

        try {
            const res= await axios.post("http://localhost:3000/api/auth/signup",
            {username: name,email,password},{withCredentials:true})

            if(res.data.success === false){
                toast.error(res.data.message)
                setError(res.data.message)
                return
            }
            
            toast.success(res.data.message)
            setError("")

            navigate("/login")


        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
            setError(error.message)
        }
    }
  return (
    <div>

        <div className='flex items-center justify-center mt-28'>
            <div className='w-96 border rounded bg-white px-7 py-10'>
                <form onSubmit={SignupHandler}>
                    <h4 className='text-2xl mb-7'>SignUp</h4>
                    <input type="text" placeholder='Name' className='input-box'value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" placeholder='Email' className='input-box'value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <PasswordInput  value={password}
                     onChange={(e)=>setPassword(e.target.value)}/>
                      {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                    <button type='submit' className='button-primary'>Create Account</button>
                    <p className='text-sm text-center mt-4'>Already Registered?{""}<Link to="/login" className='text-blue-600'>
                    Login Here</Link></p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp