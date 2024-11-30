import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddMenu from './pages/AddMenu'
import DisplayMenu from './pages/DisplayMenu'
import MenuOrder from './pages/MenuOrder'
import AddStationery from './pages/AddStationery'
import DisplayStationery from './pages/DisplayStationery'
import StationeryOrder from './pages/StationeryOrder'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllUsers from './pages/AllUsers'
import AllOrders from './pages/AllOrders'
import MovieManagement from './pages/MovieManagement'
import BookingManagement from './pages/BookingManagement'

function App() {
  const url = 'https://cruise-ship-management.onrender.com'

  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr className="border-gray-300" />
      <div className="flex">
        <Sidebar className="w-1/4 min-h-screen bg-gray-100 p-4" />
        <div className="flex-1 p-6 pt-24 ml-52">
          <Routes>
            <Route path="/add-menu" element={<AddMenu url={url} />} />
            <Route path="/listof-menu" element={<DisplayMenu url={url} />} />
            <Route path="/menu-order" element={<MenuOrder url={url} />} />
            <Route path="/add-stationery" element={<AddStationery url={url} />} />
            <Route path="/listof-stationery" element={<DisplayStationery url={url} />} />
            <Route path="/stationery-order" element={<StationeryOrder url={url} />} />
            <Route path="/all-users" element={<AllUsers url={url} />} />
            <Route path="/usersAll-orders" element={<AllOrders url={url} />} />
            <Route path="/movies" element={<MovieManagement url={url} />} />
            <Route path="/bookings" element={<BookingManagement url={url} />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
