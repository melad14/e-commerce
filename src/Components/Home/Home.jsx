import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import MainSlider from '../MainSlider/MainSlider.jsx';
import CategorySlider from '../CategorySlider/CategorySlider.jsx';
import Products from './../Products/Products';


export default function Home() {

  return  <>
  <HelmetProvider>
    <Helmet>
      <title>Fresh Cart Store</title>
    </Helmet>

      <MainSlider />
      <CategorySlider />
      <Products/>
  

  </HelmetProvider>
  </>
}
