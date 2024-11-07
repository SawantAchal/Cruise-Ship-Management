import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'

const MenuOrder = ({url}) => {
  const [menuOrders , setMenuOrders] = useState([]);
  const menuCategories = new Set(["Food", "Snacks", "Beverages"]);

  const fetchMenuOrders = async () => {
    try {
      const res = await axios.get( url+'/api/order/allUserOrders');
      if (res.data.success) {
        // Filter to include only menu orders
        const filteredOrders = res.data.data.filter(order =>
          order.items.some(item => menuCategories.has(item.category))

        ).map(order => ({
          ...order,
          items:order.items.filter(item => menuCategories.has(item.category))
        }))

        setMenuOrders(filteredOrders);
        console.log("Fetched Orders:", res.data.data);
        console.log("Filtered Menu Orders:", filteredOrders);
      }
    } catch (error) {
      console.error("Error fetching menu orders:", error);
    }
  };

  useEffect(() => {
    fetchMenuOrders();
  }, [url]);

  const updateOrderStatus = async (e, orderId) => {
    const response = await axios.post(url + '/api/order/updateOrderStatus', {
      orderId,
      status: e.target.value
    });
    if (response.data.success) {
      // Refetch orders after updating status
      fetchMenuOrders();
    }
  };
  

  return (
    <>
      <div className='ml-24'>
        <h1 className='text-3xl'>Menu orders</h1>
        <div>
        {menuOrders.map((order, index) => (
          <div key={index} className="order-card">
            <p>
              Items: {order.items.map((item, idx) => {
                return (<div>{item.name} {item.quantity}</div>)
              })}
            </p>
            <p>Room No.: {order.roomNo}</p>
            <p>Total Amount: ${order.amount}</p>
            <p>Status: {order.status}</p>
            <select onChange={(e) => updateOrderStatus(e, order._id)} value={order.status}>
              <option value='order in process'>order in process</option>
              <option value='order with in 10 min'>order with in 10 min</option>
              <option value='order with in a min'>order with in a min</option>
              <option value='Delivered'>Delivered</option>
            </select>
            <hr className='pt-4 pb-4 text-black h-4' />
          </div>
        ))}
        </div>
      </div>
    </>
  )
}

export default MenuOrder

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MenuOrder = ({url}) => {
//   const [menuOrders, setMenuOrders] = useState([]);
//   const menuCategories = new Set(["Food", "Snacks", "Beverages"]);

//   const fetchMenuOrders = async () => {
//     const res = await axios.get(url + '/api/order/allUserOrders');
//     if (res.data.success) {
//       const filteredOrders = res.data.data.filter(order =>
//         order.items.every(item => menuCategories.has(item.category))
//       );
//       setMenuOrders(filteredOrders);
//       console.log("Fetched Menu Orders:", filteredOrders);
//     }
//   };

//   const updateOrderStatus = async (e, orderId) => {
//     const response = await axios.post(url + '/api/order/updateOrderStatus', {
//       orderId,
//       status: e.target.value
//     });
//     if (response.data.success) {
//       await fetchMenuOrders(); // Refresh orders after updating status
//     }
//   };

//   useEffect(() => {
//     fetchMenuOrders();
//   }, [url]);

//   return (
//     <>
//       <div className='ml-44'>
//         <h1 className='text-3xl'>Menu Orders</h1>
//         <div>
//           {menuOrders.map(order => (
//             <div key={order._id} className="order-card">
//               <p>
//                 Items: {order.items.map((item, idx) => {
//                   const separator = idx === order.items.length - 1 ? '' : ', ';
//                   return `${item.name} x ${item.quantity}${separator}`;
//                 })}
//               </p>
//               <p>Room No.: {order.roomNo}</p>
//               <p>Total Amount: ${order.amount}</p>
//               <p>Status: {order.status}</p>
//               <select onChange={(e) => updateOrderStatus(e, order._id)} value={order.status}>
//                 <option value='order in process'>order in process</option>
//                 <option value='order within 10 min'>order within 10 min</option>
//                 <option value='order within a min'>order within a min</option>
//                 <option value='Delivered'>Delivered</option>
//               </select>
//               <hr className='pt-4 pb-4 text-black h-4' />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MenuOrder;
