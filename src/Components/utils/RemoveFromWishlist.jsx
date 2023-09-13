import axios from "axios";
import { toast } from 'react-toastify';
export const removeFromWishlist = async (productId) => {
      const notify = (msg, type) => toast[type](msg);
  const token = localStorage.getItem("token")
    try {
      await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}`, { headers:  {token} } );
     notify('removed', 'success')
    } catch (error) {
      toast.error(error,{duration:1000,className:"bg-black text-white"});
    }
  };