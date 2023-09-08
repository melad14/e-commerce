import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { baseUrl } from '../utils/baseUrl.jsx';
import Loading from '../Loading/Loding.jsx';




export default function Category() {

const [allcategory, setAllCategory] = useState(null);

async function getAllCategories(){
  const { data } = await axios.get(`${baseUrl}/categories`);
  setAllCategory(data.data);
}

useEffect(function(){
  getAllCategories();
},[])

  return <HelmetProvider>
  <Helmet>
    <title>Categories</title>
    </Helmet>
  { allcategory ? <div className="container py-5 my-5">
    <div className="row align-items-center g-5">
 
      { allcategory.map(function( category,idx ){ return <div key={idx} className="col-md-3 " >
        
        <div className="item cart-customize rounded-5 shadow">
          <img src={category.image} className='w-100 rounded-5' alt={category.name} style={{'height':'300px'}} />
          <h4 className='text-success text-center  py-4'>{category.name}</h4>
        </div>
        
      </div>
    })}
    </div>
  </div> : <Loading /> }
  </HelmetProvider>
}
