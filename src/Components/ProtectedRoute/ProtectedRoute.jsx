import React, { useContext } from 'react'
import Login from './../Login/Login';
import { AuthContext } from '../Context/AuthContext.jsx';

export default function ProtectedRoute({children }) {
    let {userData }=useContext(AuthContext)

    if(userData===null){

        return <Login />
    }
    else{
        return children;
    }
    
    }
    