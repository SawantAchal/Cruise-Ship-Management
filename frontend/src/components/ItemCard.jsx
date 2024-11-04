// import React, { useContext } from 'react'
// import { StoreContext } from '../context/StoreContext'

// const ItemCard = ({id , name , category , image , price , description}) => {
//   const {cartItems, setCartItems , addToCart , removeFromCart}= useContext(StoreContext)

//   return (
//     <>
//       <div>
//         <h1> ItemCard</h1>
//         <div className='grid grid-cols-4  border-blue-400 border-solid border-2 gap-3 cursor-pointer'>
//           <div >
//             <img src={image} alt={name} />
//             {/* checkif food item count 0 then we will provide add button or if food item count is greadter than 0 then we will provide counter */}
//             {
//               !cartItems[id]
//               ?<p onClick={()=>addToCart(id)}>+</p>
//               :<div>
//                 <p onClick={()=>removeFromCart(id)}>-</p>
//                 <p>{cartItems[id]}</p>
//                 <p onClick={()=>addToCart(id)}>+</p>
//               </div>
//             }
//           </div>
//           <div>
//             <div>
//               <p>{name}</p>
//               <p>rating start</p>
//             </div>
//             <div>
//               <p>{description}</p>
//               <p>{price}</p>
//               <p>{category}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }


// export default ItemCard;
import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const ItemCard = ({ id, name, category, image, price, description }) => {
    const { cartItems, addToCart, removeFromCart ,url} = useContext(StoreContext);

    return (
        <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
            <img src={url+'/images/'+image} alt={name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{name}</h2>
                <p className="text-sm text-gray-600 mb-4">{description}</p>
                <p className="text-xl font-bold text-green-600 mb-2">${price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{category}</p>
                {/* Check if food item count is 0; provide add button or counter */}
                <div className="flex items-center mt-4">
                    {
                        !cartItems[id] ? (
                            <button 
                                onClick={() => addToCart(id)} 
                                className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                            >
                                Add +
                            </button>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <button 
                                    onClick={() => removeFromCart(id)} 
                                    className="px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    -
                                </button>
                                <p className="text-center">{cartItems[id]}</p>
                                <button 
                                    onClick={() => addToCart(id)} 
                                    className="px-2 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
