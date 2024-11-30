import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { getCartTotalAmount, token, combinedMenu, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    roomNo: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = name === 'roomNo' ? parseInt(e.target.value, 10) : e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    combinedMenu.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      roomNo: data.roomNo,
      items: orderItems,
      amount: getCartTotalAmount() * 100 + 2 * 100,
    };
    try {
      let response = await axios.post(url + '/api/order/place-order', orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        const errorMessage = typeof response.data.message === 'string'
          ? response.data.message
          : JSON.stringify(response.data.message);
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6 sm:px-12">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl space-y-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Place Your Order</h1>

        <form onSubmit={placeOrder} className="space-y-8">
          {/* Delivery Information Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Delivery Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input onChange={onChangeHandler} name="firstName" value={data.firstName} type="text" placeholder="First Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required/>
              <input onChange={onChangeHandler} name="lastName" value={data.lastName} type="text" placeholder="Last Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required/>
            </div>
            <input onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required/>
            <input onChange={onChangeHandler} name="roomNo" value={data.roomNo} type="number" placeholder="Room Number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required/>
            <input onChange={onChangeHandler} name="phone" value={data.phone} type="tel" placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required/>
          </div>

          {/* Cart Total Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Cart Total</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <p>Subtotal</p>
                <p className="font-semibold text-gray-800">{getCartTotalAmount()}</p>
              </div>
              <hr className="border-gray-300 my-2" />
              <div className="flex justify-between text-gray-700">
                <p>Delivery Charges</p>
                <p className="font-semibold text-gray-800">{getCartTotalAmount() === 0 ? 0 : ''}</p>
              </div>
              <hr className="border-gray-300 my-2" />
              <div className="flex justify-between font-semibold text-gray-800">
                <p>Total</p>
                <p>{getCartTotalAmount() === 0 ? 0 : getCartTotalAmount()}</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
