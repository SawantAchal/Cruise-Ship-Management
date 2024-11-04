import React, { createContext, useEffect, useState } from 'react';
import { menuData ,stationeryData } from '../assets/menuData';
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider  = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = 'http://localhost:4000'
  const [token ,setToken] = useState('')
  const [menuData , setMenuData]= useState([])
  const [stationeryData , setstationeryData]= useState([])


  const addToCart = async(itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({...prev,[itemId]:1}))
      // console.log('iid' , itemId)
    }else{
      setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
    }
    if (token) {
      await axios.post(url+'/api/cart/addToCart' , {itemId} ,{headers:{token}})
    }
  };
  
  const removeFromCart = async(itemId) => {
    setCartItems((prev) => ({...prev,[itemId] : prev[itemId]-1}))
    if (token) {
      await axios.post(url+'/api/cart/removeFromCart' , {itemId} ,{headers:{token}})
    }
  }

  const combinedMenu = [...menuData, ...stationeryData];

  const getCartTotalAmount = () => {
    let totalAmount = 0 ;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = combinedMenu.find((product) => product._id === (item))
          // Only add to total if `itemInfo` is found
          totalAmount += itemInfo.price*cartItems[item];
          // if (itemInfo) {
          //   totalAmount += itemInfo.price*cartItems[item];
          // }
        }
      }
    return totalAmount;
  }

  useEffect(() => {
    console.log('cartItems' , cartItems)
    console.log("Menu Data:", menuData);
    console.log("Stationery Data:", stationeryData);
  },[cartItems])



  const fetchMenuList = async () => {
    const response = await axios.get(url+'/api/menu/all-menuItem')
    setMenuData(response.data.data)
  }

  const fetchStationeryList = async () => {
    const response = await axios.get(url+'/api/stationery/all-stationeryProduct')
    setstationeryData(response.data.data)
  }

  const loadCartData = async(token) => {
    const response = await axios.post(url+'/api/cart/getFromCart' ,{} , {headers:{token}})
    setCartItems(response.data.cartData)
  }
    //presist from logout the user after refresh
    useEffect(() => {
      async function loadData() {
        await fetchMenuList();
        await fetchStationeryList()
        if (localStorage.getItem('cruise token')) {
          setToken(localStorage.getItem('cruise token'))
          await loadCartData(localStorage.getItem('cruise token'))
        }
      }
      loadData()
    },[])

  const contextValue = {
    addToCart ,
    removeFromCart,
    cartItems,
    setCartItems,
    menuData ,
    stationeryData,
    getCartTotalAmount,
    combinedMenu,
    url,
    token,
    setToken
  }

  return (
    <StoreContext.Provider value={contextValue} >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider

