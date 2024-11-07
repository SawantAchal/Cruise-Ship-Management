import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'

const Myorders = () => {
    const {url , token} = useContext(StoreContext)
    const [data , setData] = useState([])

    const fetchUserOrder = async () => {
        const res = await axios.post(url+'/api/order/user-orders' , {} , {headers:{token}});
        setData(res.data.data)
        // console.log(res.data.data)
    }

    useEffect(() => {
        if (token) {
            fetchUserOrder()
        }
    },[token])

  return (
    <>
        <div className="pt-24 text-center">
            <h1 className="text-3xl font-semibold mb-8 text-gray-800">My orders</h1>
            <div className="space-y-6 max-w-xl mx-auto">
                {
                    data.map((order , index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                            <p className="font-semibold text-gray-700">
                                {
                                    order.items.map((item , idx) => {
                                        if (idx === order.items.length-1) {
                                        return item.name  + " X " +  item.quantity
                                    }else{
                                        return item.name  + " X " +  item.quantity + ','
                                    }
                                })}
                            </p>
                            <p className="text-lg font-bold text-gray-800 mt-2">{order.amount}</p>
                            <p className="text-gray-600 mt-1">Items : {order.items.length}</p>
                            <span className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium ${order.status === "Delivered" ? "bg-green-500 text-white" : "bg-yellow-500 text-gray-800"}`}>&#x25cf; {order.status}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default Myorders