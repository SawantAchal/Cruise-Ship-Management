import React, { useContext } from 'react';
import {  StoreContext } from '../context/StoreContext';
import {useNavigate} from 'react-router-dom'

const CartPage = () => {
  const { cartItems ,  removeFromCart ,getCartTotalAmount ,combinedMenu, url} = useContext(StoreContext);
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 pt-24">
      <main className="mb-12">
        <div>
          <div  className="text-2xl font-semibold mb-4">
            cart items
          </div>
          <div className="grid grid-cols-6 gap-5 font-semibold text-gray-700 py-2 border-b border-gray-300">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
        </div>
        <br/>
        <hr/>
        <div className="space-y-4 mt-4">
        {
          combinedMenu.map((item , index) => {
            if (cartItems[item._id]>0) {
              return(
                <>
                  <div key={index} className="grid grid-cols-6 gap-5 items-center border-b border-gray-300 pb-4">
                  <img src={url+"/images/"+item.image} alt={item.name} className='w-16 h-16 object-cover rounded'/>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p  className="text-gray-600">{item.price}</p>
                    <p className="text-gray-600">{cartItems[item._id]}</p>
                    <p className="text-gray-800 font-semibold">{item.price*cartItems[item._id]}</p>
                    <p className="text-red-500 font-semibold cursor-pointer" onClick={() => removeFromCart(item._id)}>X</p>
                  </div>
                  <hr/>
                </>
              )
            }
          })
        }
        </div>
      </main>
      <div className="flex justify-between gap-8 mt-12">
        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-4">cart total</h1>
          <div  className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <p>subtotal</p>
              <p>{getCartTotalAmount()}</p>
            </div>
            <hr/>
            {/* <hr/> */}
            <div className="flex justify-between font-bold text-gray-800 text-lg">
              <b>Total</b>
              <b>{getCartTotalAmount()===0?0:getCartTotalAmount() }</b>
            </div>
          </div>
          <button onClick={() => navigate('/place-order')} className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Procced to checkout</button>
        </div>
        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="text-lg font-semibold mb-4">
            <p>Enter promocode</p>
            <div className="flex gap-2">
              <input type='text' placeholder='promocode' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"/>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage;