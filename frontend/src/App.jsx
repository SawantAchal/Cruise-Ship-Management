import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import {Route, Routes} from 'react-router-dom'
import CartPage  from './pages/CartPage'
import PlaceOrder from './pages/PlaceOrder'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart-page' element={<CartPage />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </>
  )
}

export default App
