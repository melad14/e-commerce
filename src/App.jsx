import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout.jsx';
import Products from './Components/Products/Products.jsx';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import InverseProtectedRoute from './Components/InverseProtectedRouter/InverseProtectedRoute';
import WishList from './Components/Wishlist/Wishlist.jsx';
import Categories from './Components/Categories/Categories.jsx';
import Brands from './Components/Brands/Brands.jsx';
import Home from './Components/Home/Home.jsx';
import CartContext from './Components/Context/CartContext.js';
import { Toaster } from 'react-hot-toast';
import Cart from './Components/Cart/Cart.jsx';
import ProDetails from './Components/ProDetails/ProDetails';
import Payment from './Components/Payment/Payment.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';

function App() {

  const [userData, setUserData] = useState('')

  function saveUserData() {
    let encodedToken = localStorage.getItem("token")
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken)
  }

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {

      saveUserData();

    }
  }, [])

  function logOut() {
    localStorage.removeItem('token')
    setUserData(null)
    return <Navigate to='/login' />
  }


  let routes = createHashRouter([{
    path: '', element: <Layout userData={userData} logOut={logOut} />, children: [
      { index: true, element: <ProtectedRoute saveUserData={saveUserData} userData={userData} ><Home /> </ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute saveUserData={saveUserData} userData={userData} ><Products /> </ProtectedRoute> },
      { path: 'category', element: <ProtectedRoute saveUserData={saveUserData} userData={userData} ><Categories /> </ProtectedRoute> },
      { path: 'payment', element: <ProtectedRoute saveUserData={saveUserData} userData={userData} ><Payment /> </ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute saveUserData={saveUserData} userData={userData} ><Brands /> </ProtectedRoute> },
      { path: 'prodetails/:id', element: <ProtectedRoute saveUserData={saveUserData} userData={userData} ><ProDetails  userData={userData}/>   </ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute saveUserData={saveUserData} userData={userData} ><WishList /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute saveUserData={saveUserData} userData={userData} ><Cart /> </ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute saveUserData={saveUserData} userData={userData} ><AllOrders userData={userData}/> </ProtectedRoute> },
      { path: 'register', element: <InverseProtectedRoute><Register /> </InverseProtectedRoute> },
      { path: 'login', element: <InverseProtectedRoute>< Login saveUserData={saveUserData} /> </InverseProtectedRoute> },
    ]
  }])
  return <>
<CartContext>
    <Toaster />
    <RouterProvider router={routes} />
    </CartContext>
  </>
}

export default App;
