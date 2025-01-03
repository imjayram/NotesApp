import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({onLogout,userInfo}) => {

     
  return (
   <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-500 font-medium bg-slate-100'>{getInitials(userInfo?.username)}</div>

      <div>
        <p className='text-sm font-medium'>{userInfo?.username}</p>
        <button className='text-sm text-red-700' onClick={onLogout}>Logout</button>
      </div>
   </div>
  )
}

export default ProfileInfo