import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AddProduct from "./pages/AddProduct";
import ProductsList from "./pages/ProductsList";
export default function App() {
  const {token} = useContext(AdminContext)
  return token ? (
    <div><ToastContainer/>
     <Navbar/>
       <div className='flex items-start '>
        <Sidebar/>
        <Routes>
          <Route path="/add-product" element={<AddProduct/>}/>
          <Route path="list-product" element={<ProductsList/>}/>
        </Routes>
        </div>
        
    </div>
    
  ):(
    <div><Login/></div>
  )
}