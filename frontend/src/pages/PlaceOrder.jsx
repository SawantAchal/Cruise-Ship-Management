import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'

const PlaceOrder = () => {
  const {getCartTotalAmount} = useContext(StoreContext)
  return (
    <>
      <div className='pt-80'>
        <h1>Placr order form</h1>
        <form>
          <div>
            <p>delivery information</p>
            <div>
              <input type='text' placeholder='first name'/>
              <input type='text' placeholder='last name'/>
            </div>
            <input type='email' placeholder='email adress name'/>
            <input type='text' placeholder='street'/>
            <div>
              <input type='text' placeholder='city name'/>
              <input type='text' placeholder='state name'/>
            </div>
            <div>
              <input type='text' placeholder='zipcode'/>
              <input type='text' placeholder='country name'/>
            </div>
            <input type='tel' placeholder='phone'/>
          </div>
          <div>
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
          <button >Procced to payment</button>
        </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default PlaceOrder