import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'

const StationeryOrder = ({url}) => {
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
        toast.error('Error fetching stationery orders');
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
      <div>
      <div className='ml-28'>
      <h1>Stationery Orders</h1>
      <div>
        {stationeryOrders.map((order, index) => (
          <div key={index} className="order-card">
            <p>
              Items: {order.items.map((item, idx) => {
                
                return (<div key={idx}>
{item.name} {item.quantity}
                </div>);
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
      </div>
    </>
  )
}

export default StationeryOrder
