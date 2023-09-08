import React, { useContext } from 'react'
import logo from "../../images/freshcart-logo.svg"
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext.js';
export default function Navbar({ userData, logOut }) {

  const {numOfCartItems} = useContext(cartContext);

  return <>

    <nav className="navbar navbar-expand-lg bg-main-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/category">Category</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/brands">Brands</Link>
            </li>

          </ul>

            {!userData ? <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mt-2">


            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>


          </ul> : <ul className="navbar-nav ms-auto  mb-lg-0 my-2">

            <Link to="/cart" type="button" className="btn  position-relative mx-3">
              Cart <i className="fa-solid fa-cart-shopping"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              {numOfCartItems}
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/wishList">WishList</Link>
            </li>

            <li className="nav-item">
              <Link onClick={logOut} className="nav-link text-dark" to="/login">Logout</Link>
            </li>


          </ul>
          }


        </div>
      </div>
    </nav>

  </>

}
