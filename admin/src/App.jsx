// import './App.css'
// import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'
// import {Route, Routes} from 'react-router-dom'
// import AddMenu from './pages/AddMenu'
// import DisplayMenu from './pages/DisplayMenu'
// import MenuOrder from './pages/MenuOrder'
// import AddStationery from './pages/AddStationery'
// import DisplayStationery from './pages/DisplayStationery'
// import StationeryOrder from './pages/StationeryOrder'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// function App() {
//   const url ='http://localhost:4000'
  
//   return (
//     <>
//     <ToastContainer/>
//       <Navbar/>
//       <hr/>
//       <div className='flex gap-32'>
//         <Sidebar/>
//         <div className='pt-48'>
//         <Routes>
//           <Route path='/add-menu' element={<AddMenu url={url}/>}/>
//           <Route path='/listof-menu' element={<DisplayMenu url={url}/>}/>
//           <Route path='/menu-order' element={<MenuOrder url={url}/>}/>
//           <Route path='/add-stationery' element={<AddStationery url={url}/>}/>
//           <Route path='/listof-stationery' element={<DisplayStationery url={url}/>}/>
//           <Route path='/stationery-order' element={<StationeryOrder url={url}/>}/>
//         </Routes>
//         </div>
//       </div>
//     </>
//   )
// }

// export default App


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
import AddMovie from './pages/AddMovie'
import AllMovies from './pages/AllMovies'
import AllMovieBookings from './pages/AllMovieBookings'

function App() {
  const url = 'http://localhost:4000'

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
            <Route path="/add-movie" element={<AddMovie url={url} />} />
            <Route path="/all-movies" element={<AllMovies url={url} />} />
            <Route path="/all-BookedMovies" element={<AllMovieBookings url={url} />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
