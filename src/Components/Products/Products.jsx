import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../utils/baseUrl.jsx'
import Product from './../Product/Product';
import Loading from './../Loading/Loding';

export default function Products() {
   
    const [loading, setLoading] = useState(true)
  
  const [products, setProducts] = useState([])
  const getAllProducts = async () => {
    let { data } = await axios.get(`${baseUrl}/products`)
    setProducts(data.data)
    setLoading(false)
  }
  useEffect(() => {

    getAllProducts()
  }, [])
  return <>
    {loading === true ? <Loading /> : null}
    <div className="container">
      <div className="row">
        <Product allProducts={products} />
      </div>
    </div>
  </>
}
