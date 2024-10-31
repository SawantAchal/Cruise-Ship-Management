// import React, { useContext } from 'react';
// import {  StoreContext } from '../context/StoreContext';
// import {useNavigate} from 'react-router-dom'

// const CartPage = () => {
//   const { cartItems ,  menuData , stationeryMenu, removeFromCart ,getCartTotalAmount ,combinedMenu} = useContext(StoreContext);
//   const navigate = useNavigate()
//   return (
//     <div>
//       <main className='pt-60'>
//         <div>
//           <div>
//             cart items
//           </div>
//           <div className='flex gap-5'>
//             <p>Items</p>
//             <p>Title</p>
//             <p>Price</p>
//             <p>Quantity</p>
//             <p>Total</p>
//             <p>Remove</p>
//           </div>
//         </div>
//         <br/>
//         <hr/>
//         {
//           combinedMenu.map((item , index) => {
//             if (cartItems[item._id]>0) {
//               return(
//                 <>
//                   <div key={index} className='flex gap-5'>
//                     <p>{item.name}</p>
//                     <p>{item.price}</p>
//                     <p>{cartItems[item._id]}</p>
//                     <p>{item.price*cartItems[item._id]}</p>
//                     <p className='cursor-pointer' onClick={() => removeFromCart(item._id)}>X</p>
//                   </div>
//                   <hr/>
//                 </>
//               )
//             }
//           })
//         }
//       </main>
//       <div className='mt-11'>
//         <div>
//           <h1>cart total</h1>
//           <div>
//             <div>
//               <p>subtotal</p>
//               <p>{getCartTotalAmount()}</p>
//             </div>
//             <hr/>
//             <div>
//               <p>delivery charges</p>
//               <p>{getCartTotalAmount()===0?0:2}</p>
//             </div>
//             <hr/>
//             <div>
//               <b>Total</b>
//               <b>{getCartTotalAmount()===0?0:getCartTotalAmount() + 2}</b>
//             </div>
//           </div>
//           <button onClick={() => navigate('/place-order')}>Procced to checkout</button>
//         </div>
//         <div>
//           <div>
//             <p>Enter promocode</p>
//             <div>
//               <input type='text' placeholder='promocode'/>
//               <button>submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartPage;
import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, combinedMenu, removeFromCart, getCartTotalAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto pt-16">
      <h1 className="text-3xl font-bold text-center mb-8">Cart Items</h1>
      <div className="overflow-x-auto">
        <div className="flex justify-between font-semibold border-b pb-2">
          <span>Item</span>
          <span>Title</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
          <span>Remove</span>
        </div>
        <hr className="my-2" />
        {combinedMenu.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <span>{cartItems[item._id]}</span>
                <span>${(item.price * cartItems[item._id]).toFixed(2)}</span>
                <span className="cursor-pointer text-red-500" onClick={() => removeFromCart(item._id)}>X</span>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="mt-8 p-4 border-t">
        <h2 className="text-2xl font-bold mb-4">Cart Total</h2>
        <div className="flex justify-between mt-2">
          <span>Subtotal:</span>
          <span>${getCartTotalAmount().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Delivery Charges:</span>
          <span>${getCartTotalAmount() === 0 ? '0.00' : '2.00'}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${getCartTotalAmount() === 0 ? '0.00' : (getCartTotalAmount() + 2).toFixed(2)}</span>
        </div>
        <button 
          onClick={() => navigate('/place-order')} 
          className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Proceed to Checkout
        </button>
      </div>

      <div className="mt-6 p-4 border-t">
        <h2 className="text-lg font-semibold mb-2">Enter Promo Code</h2>
        <div className="flex">
          <input 
            type='text' 
            placeholder='Promo Code' 
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button 
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
