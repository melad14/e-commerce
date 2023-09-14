import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./cat.css"
import { baseUrl } from '../utils/baseUrl.jsx'
import Slider from "react-slick";
export default function CategorySlider() {
    var settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows:true
  };
  const [category, setCategory] = useState([])
  const getAllCategories=async()=>{
    let {data}=await axios.get(`${baseUrl}/categories`)
    setCategory(data.data)
  }
  useEffect(() => {
    
getAllCategories()
  }, [])
  
  return <> 
  <div className="container my-5 slidd">
    <div>
         <Slider {...settings} className='slid'   >
          {category.map((item,index)=>{
            return  <div key={index} className='p-2 m-2 text-center ' >
              <img src={item.image} alt="" className='w-100 mb-1'height={200}/>
              <h6>{item.name}</h6>
              </div>  
          })}
 


    </Slider>
    </div>
  </div>
  
  </>
}
