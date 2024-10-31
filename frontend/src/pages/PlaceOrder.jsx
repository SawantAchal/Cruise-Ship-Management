// import React, { useContext } from 'react'
// import { StoreContext } from '../context/StoreContext'

// const PlaceOrder = () => {
//   const {getCartTotalAmount} = useContext(StoreContext)
//   return (
//     <>
//       <div className='pt-80'>
//         <h1>Placr order form</h1>
//         <form>
//           <div>
//             <p>delivery information</p>
//             <div>
//               <input type='text' placeholder='first name'/>
//               <input type='text' placeholder='last name'/>
//             </div>
//             <input type='email' placeholder='email adress name'/>
//             <input type='text' placeholder='street'/>
//             <div>
//               <input type='text' placeholder='city name'/>
//               <input type='text' placeholder='state name'/>
//             </div>
//             <div>
//               <input type='text' placeholder='zipcode'/>
//               <input type='text' placeholder='country name'/>
//             </div>
//             <input type='tel' placeholder='phone'/>
//           </div>
//           <div>
//           <div>
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
//           <button >Procced to payment</button>
//         </div>
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }

// export default PlaceOrder




import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const PlaceOrder = () => {
  const { getCartTotalAmount } = useContext(StoreContext);
  
  return (
    <div className="container mx-auto pt-16">
      <h1 className="text-3xl font-bold text-center mb-6">Place Order Form</h1>
      <form className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Delivery Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type='text' 
              placeholder='First Name' 
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
              required 
            />
            <input 
              type='text' 
              placeholder='Last Name' 
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
              required 
            />
          </div>
          <input 
            type='email' 
            placeholder='Email Address' 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
            required 
          />
          <input 
            type='text' 
            placeholder='Street' 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
            required 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type='text' 
              placeholder='City' 
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
              required 
            />
            <input 
              type='text' 
              placeholder='State' 
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
              required 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type='text' 
              placeholder='Zip Code' 
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
              required 
            />
            <input 
              type='text' 
              placeholder='Country' 
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
              required 
            />
          </div>
          <input 
            type='tel' 
            placeholder='Phone Number' 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
            required 
          />
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Cart Total</h2>
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
            type="submit" 
            className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
