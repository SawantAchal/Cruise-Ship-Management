// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react';
// import axios from 'axios'

// const StationeryOrder = ({url}) => {
//   const [stationeryOrders, setStationeryOrders] = useState([]);
//   const stationeryCategories = new Set(["Gift Items", "Chocolates", "Tale Books"]);


//   const fetchStationeryOrders = async () => {
//     try {
//       const res = await axios.get(url + '/api/order/allUserOrders');
//       if (res.data.success) {
//         // Filter orders to include only those with stationery items
//         const filteredOrders = res.data.data
//           .filter(order => order.items.some(item => stationeryCategories.has(item.category)))
//           .map(order => ({
//             ...order,
//             // Only keep stationery items within each order
//             items: order.items.filter(item => stationeryCategories.has(item.category))
//           }));

//         setStationeryOrders(filteredOrders);
//       } else {
//         toast.error('Error fetching stationery orders');
//       }
//     } catch (error) {
//       console.error("Error fetching stationery orders:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStationeryOrders();
//   }, [url]);

//   const updateOrderStatus = async (e, orderId) => {
//     const response = await axios.post(url + '/api/order/updateOrderStatus', {
//       orderId,
//       status: e.target.value
//     });
//     if (response.data.success) {
//       fetchStationeryOrders();
//     }
//   };



//   return (
//     <>
//       <div>
//       <div className='ml-28'>
//       <h1>Stationery Orders</h1>
//       <div>
//         {stationeryOrders.map((order, index) => (
//           <div key={index} className="order-card">
//             <p>
//               Items: {order.items.map((item, idx) => {
                
//                 return (<div key={idx}>
// {item.name} {item.quantity}
//                 </div>);
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
//       </div>
//     </div>
//       </div>
//     </>
//   )
// }

// export default StationeryOrder



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StationeryOrder = ({ url }) => {
  const [stationeryOrders, setStationeryOrders] = useState([]);
  const stationeryCategories = new Set(["Gift Items", "Chocolates", "Tale Books"]);

  const fetchStationeryOrders = async () => {
    try {
      const res = await axios.get(url + '/api/order/allUserOrders');
      if (res.data.success) {
        // Filter orders to include only those with stationery items
        const filteredOrders = res.data.data
          .filter(order => order.items.some(item => stationeryCategories.has(item.category)))
          .map(order => ({
            ...order,
            // Only keep stationery items within each order
            items: order.items.filter(item => stationeryCategories.has(item.category))
          }));

        setStationeryOrders(filteredOrders);
      } else {
        console.error('Error fetching stationery orders');
      }
    } catch (error) {
      console.error("Error fetching stationery orders:", error);
    }
  };

  useEffect(() => {
    fetchStationeryOrders();
  }, [url]);

  const updateOrderStatus = async (e, orderId) => {
    const response = await axios.post(url + '/api/order/updateOrderStatus', {
      orderId,
      status: e.target.value
    });
    if (response.data.success) {
      fetchStationeryOrders();
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 ">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 ml-32">Stationery Orders</h1>

        {/* Orders List */}
        <div className="grid grid-cols-1 gap-6">
          {stationeryOrders.map((order, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              {/* Order Details */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Items</h2>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-gray-600">
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Additional Info */}
              <div className="mb-4">
                <p className="text-gray-600">Room No.: {order.roomNo}</p>
                <p className="text-gray-600">Total Amount: <span className="font-bold">${order.amount}</span></p>
              </div>

              {/* Order Status */}
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  onChange={(e) => updateOrderStatus(e, order._id)}
                  value={order.status}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value='order in process'>Order in process</option>
                  <option value='order within 10 min'>Order within 10 min</option>
                  <option value='order within a min'>Order within a min</option>
                  <option value='Delivered'>Delivered</option>
                </select>
              </div>

              {/* Divider */}
              <hr className="my-4 border-t border-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StationeryOrder;
