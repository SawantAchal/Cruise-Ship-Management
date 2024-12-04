// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import {toast} from 'react-toastify'
// import { useEffect } from 'react'

// const AllOrders = ({url}) => {
//     const [orders , setorders] = useState([])

//     const fetchAllUsersOrders = async () => {
//         const res = await axios.get(url+'/api/order/allUserOrders')
//         if (res.data.success) {
//             setorders(res.data.data)
//         }else{
//             toast.error('error')
//         }
//     }

//     const updateOrderStatus = async(e , orderId) => {
//         const response = await axios.post(url+'/api/order/updateOrderStatus' ,{
//             orderId,
//             status:e.target.value
//         })
//         if (response.data.success) {
//             await fetchAllUsersOrders();
//         }
//     }

//     useEffect(() => {
//         fetchAllUsersOrders()
//     },[])

//   return (
//     <>

//         <div className='ml-28'>
//   <h1>All orders from users (menu, stationery)</h1>
//   <div>
//     {orders.map((order, index) => (
//       <div key={index} className="order-card">
//         {/* Displaying all items with names and quantities */}
//         <p>
//           Items: {order.items.map((item, idx) => {
//             // const separator = idx === order.items.length - 1 ? '' : ', ';
//             return ( <div>
//               <p>{item.name}  = {item.quantity}</p>
//               <p><p>Categories : {item.category} </p></p>
//               <p>Price :{item.price}</p>
//               <hr/>
//             </div>)
//           })}
          
//         </p>

//         {/* Room number */}
//         <p>Room No.: {order.roomNo}</p>

//         {/* Amount */}
//         <p>Total Amount: ${order.amount}</p>
        
//         {/* Order status */}
//         <p>Status: {order.status}</p>
//         <select  onChange={(e) => updateOrderStatus(e , order._id)} value={order.status}>
//           <option value='order in process'>order in process</option>
//           <option value='order with in 10 min'>order with in 10 min</option>
//           <option value='order with in a min'>order with in a min</option>
//           <option value='Delivered'>Delivered</option>
//         </select>
//         <hr className='pt-4 pb-4 text-black h-4'/>
//       </div>
      
//     ))}
//   </div>

// </div>
//     </>
//   )
// }

// export default AllOrders



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllOrders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllUsersOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/allUserOrders`);
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('Error fetching orders');
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/updateOrderStatus`, {
        orderId,
        status: e.target.value,
      });
      if (response.data.success) {
        await fetchAllUsersOrders();
      } else {
        toast.error('Error updating order status');
      }
    } catch (error) {
      toast.error('Error updating order status');
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    fetchAllUsersOrders();
  }, [url]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 ml-11">All Orders from Users (Menu, Stationery)</h1>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            {/* Order Details */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Order Items</h2>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-sm text-gray-600">
                    <p><strong>Item Name:</strong> {item.name}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <hr className="my-2 border-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Room Number */}
            <div className="mb-4">
              <p className="text-sm text-gray-600"><strong>Room No.:</strong> {order.roomNo}</p>
            </div>

            {/* Total Amount */}
            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-800"><strong>Total Amount:</strong> ${order.amount}</p>
            </div>

            {/* Order Status */}
            <div className="mb-4">
              <p className="text-sm text-gray-600"><strong>Status:</strong> {order.status}</p>
              <select
                onChange={(e) => updateOrderStatus(e, order._id)}
                value={order.status}
                className="mt-2 w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="order in process">Order in Process</option>
                <option value="order within 10 min">Order within 10 min</option>
                <option value="order within a min">Order within a min</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <hr className="my-4 border-t border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
