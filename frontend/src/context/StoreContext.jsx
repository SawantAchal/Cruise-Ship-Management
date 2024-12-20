import React, { createContext, useEffect, useState } from 'react';
import { menuData ,stationeryData } from '../assets/menuData';
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider  = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = 'https://cruise-ship-management.onrender.com'
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
          // totalAmount += itemInfo.price*cartItems[item];
          if (itemInfo) {
            totalAmount += itemInfo.price*cartItems[item];
          }
        }
      }
    return totalAmount;
  }

  useEffect(() => {
    // console.log('cartItems' , cartItems)
    // console.log("Menu Data:", menuData);
    // console.log("Stationery Data:", stationeryData);
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
    // useEffect(() => {
    //   async function loadData() {
    //     await fetchMenuList();
    //     await fetchStationeryList()
    //     if (localStorage.getItem('cruise token')) {
    //       setToken(localStorage.getItem('cruise token'))
    //       await loadCartData(localStorage.getItem('cruise token'))
    //     }
    //   }
    //   loadData()
    // },[])
    useEffect(() => {
      async function loadData() {
          await fetchMenuList();
          await fetchStationeryList();
          const storedToken = localStorage.getItem('cruise token');
          if (storedToken) {
              setToken(storedToken);
              await loadCartData(storedToken);
          }
      }
      loadData();
  }, []);
  
  //for movie booking
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // const fetchMovies = async() => {
  //   const response = await axios.get(url+'/api/movie/all-movie')
  //   setMovies(response.data.data)
  // }

  // useEffect(() => {
  //   fetchMovies()
  // },[])






  // for fitness 
  const [user, setUser] = useState(null); // Store user info
  const [selectedClass, setSelectedClass] = useState(null); // Store selected class
  const [bookings, setBookings] = useState([]); // Store user bookings

  const addBooking = (newBooking) => {
    setBookings((prev) => [...prev, newBooking]);
  };

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
    setToken,
    selectedMovie, 
    setSelectedMovie,
    selectedShowtime,
    setSelectedShowtime,
    selectedSeats,
    setSelectedSeats,
    totalAmount, 
    setTotalAmount,

    //fitness
    selectedClass,
    setSelectedClass,
    bookings, 
    setBookings,
    user, 
    setUser,
    addBooking

  }

  return (
    <StoreContext.Provider value={contextValue} >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider
