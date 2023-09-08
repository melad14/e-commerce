import axios from 'axios';
import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { baseUrl } from '../utils/baseUrl.jsx';
import Loading from '../Loading/Loding.jsx';



export default function Payment() {

  const {cartId} = useContext(cartContext);

  const navigate = useNavigate();

    async function cashOrder(){
      try {

        const {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${localStorage.getItem("cartId")}`,{
        "shippingAddress":{
          "details": document.querySelector('#details').value,
          "phone": document.querySelector('#phone').value,
          "city": document.querySelector('#city').value
      
          }},{
            headers :{ 'token' : localStorage.getItem('token') }
          }
        )
        if(data.status === 'success'){
          toast.success('Product Added to Payment Successfully',{duration:2000,className:" text-success"});
          navigate('/allorders');
        }
      } catch (error) {
        toast.error(error.response.data,{duration:2000,className:"text-danger px-4 fw-bolder"});

      }
    }

    async function creditOrder(){
      try {
        const {data} = await axios.post(`${baseUrl}/orders/checkout-session/${localStorage.getItem("cartId")}`,{
          "shippingAddress":{
            "details": document.querySelector('#details').value,
            "phone": document.querySelector('#phone').value,
            "city": document.querySelector('#city').value
            }}, {  
              headers :{ 'token' : localStorage.getItem('token') },
              params :{ 'url' : 'http://localhost:3000' }
            }
            )
            if(data.status === 'success'){
              toast.success('Product Added to Payment Successfully',{duration:2000,className:" text-success"})
              window.open(data.session.url);
            }
    
      } catch (error) {
       
        toast.error( error.response.data,{duration:2000,className:"text-danger px-4 fw-bolder"});

      }
    }

  return <HelmetProvider>
    <Helmet>
      <title>Payment</title>
    </Helmet>

    <h3 className='my-5 pt-5 text-success fw-bolder text-center text-muted'> Payment Page </h3>

    {cartId?<div className="container text-center mb-5">

  <div className='m-auto w-50 text-start fw-bolder'>
  <form >
    <label className='my-2' htmlFor="details">Address Details</label>
    <input type="text" className='px-3 form-control mb-2' placeholder='Detailed Address' id='details'/>

    <label className='my-2' htmlFor="phone">Phone Number</label>
    <input type="number" className='px-3 form-control mb-2' placeholder='Phone Number' id='phone'/>

    <label className='my-2' htmlFor="city">City / Area</label>
    <input type="text" className='px-3 form-control' placeholder='City / Area' id='city'/>
    
    <div >
         <button onClick={function(){cashOrder(cartId)}} type='button' className='btn btn-outline-success fw-bolder my-3'>Cash Payment</button>
      <button onClick={function(){creditOrder(cartId)}} type='button' className='btn btn-outline-success mx-2 fw-bolder'>CreditCard Payment</button>
      </div>
 

  </form>
</div>
</div> : <Loading/>}
  
  </HelmetProvider>
  }
