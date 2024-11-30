import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import {Route, Routes} from 'react-router-dom'
import CartPage  from './pages/CartPage'
import PlaceOrder from './pages/PlaceOrder'
import VerifyOrder from './pages/VerifyOrder'
import Myorders from './pages/Myorders'
import ProfilePage from './pages/ProfilePage'
import { useContext } from 'react'
import { StoreContext } from './context/StoreContext'
import Classes from './components/Classes'
import ClassDetails from './components/ClassDetails'
import MovieListPage from './pages/MovieListPage'
import MovieDetails from './pages/MovieDetails'
import MovieBookingHistory from './components/MovieBookingHistory'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {token} = useContext(StoreContext)
  return (
    <>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        {!token ? <Route path='/' element={<Login/>}/> : 
        <>
          <Route path='/home-page' element={<HomePage />} />
          <Route path='/cart-page' element={<CartPage />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/verify' element={<VerifyOrder/>}/>
          <Route path='/my-order' element={<Myorders/>}/>
          <Route path='/profile' element={<ProfilePage/>}/> 
          <Route path="/classes" element={<Classes />} />
          <Route path="/class-details/:id" element={<ClassDetails />} />
          <Route path='/movies' element={<MovieListPage/>} />
          <Route path='/movies/:id' element={<MovieDetails/>}/>
          <Route path='/bookings' element={<MovieBookingHistory/>}/>
        </>
        }
      </Routes>
    </>
  )
}

export default App
