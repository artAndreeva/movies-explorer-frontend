import React from 'react';
import { Navigate } from "react-router-dom";

const AuthRouteElement = ({ Component, ...props }) => {
  return (
    props.isLoggedIn ? <Navigate to='/' replace/> : <Component {...props} />
)}

export default AuthRouteElement;
