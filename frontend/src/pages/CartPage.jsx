import React, { useContext } from 'react';
import {  StoreContext } from '../context/StoreContext';
import {useNavigate} from 'react-router-dom'

const CartPage = () => {
  const { cartItems ,  menuData , stationeryData, removeFromCart ,getCartTotalAmount ,combinedMenu, url} = useContext(StoreContext);
  const navigate = useNavigate()
  return (
    <div>
      <main className='pt-60'>
        <div>
          <div>
            cart items
          </div>
          <div className='flex gap-5'>
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
        {
          combinedMenu.map((item , index) => {
            if (cartItems[item._id]>0) {
              return(
                <>
                  <div key={index} className='flex gap-5'>
                  <img src={url+"/images/"+item.image} alt={item.name} className='w-16 h-16 object-cover rounded'/>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{item.price*cartItems[item._id]}</p>
                    <p className='cursor-pointer' onClick={() => removeFromCart(item._id)}>X</p>
                  </div>
                  <hr/>
                </>
              )
            }
          })
        }
      </main>
      <div className='mt-11'>
        <div>
          <h1>cart total</h1>
          <div>
            <div>
              <p>subtotal</p>
              <p>{getCartTotalAmount()}</p>
            </div>
            <hr/>
            <div>
              <p>delivery charges</p>
              <p>{getCartTotalAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div>
              <b>Total</b>
              <b>{getCartTotalAmount()===0?0:getCartTotalAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/place-order')}>Procced to checkout</button>
        </div>
        <div>
          <div>
            <p>Enter promocode</p>
            <div>
              <input type='text' placeholder='promocode'/>
              <button>submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage;