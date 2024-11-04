// import React, { useState } from 'react'
// import { CiShoppingCart } from "react-icons/ci";
// import { Link } from 'react-router-dom';
// const Navbar = () => {
//     const [menu , setMenu] = useState()
//   return (
//     <>
//         <nav className="bg-blue-600 text-white shadow-md fixed w-full z-50">
//             <div className="container mx-auto flex justify-between items-center p-4">
//                 <div>
//                     <p>CuriseShip</p>
//                 </div>
//                 <div className=" md:flex space-x-6">
//                     <p> <a href="#menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a></p>
//                     <p><a href="#stationery" onClick={() => setMenu('stationery')} className={menu === 'stationery' ? 'active' : ''}>Stationery</a></p>
//                     <p> <a href="#movies"onClick={() => setMenu('movies')} className={menu === 'movies' ? 'active' : ''} >Movies</a></p>
//                     <p><a href="#beauty" onClick={() => setMenu('beauty')} className={menu === 'beauty' ? 'active' : ''}>Beauty</a></p>
//                     <p><a href="#fitness"onClick={() => setMenu('fitness')} className={menu === 'fitness' ? 'active' : ''}>Fitness</a></p>
//                     <p><a href="#party" onClick={() => setMenu('party')} className={menu === 'party' ? 'active' : ''}>Party</a></p>
//                 </div>
//                 <div className='flex'>
//                 <Link to={'/cart-page'}>
//                     <CiShoppingCart/></Link>
//                     <div className='bg-pink-500 h-3 w-3 rounded-full'></div>
//                     <button className="p-2 rounded-full bg-white text-blue-600 hover:bg-gray-200 focus:outline-none">
//                         sign in
//                     </button>
//                 </div>
//             </div>
//         </nav>
//     </>
//   )
// }

// export default Navbar
import React, { useContext, useState } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = () => {
    const [menu, setMenu] = useState();
    const {token , setToken} = useContext(StoreContext)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("cruise token");
        setToken("")
        navigate('/')
    }

    return (
        <nav className="bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-md fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div>
                    <p className="text-2xl font-bold">CruiseShip</p>
                </div>
                <div className="md:flex space-x-8">
                    <p>
                        <a href="#menu" onClick={() => setMenu('menu')} className={`transition duration-300 ${menu === 'menu' ? 'font-semibold underline' : ''}`}>Menu</a>
                    </p>
                    <p>
                        <a href="#stationery" onClick={() => setMenu('stationery')} className={`transition duration-300 ${menu === 'stationery' ? 'font-semibold underline' : ''}`}>Stationery</a>
                    </p>
                    <p>
                        <a href="#movies" onClick={() => setMenu('movies')} className={`transition duration-300 ${menu === 'movies' ? 'font-semibold underline' : ''}`}>Movies</a>
                    </p>
                    <p>
                        <a href="#beauty" onClick={() => setMenu('beauty')} className={`transition duration-300 ${menu === 'beauty' ? 'font-semibold underline' : ''}`}>Beauty</a>
                    </p>
                    <p>
                        <a href="#fitness" onClick={() => setMenu('fitness')} className={`transition duration-300 ${menu === 'fitness' ? 'font-semibold underline' : ''}`}>Fitness</a>
                    </p>
                    <p>
                        <a href="#party" onClick={() => setMenu('party')} className={`transition duration-300 ${menu === 'party' ? 'font-semibold underline' : ''}`}>Party</a>
                    </p>
                </div>
                <div className='flex items-center'>
                    <Link to={'/cart-page'} className="relative">
                        <CiShoppingCart className="text-2xl" />
                        <div className='absolute -top-1 -right-2 bg-pink-500 h-3 w-3 rounded-full'></div>
                    </Link>
                    <Link to={'/login'}><button className="ml-4 p-2 rounded-full bg-white text-teal-600 hover:bg-gray-200 focus:outline-none transition duration-300">
                        Sign In
                    </button></Link>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
