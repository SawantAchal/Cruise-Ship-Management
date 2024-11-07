import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const VerifyOrder = () => {
    const [serachParams , setSearchParams] = useSearchParams()
    const success = serachParams.get('success');
    const orderId = serachParams.get('orderId');
    // console.log("success", success, orderId)
    const {url} = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPayment = async() => {
        const response = await axios.post(url+'/api/order/verify-order',{success, orderId})
        if (response.data.success) {
            navigate('/my-order')
        }else{
            navigate('/')
        }
    }

    useEffect(() => {
        verifyPayment()
    },[])


  return (
    <>
    <h1>Your order will reach with in 15 mins </h1>
    </>
  )
}

export default VerifyOrder