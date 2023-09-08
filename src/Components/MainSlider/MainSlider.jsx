import React from 'react'
import Slider from "react-slick";

import slide1 from "../../images/1 (1).png"
import slide2 from "../../images/1 (2).png"
import slide3 from "../../images/1 (3).png"
import slide4 from "../../images/1 (4).png"
import slide5 from "../../images/1 (5).png"
import slide6 from "../../images/2.png"

export default function MainSlider() {
  var settings = {
    autoplay:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return <>
  <div className="container my-3 ">
    <div>
         <Slider {...settings} className='slid' autoplaySpeed={2000}>
     <img  src={slide1} alt="" />
     <img src={slide2} alt="" />
     <img src={slide3} alt="" />
     <img src={slide4} alt="" />
     <img src={slide5} alt="" />
     <img src={slide6} alt="" />
    </Slider>
    </div>
  </div>

  </>
}
