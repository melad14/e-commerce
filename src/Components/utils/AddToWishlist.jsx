import axios from 'axios';
import { toast } from 'react-toastify';
export const addToWishlist = async (productId) => {

  const token = localStorage.getItem("token")
    const notify = (msg, type) => toast[type](msg);
  const endpoint = 'https://route-ecommerce.onrender.com/api/v1/wishlist';

  try {
    await axios.post(endpoint, { productId }, { headers:  {token} });
     notify('added', 'success')
  } catch (error) {
    toast.error(error,{duration:1000,className:"bg-black text-white"});
  }
};

