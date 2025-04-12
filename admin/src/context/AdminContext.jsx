
import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
//import { get } from "mongoose";
export const AdminContext= createContext()
const AdminContextProvider=(props)=>{
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
    const [products,setProducts]=useState([])
    const [dashData, setDashData]=useState(false)
    const [carts, setCarts]=useState([])
    const [comments, setComments]=useState([])
    const [replies,setReplies]=useState([])
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const getProducts=async()=>{
        try {
            const { data } = await axios.get(backendurl + '/api/admin/all-products', { headers: { token } });

            if (data.success){
                setProducts(data.products)
                console.log(data.products);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getCarts =async(req,res)=>{
        try {
            const {data}=await axios.get(backendurl+'/api/admin/all-carts',{headers:{token}})
            if (data){
                
                setCarts(data.carts)
            } else {
                res.json({message:"thatbai"})
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getComments= async(req,res)=>{
        try {
            const {data}=await axios.get(backendurl+'/api/admin/comments',{headers:{token}})
            if (data){
                setComments(data.comments)
                console.log(data.comments);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const changeAvailability= async(itemId)=>{
        try {
            const {data}=await axios.post(backendurl+ '/api/admin/change-product-availability',{productId:itemId},{headers:{token}})
            if (data.success){
                toast.success(data.message)
            } else {
                console.log(data.message);
                
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.message)
        }
    }
    const removeCart = async(cartId) => {
        try {
            const {data}= await axios.post(backendurl+`/api/admin/delete-cart/${cartId}`)
            if (!data){
                toast.error("No data")
            } 
            console.log(data.cart);
            setCarts(prevCarts => prevCarts.filter(cart => cart._id !== cartId));
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const changeBestsellerStatus = async (productId)=>{
        try {
            const {data}= await axios.post(backendurl+'/api/admin/change-bestseller-status',{productId:productId},{headers:{token}})
            if (!data){
                toast.error("Can't find data");
            }
            else {
                toast.success('Change bestseller status successfully')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getDashData= async()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/admin/admin-dashboard',{headers:{token}})
            if (data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getAllReplies = async ()=>{
        try {
            const repliesData=await axios.get(backendurl+'/api/admin/get-replies',{headers:{token}});
            if (!replies){
                toast.error("No data")
            }
            setReplies(repliesData)
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            
        }
    }
    const replyComment = async (commentId, text) => {
        try {
          const x = await axios.post(backendurl + '/api/admin/reply', { commentId, text }, {
            headers: { token }
          });
          if (!x) {
            toast.error("Can't reply");
            return null; // nếu lỗi thì return null
          }
          toast.success("Reply successfully");
          return x; // return data để hàm gọi bên ngoài biết thành công
        } catch (error) {
          toast.error(error.message);
          console.log(error);
          throw error; // ném lỗi ra ngoài để try/catch ở nơi gọi xử lý
        }
      };
    const value={
        token,setToken,
        backendurl,products,setProducts,
        getProducts,changeAvailability,
        dashData,getDashData,setDashData,
        carts, setCarts,
        comments, setComments,
        getCarts, getComments, removeCart,
        changeBestsellerStatus,
        replies,setReplies,getAllReplies,
        replyComment,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider