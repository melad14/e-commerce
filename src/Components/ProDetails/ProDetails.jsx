import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import Slider from 'react-slick';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loading from '../Loading/Loding.jsx';
import { toast } from 'react-toastify';
import { AuthContext } from './../Context/AuthContext';

export default function ProDetails() {

let {userData}=useContext(AuthContext)
let navigate=useNavigate()
const { id } = useParams();
  const  {addProductToCart,removeCartItem } = useContext(cartContext);
  const [show, setShow] = useState(localStorage.getItem(`show-${id}`) || '');
  const [showw, setShoww] = useState(localStorage.getItem(`showw-${id}`) || '');
  const [productDetails, setProductDetails] = useState(null);

  async function addToCart(id){
    if(userData){
   await addProductToCart(id)
   localStorage.setItem(`show-${id}`, 'd-block');
   localStorage.setItem(`showw-${id}`, 'd-none');
   setShow('d-block');
   setShoww('d-none');
    }else{
      navigate('/login')
    }
  };

  async function removeFromCart(id){
    await removeCartItem(id)
    localStorage.setItem(`show-${id}`, 'd-none');
    localStorage.setItem(`showw-${id}`, 'd-block');
    setShow('d-none');
    setShoww('d-block');
    };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };  


  async function getProductDetails(){
    
    try {
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
      setProductDetails(data.data);
      
    } catch (error) {
      toast.error(error,{duration:1000,className:"bg-black text-white"});
    }
  };

  useEffect(function(){
    getProductDetails()
  },[]);

  return <HelmetProvider>
  
  { productDetails?<div className="container mt-5">
    <Helmet>
    <title>Details {productDetails.title}</title>
    </Helmet>
    <div className="row align-items-center gx-5">
      <div className="col-md-4 align-items-center pb-4 g-5 ">
      <Slider {...settings}>
        {productDetails.images.map(function(img,idx){return <img key={idx} src={img} className='w-100 my-5 rounded-5 ' alt={productDetails.title}/>})}
      </Slider>
      </div>
      <div className="col-md-8 py-5">
        <h4 className='text-success'>{productDetails.title}</h4>
        <p>{productDetails.description}</p>
        <h6 className='text-muted py-1'>Price : { productDetails.priceAfterDiscount ?  <> <span className='text-decoration-line-through text-danger'>{productDetails.price} </span> <span className=' fw-bold ps-2 text-success'>{ productDetails.priceAfterDiscount } EGP</span> </> : <span>{productDetails.price} EGP</span> }</h6>
        <h6 className='py-2 text-muted'>Quantity : {productDetails.quantity}</h6>
        <button id='addBtn' onClick={function(){addToCart(productDetails.id)}} className={`btnAdd btn btn-success w-100 mt-5 ${showw}`}>Add Product to Cart +</button>
        <button id='delBtn' onClick={function(){removeFromCart(productDetails.id)}}  className={`btnRemove w-100 mt-5 btn btn-danger ${show?show:'d-none'}`}>Remove Product From Cart -</button>
      </div>
    </div>
  </div> : <Loading/> };
  </HelmetProvider>
}
