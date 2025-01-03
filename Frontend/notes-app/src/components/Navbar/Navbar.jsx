import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { Link, useNavigate } from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'
import {useDispatch} from "react-redux"
import { signoutFailure, signoutStart, signoutSuccess } from '../../redux/user/userSlice'
import axios from 'axios'
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Navbar = ({userInfo,handleClearSearch,onSearchNote}) => {

  const [searchQuery,setSearchQuery] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  };

  const onClearSearch =  () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = async () => {
    try {
      dispatch(signoutStart())

      const res = await axios.get("http://localhost:3000/api/auth/logout",{withCredentials:true})

      if(res.data.success === false){
        dispatch(signoutFailure(res.data.message))
        toast.error(res.data.message)
        return
      }
      
      toast.success(res.data.message)
      dispatch(signoutSuccess())
      navigate("/login")
    } catch (error) {
      toast.error(error.message)
      dispatch(signoutFailure(error.message))
    }
  }



  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <Link to={"/"}>
        <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
        </Link>
        
        <Searchbar
         value={searchQuery}
         onChange={({target})=>{
          setSearchQuery(target.value);
         }}
         handleSearch={handleSearch}
         onClearSearch={onClearSearch}
        
        />
        <ProfileInfo userInfo= {userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar