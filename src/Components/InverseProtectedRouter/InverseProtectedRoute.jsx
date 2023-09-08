import React from "react";
import { Navigate } from "react-router-dom";

export default function InverseProtectedRoute(props) {

  if (localStorage.getItem("token") != null) return <Navigate to="/" />;
   
    return props.children;
  
}
