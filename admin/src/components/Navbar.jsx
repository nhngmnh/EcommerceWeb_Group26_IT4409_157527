
import React, { useCallback, useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
    const {token,setToken}=useContext(AdminContext)
    const navigate = useNavigate()
    const logout=()=>{
        navigate('/')
        token && setToken('')
        localStorage.removeItem('token')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt=""/>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-black '>Admin</p>
        </div>
        {token?<button onClick={logout} className='bg-blue-400 text-black text-sm px-10 py-2 rounded-full'>Logout</button>:<button onClick={()=>navigate('/login')} className='bg-primary text-black text-sm px-10 py-2 rounded-full'>Sign in</button>}
        
    </div>
  )
}

export default Navbar
