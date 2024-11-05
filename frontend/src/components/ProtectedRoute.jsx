import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {token} = useContext(StoreContext);
    console.log('Token in ProtectedRoute:', token); 

    if (!token) {
        return <Navigate to={'/'} replace/>
    }
  return children;
}

export default ProtectedRoute;