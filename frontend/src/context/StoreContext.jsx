import React, { createContext, useEffect, useState } from 'react';
import { menuData ,stationeryMenu } from '../assets/menuData';

export const StoreContext = createContext(null);

const StoreContextProvider  = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({...prev,[itemId]:1}))
      // console.log('iid' , itemId)
    }else{
      setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
    }
  };
  
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev,[itemId] : prev[itemId]-1}))
  }

  // const allItem = [...menuData , ...stationeryMenu]
  const combinedMenu = [...menuData, ...stationeryMenu];

  const getCartTotalAmount = () => {
    let totalAmount = 0 ;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = combinedMenu.find((product) => product._id === Number(item))
          totalAmount += itemInfo.price * cartItems[item]
      }
    }
    return totalAmount;
  }

  useEffect(() => {
    console.log('cartItems' , cartItems)
    console.log("Menu Data:", menuData);
    console.log("Stationery Data:", stationeryMenu);
  },[cartItems])

  const contextValue = {
    addToCart ,
    removeFromCart,
    cartItems,
    setCartItems,
    menuData ,
    stationeryMenu,
    getCartTotalAmount,
    combinedMenu
  }

  return (
    <StoreContext.Provider value={contextValue} >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider

