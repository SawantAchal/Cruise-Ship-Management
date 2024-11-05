import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import {Route, Routes} from 'react-router-dom'
import CartPage  from './pages/CartPage'
import PlaceOrder from './pages/PlaceOrder'
import VerifyOrder from './pages/VerifyOrder'
import Myorders from './pages/Myorders'
import ProtectedRoute from './components/ProtectedRoute'
import ProfilePage from './pages/ProfilePage'
import { useContext } from 'react'
import { StoreContext } from './context/StoreContext'
import SeatSelection from './components/SeatSelection'
import BookMovie from './components/BookMovie'

function App() {
  const {token} = useContext(StoreContext)
  return (
    <>
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
        <Route path='/seat-selection' element={<SeatSelection/>}/> 
        <Route path='/book-movie' element={<BookMovie/>}/>
        </>
}
        {}

      </Routes>
    </>
  )
}

export default App
