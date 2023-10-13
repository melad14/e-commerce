import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import CartContext from './Components/Context/CartContext.js';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './Components/Context/AuthContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthContextProvider>
<CartContext>
<Toaster />
<App />
</CartContext>
</AuthContextProvider>



);


reportWebVitals();
