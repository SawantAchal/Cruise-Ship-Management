// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react'
// import axios from 'axios'

// const MenuOrder = ({url}) => {
//   const [menuOrders , setMenuOrders] = useState([]);
//   const menuCategories = new Set(["Food", "Snacks", "Beverages"]);

//   const fetchMenuOrders = async () => {
//     try {
//       const res = await axios.get( url+'/api/order/allUserOrders');
//       if (res.data.success) {
//         // Filter to include only menu orders
//         const filteredOrders = res.data.data.filter(order =>
//           order.items.some(item => menuCategories.has(item.category))

//         ).map(order => ({
//           ...order,
//           items:order.items.filter(item => menuCategories.has(item.category))
//         }))

//         setMenuOrders(filteredOrders);
//       }
//     } catch (error) {
//       console.error("Error fetching menu orders:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMenuOrders();
//   }, [url]);

//   const updateOrderStatus = async (e, orderId) => {
//     const response = await axios.post(url + '/api/order/updateOrderStatus', {
//       orderId,
//       status: e.target.value
//     });
//     if (response.data.success) {
//       // Refetch orders after updating status
//       fetchMenuOrders();
//     }
//   };
  

//   return (
//     <>
//       <div className='ml-24'>
//         <h1 className='text-3xl'>Menu orders</h1>
//         <div>
//         {menuOrders.map((order, index) => (
//           <div key={index} className="order-card">
//             <p>
//               Items: {order.items.map((item, idx) => {
//                 return (<div>{item.name} {item.quantity}</div>)
//               })}
//             </p>
//             <p>Room No.: {order.roomNo}</p>
//             <p>Total Amount: ${order.amount}</p>
//             <p>Status: {order.status}</p>
//             <select onChange={(e) => updateOrderStatus(e, order._id)} value={order.status}>
//               <option value='order in process'>order in process</option>
//               <option value='order with in 10 min'>order with in 10 min</option>
//               <option value='order with in a min'>order with in a min</option>
//               <option value='Delivered'>Delivered</option>
//             </select>
//             <hr className='pt-4 pb-4 text-black h-4' />
//           </div>
//         ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default MenuOrder



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenuOrder = ({ url }) => {
  const [menuOrders, setMenuOrders] = useState([]);
  const menuCategories = new Set(['Food', 'Snacks', 'Beverages']);

  // Fetching menu orders and filtering based on menu categories
  const fetchMenuOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/allUserOrders`);
      if (res.data.success) {
        // Filter to include only menu orders
        const filteredOrders = res.data.data
          .filter(order => order.items.some(item => menuCategories.has(item.category)))
          .map(order => ({
            ...order,
            items: order.items.filter(item => menuCategories.has(item.category)),
          }));

        setMenuOrders(filteredOrders);
      }
    } catch (error) {
      console.error('Error fetching menu orders:', error);
    }
  };

  useEffect(() => {
    fetchMenuOrders();
  }, [url]);

  // Update order status
  const updateOrderStatus = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/updateOrderStatus`, {
        orderId,
        status: e.target.value,
      });
      if (response.data.success) {
        fetchMenuOrders(); // Refetch orders after updating status
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 ml-20">Menu Orders</h1>

      <div className="space-y-6">
        {menuOrders.map((order, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            {/* Order Items */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Order Items</h2>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-sm text-gray-600">
                    <p><strong>Item Name:</strong> {item.name}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
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

export default MenuOrder;
