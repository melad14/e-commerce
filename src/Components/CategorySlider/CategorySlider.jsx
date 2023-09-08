import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
  <div className="container my-5">
    <div>
         <Slider {...settings} className='slid'   >
          {category.map((item,index)=>{
            return  <div key={index} className='p-2' >
              <img src={item.image} alt="" className='w-100'height={200}/>
              <h6>{item.name}</h6>
              </div>  
          })}
 


    </Slider>
    </div>
  </div>
  
  </>
}
