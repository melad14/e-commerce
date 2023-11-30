import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext.js';

export default function Product(props) {
  const { allProducts } = props;
  const { addToWishlist, removeWishlist } = useContext(cartContext);
  const [wishlistStates, setWishlistStates] = useState({});

  useEffect(() => {
    const localStorageData = {};
    allProducts.forEach((pro) => {
      const id = pro.id;
      localStorageData[`lon-${id}`] = localStorage.getItem(`lon-${id}`) || '';
      localStorageData[`lonn-${id}`] = localStorage.getItem(`lonn-${id}`) || '';
    });
    setWishlistStates(localStorageData);
  }, [allProducts]);

  // Function to update local storage and state when adding to wishlist
  const addWishlist = async (id) => {
    await addToWishlist(id);
    localStorage.setItem(`lon-${id}`, 'd-block');
    localStorage.setItem(`lonn-${id}`, 'd-none');
    setWishlistStates((prev) => ({ ...prev, [`lon-${id}`]: 'd-block', [`lonn-${id}`]: 'd-none' }));
  };

  const removeFromWishlist = async (id) => {
    await removeWishlist(id);
    localStorage.setItem(`lon-${id}`, 'd-none');
    localStorage.setItem(`lonn-${id}`, 'd-block');
    setWishlistStates((prev) => ({ ...prev, [`lon-${id}`]: 'd-none', [`lonn-${id}`]: 'd-block' }));
  };

  return (
    <>
      <div className="row g-5 my-1 px-5">
        {allProducts.map(function (pro, idx) {
          const id = pro.id;
          const lon = wishlistStates[`lon-${id}`] || '';
          const lonn = wishlistStates[`lonn-${id}`] || '';

          return (
            <div key={idx} className="col-lg-3 col-md-4 col-sm-6">
              <div className="cart-customize item text-white h-100 rounded-5 position-relative shadow">
                <i onClick={() => addWishlist(id)} className={`fa-regular fa-heart text-dark fs-4 iconaa m-3 ${lonn}`}></i>
                <i onClick={() => removeFromWishlist(id)} className={`fa-solid fa-heart fs-4 iconaa m-3 text-danger ${lon ? lon : 'd-none'}`}></i>
                <div className="sora">

                  <img src={pro.imageCover} className="w-100 rounded-5" alt={pro.title} style={{ 'height': '300px' }} />
                </div>
                <h6 className='px-3 text-success text-start pt-3'>{pro.title.slice(0, pro.title.indexOf(' ', 10))}</h6>
                <h6 className='px-3 text-black'>{pro.category.name}</h6>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6 className='px-3 text-muted py-1'>{pro.priceAfterDiscount ? <> <span className='text-decoration-line-through text-danger'>{pro.price} </span> <span className=' fw-bold ps-2 text-success'>{pro.priceAfterDiscount} EGP</span> </> : <span>{pro.price} EGP</span>}</h6>
                  <span className='d-flex px-3'>
                    <i className='fas fa-star star-main  px-1 fs-5'></i>
                    <h6 className='text-muted'>{pro.ratingsAverage}</h6>
                  </span>
                </div>
                <Link to={`/prodetails/${pro.id}`}>
                  <button className='btn btn-success text-white w-100 mb-2 rounded-5 fw-bolder'> Product Details</button>
                </Link>            
                  </div>
            </div>
          );
        })}
      </div>
    </>
  );
}












// import React, { useContext, useState } from 'react'
// import { Link } from 'react-router-dom';
// import { cartContext } from '../Context/CartContext.js';


// export default function Product(props) {
//   let idd;
//   const [lon, setLon] = useState(localStorage.getItem(`lon-${idd}`) || '');
//   const [lonn, setLonn] = useState(localStorage.getItem(`lonn-${idd}`) || '');
//   let { allProducts } = props

//   const { addToWishlist, removeWishlist } = useContext(cartContext);

//   async function addWishlist(id) {
//     console.log(id);
//     await addToWishlist(id);
//     localStorage.setItem(`lon-${id}`, 'd-block');
//     localStorage.setItem(`lonn-${id}`, 'd-none');
//     setLon('d-block');
//     setLonn('d-none');
//   }


//   async function removeFromWishlist(id) {
//     await removeWishlist(id);
//     localStorage.setItem(`lon-${id}`, 'd-none');
//     localStorage.setItem(`lonn-${id}`, 'd-block');
//     setLon('d-none');
//     setLonn('d-block');
//   };



//   return <>

{/* <div className="row g-5 my-1 px-5">
  {allProducts.map(function (pro, idx) {
    return <div key={idx} className="col-lg-3 col-md-4 col-sm-6">


      <div className="cart-customize item text-white h-100 rounded-5 position-relative shadow " >
        <i onClick={function () { addWishlist(idd = pro.id) }} className={`fa-regular fa-heart text-dark fs-4 iconaa m-3 ${lonn}`}></i>
        <i onClick={function () { removeFromWishlist(idd = pro.id) }} className={`fa-solid fa-heart fs-4 iconaa m-3 text-danger ${lon ? lon : 'd-none'}`} ></i>
        <div className="sora">

          <img src={pro.imageCover} className="w-100 rounded-5" alt={pro.title} style={{ 'height': '300px' }} />
        </div>
        <h6 className='px-3 text-success text-start pt-3'>{pro.title.slice(0, pro.title.indexOf(' ', 10))}</h6>
        <h6 className='px-3 text-black'>{pro.category.name}</h6>
        <div className='d-flex justify-content-between align-items-center'>
          <h6 className='px-3 text-muted py-1'>{pro.priceAfterDiscount ? <> <span className='text-decoration-line-through text-danger'>{pro.price} </span> <span className=' fw-bold ps-2 text-success'>{pro.priceAfterDiscount} EGP</span> </> : <span>{pro.price} EGP</span>}</h6>
          <span className='d-flex px-3'>
            <i className='fas fa-star star-main  px-1 fs-5'></i>
            <h6 className='text-muted'>{pro.ratingsAverage}</h6>
          </span>
        </div>
        <Link to={`/prodetails/${pro.id}`}>
          <button className='btn btn-success text-white w-100 mb-2 rounded-5 fw-bolder'> Product Details</button>
        </Link>
      </div>
    </div>
  })}
</div> */}
//   </>
// }
