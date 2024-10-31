import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'

const ItemCard = ({id , name , category , image , price , description}) => {
  const {cartItems, setCartItems , addToCart , removeFromCart}= useContext(StoreContext)

  return (
    <>
      <div>
        <h1> ItemCard</h1>
        <div className='grid grid-cols-4  border-blue-400 border-solid border-2 gap-3 cursor-pointer'>
          <div >
            <img src={image} alt={name} />
            {/* checkif food item count 0 then we will provide add button or if food item count is greadter than 0 then we will provide counter */}
            {
              !cartItems[id]
              ?<p onClick={()=>addToCart(id)}>+</p>
              :<div>
                <p onClick={()=>removeFromCart(id)}>-</p>
                <p>{cartItems[id]}</p>
                <p onClick={()=>addToCart(id)}>+</p>
              </div>
            }
          </div>
          <div>
            <div>
              <p>{name}</p>
              <p>rating start</p>
            </div>
            <div>
              <p>{description}</p>
              <p>{price}</p>
              <p>{category}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default ItemCard;
