import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout.jsx';
import Products from './Components/Products/Products.jsx';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import InverseProtectedRoute from './Components/InverseProtectedRouter/InverseProtectedRoute';
import WishList from './Components/Wishlist/Wishlist.jsx';
import Categories from './Components/Categories/Categories.jsx';
import Brands from './Components/Brands/Brands.jsx';
import Home from './Components/Home/Home.jsx';
import Cart from './Components/Cart/Cart.jsx';
import ProDetails from './Components/ProDetails/ProDetails';
import Payment from './Components/Payment/Payment.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import { AuthContext } from './Components/Context/AuthContext.jsx';

function App() {

  let { saveUserData } = useContext(AuthContext)

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      saveUserData();
    }
  }, [])


  return <>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='e-commerce' element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='category' element={<Categories />} />
          <Route path='payment' element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path='brands' element={<Brands />} />
          <Route path='prodetails/:id' element={<ProDetails />} />
          <Route path='wishlist' element={<ProtectedRoute><WishList /></ProtectedRoute>} />
          <Route path='cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='allorders' element={<ProtectedRoute> <AllOrders /> </ProtectedRoute>} />
          <Route path='register' element={<InverseProtectedRoute><Register /></InverseProtectedRoute>} />
          <Route path='login' element={<InverseProtectedRoute><Login /></InverseProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
