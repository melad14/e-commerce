import jwtDecode from "jwt-decode";
import { createContext,useState } from "react";
import { Navigate } from "react-router-dom";

export let AuthContext =createContext('')

 export default function AuthContextProvider(props){

    const [userData, setUserData] = useState('')

    function saveUserData() {
      let encodedToken = localStorage.getItem("token")
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken)
    }
    
  function logOut() {
    localStorage.removeItem('token')
    setUserData(null)
    return <Navigate to='/login' />
  }
  
    
return <AuthContext.Provider value={{userData,setUserData,saveUserData,logOut}} >

    {props.children}
</AuthContext.Provider>

}