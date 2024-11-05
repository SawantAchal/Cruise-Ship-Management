import React, { Children, useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {
  const {getCartTotalAmount , token , combinedMenu, cartItems , url} = useContext(StoreContext)
  const [data , setData] = useState ({
    firstName:'',
    lastName:'',
    email:'',
    roomNo:'',
    phone:''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = name === 'roomNo' ? parseInt(e.target.value, 10) : e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  useEffect(() => {
    console.log("place order " ,data)
  },[data])

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const placeOrder = async(e) => {
    e.preventDefault()
    let orderItems = [] ;
    combinedMenu.map((item) => {
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] =cartItems[item._id];
        // let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo)
      }
    })
    console.log("order items" ,orderItems)
    let orderData = {
      roomNo:data.roomNo,
      items:orderItems,
      amount:getCartTotalAmount()*100+2*100,
    }
    try {
      let response = await axios.post(url+'/api/order/place-order' , orderData,{headers:{token}})
      if (response.data.success) {
        const {session_url} = response.data;
        window.location.replace(session_url);
      }else{
        const errorMessage = typeof response.data.message === 'string'
        ? response.data.message
        : JSON.stringify(response.data.message);
      alert(errorMessage);
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <div className='pt-80'>
        <h1>Placr order form</h1>
        <form onSubmit={placeOrder}>
          <div>
            <p>delivery information</p>
            <div>
              <input  onChange={onChangeHandler} name='firstName' value={data.firstName} type='text' placeholder='first name' required/>
              <input onChange={onChangeHandler} name='lastName' value={data.lastName} type='text' placeholder='last name' required/>
            </div>
            <input onChange={onChangeHandler} name='email' value={data.email} type='email' placeholder='email adress ' required/>
            <input onChange={onChangeHandler} name='roomNo' value={data.roomNo} type='number' placeholder='Room no' required/>
            <div>
              {/* <input type='text' placeholder='city name'/>
              <input type='text' placeholder='state name'/> */}
            </div>
            {/* <div>
              <input type='text' placeholder='zipcode'/>
              <input type='text' placeholder='country name'/>
            </div> */}
            <input onChange={onChangeHandler} name='phone' value={data.phone} type='tel' placeholder='phone' required/>
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
              <p>{getCartTotalAmount()===0?0:''}</p>
            </div>
            <hr/>
            <div>
              <b>Total</b>
              <b>{getCartTotalAmount()===0?0:getCartTotalAmount() }</b>
            </div>
          </div>
          <button type='submit'>Procced to payment</button>
        </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default PlaceOrder