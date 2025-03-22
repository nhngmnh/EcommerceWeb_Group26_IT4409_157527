import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div><ToastContainer/>
    <Login/>
    </div>
    
  )
}