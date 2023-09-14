import axios from "axios";
import React, { createContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import $  from 'jquery';
import { useState } from "react";
import { baseUrl } from "../utils/baseUrl.jsx";

export const cartContext = createContext();

export default function CartContext({ children }) {


  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);

  const [numOfWishlist, setNumOfWishlist] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState(null);
  const [cartId, setCartId] = useState(null);


  async function addProductToCart(proId) {


  const {data}=  await axios.post(`${baseUrl}/cart`,{
           'productId': proId,
         },
         {
           headers: { 'token': localStorage.getItem("token"),
           },
         }
       );
        if(data.status ==='success'){
          setNumOfCartItems(data.numOfCartItems);
          setTotalCartPrice(data.data.totalCartPrice);
          setCartProducts(data.data.products);
          getCartProducts();
          toast.success(data.message,{duration:1000,className:" text-success"});
          $('#addBtn').fadeOut(500);
          $('#delBtn').fadeIn(500);
        }else{

          toast.error(data.response.data.message,{duration:2000,className:"bg-black text-white"});
        }


       
       }
 

  

    async function getCartProducts(){
      try {
        const {data} = await axios.get(`${baseUrl}/cart`,{
        headers :{ 'token' : localStorage.getItem('token') }
      })
        if(data.status === 'success'){
          setNumOfCartItems(data.numOfCartItems);
          setTotalCartPrice(data.data.totalCartPrice);
          setCartProducts(data.data.products);
          setCartId(data.data._id);
          localStorage.setItem("cartId",data.data._id)
        }
    } catch (error) {
  
        toast.error("No Cart exist for this User",{duration:2000,className:"text-danger px-4 fw-bolder"});
       
      }}
    

    async function removeCartItem(id){
      try {
        const {data} = await axios.delete(`${baseUrl}/cart/${id}`,{
        headers :{ 'token' : localStorage.getItem('token') }
      })
      if(data.status ==='success'){
          setNumOfCartItems(data.numOfCartItems);
          setTotalCartPrice(data.data.totalCartPrice);
          setCartProducts(data.data.products);
          getCartProducts();
          toast.success('Product removed successfully from your cart',{duration:3000,className:" text-danger",iconTheme: {
            primary: '#dc3545',
            secondary: '#fff',
          },});
        $('#delBtn').fadeOut(500);
        $('#addBtn').fadeIn(500);
      }
      } catch (error) {
        toast.error(error.data.message,{duration:3000,className:"bg-black text-white"});
        
      }
    }


    
    async function updateCount(id,numCount){
      try {
        const {data} = await axios.put(`${baseUrl}/cart/${id}`,{
        'count' : numCount
      },{
        headers :{ 'token' : localStorage.getItem('token') }
      })
      if(data.status==='success'){
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        getCartProducts();
      }} catch (error) {
        toast.error(error,{duration:1000,className:"bg-black text-white"});
      }
    }

    async function getWishlist(){
      try {
        const {data} = await axios.get(`${baseUrl}/wishlist`,{
          headers :{ 'token' : localStorage.getItem('token') }
        })
        if(data.status === 'success'){
          setNumOfWishlist(data.count);
          setWishlistProducts(data.data);
        }
        return true;
      } catch (error) {
        toast.error(error,{duration:1000,className:"bg-black text-white"});
      }
    }

    async function addToWishlist(id){
      try {
        const {data} = await axios.post(`${baseUrl}/wishlist`,{
        "productId": id
      },{
        headers :{ 'token' : localStorage.getItem('token') }
      });
      if(data.status === 'success'){
          setNumOfWishlist(data.count);
          setWishlistProducts(data.data);
          getWishlist();
          toast.success(data.message,{duration:3000,className:" text-success"});
        return true;
      }else{
        toast.error(data.message,{duration:3000,className:"bg-black text-white"});
        return false;
      }
      } catch (error) {
        toast.error(error,{duration:1000,className:"bg-black text-white"});
      }};

      async function removeWishlist(id){
        try {
          const {data} = await axios.delete(`${baseUrl}/wishlist/${id}`,{
          headers :{ 'token' : localStorage.getItem('token') }
        })
        if(data.status==='success'){
          setNumOfWishlist(data.count);
          setWishlistProducts(data.data);
          getWishlist();
            toast.success(data.message,{duration:3000,className:" text-danger",iconTheme: {
              primary: '#dc3545',
              secondary: '#fff',
            },});
          $('#delWishlist').fadeOut(100);
          $('#addWishlist').fadeIn(100);
          return true;
        }else{
          toast.error(data.message,{duration:3000,className:"bg-black text-white"});
          return false;
        }
        } catch (error) {
          toast.error(error,{duration:1000,className:"bg-black text-white"});
        }
      }
      useEffect(() => {
        if (localStorage.getItem('token') !== null) {
      
          getWishlist();
          getCartProducts();

      
        }
      
      }, [])


      
  return (
    <cartContext.Provider value={{ addProductToCart,numOfCartItems,totalCartPrice,cartProducts,
    removeCartItem,updateCount,addToWishlist,removeWishlist,numOfWishlist,wishlistProducts,cartId }}>
      {children}
    </cartContext.Provider>
  );
}
