import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loading from './../Loading/Loding';
import { baseUrl } from '../utils/baseUrl.jsx';




export default function Brands() {
const [allBrands, setAllBrands] = useState(null);

async function getAllBrands(){
  const { data } = await axios.get(`${baseUrl}/brands`);
  setAllBrands(data.data);
}

useEffect(function(){
  getAllBrands();
},[])

  return <HelmetProvider>
  
  { allBrands ? <div className="container py-5 my-5">
  <Helmet>
    <title>Brands</title>
    </Helmet>
    <div className="row align-items-center">
    
      { allBrands.map(function( brand,idx ){ return <div key={idx} className="col-md-3 rounded-5 my-3 ">
       
        <div className="brand-item item rounded-5 shadow">
          <img src={brand.image}alt={brand.name} className="w-100" />
          <h4 className='text-success text-center py-4'>{brand.name}</h4>
        </div>
     
      </div>
    })}
    </div>
  </div> : <Loading /> }
  </HelmetProvider>
}
