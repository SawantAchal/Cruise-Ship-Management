import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'

const AllOrders = ({url}) => {
    const [orders , setorders] = useState([])

    const fetchAllUsersOrders = async () => {
        const res = await axios.get(url+'/api/order/allUserOrders')
        if (res.data.success) {
            setorders(res.data.data)
        }else{
            toast.error('error')
        }
    }

    const updateOrderStatus = async(e , orderId) => {
        const response = await axios.post(url+'/api/order/updateOrderStatus' ,{
            orderId,
            status:e.target.value
        })
        if (response.data.success) {
            await fetchAllUsersOrders();
        }
    }

    useEffect(() => {
        fetchAllUsersOrders()
    },[])

  return (
    <>

        <div className='ml-28'>
  <h1>All orders from users (menu, stationery)</h1>
  <div>
    {orders.map((order, index) => (
      <div key={index} className="order-card">
        {/* Displaying all items with names and quantities */}
        <p>
          Items: {order.items.map((item, idx) => {
            // const separator = idx === order.items.length - 1 ? '' : ', ';
            return ( <div>
              <p>{item.name}  = {item.quantity}</p>
              <p><p>Categories : {item.category} </p></p>
              <p>Price :{item.price}</p>
              <hr/>
            </div>)
          })}
          
        </p>

        {/* Room number */}
        <p>Room No.: {order.roomNo}</p>

        {/* Amount */}
        <p>Total Amount: ${order.amount}</p>
        
        {/* Order status */}
        <p>Status: {order.status}</p>
        <select  onChange={(e) => updateOrderStatus(e , order._id)} value={order.status}>
          <option value='order in process'>order in process</option>
          <option value='order with in 10 min'>order with in 10 min</option>
          <option value='order with in a min'>order with in a min</option>
          <option value='Delivered'>Delivered</option>
        </select>
        <hr className='pt-4 pb-4 text-black h-4'/>
      </div>
      
    ))}
  </div>

</div>
    </>
  )
}

export default AllOrders