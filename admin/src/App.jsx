import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
export default function App() {
  const {token} = useContext(AdminContext)
  return token ? (
    <div><ToastContainer/>
     <Navbar/>
       <div className='flex items-start '>
        <Sidebar/>
        </div>
    </div>
    
  ):(
    <div><Login/></div>
  )
}