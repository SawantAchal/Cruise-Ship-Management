import React, { useState } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [menu , setMenu] = useState()
  return (
    <>
        <nav className="bg-blue-600 text-white shadow-md fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div>
                    <p>CuriseShip</p>
                </div>
                <div className=" md:flex space-x-6">
                    <p> <a href="#menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a></p>
                    <p><a href="#stationery" onClick={() => setMenu('stationery')} className={menu === 'stationery' ? 'active' : ''}>Stationery</a></p>
                    <p> <a href="#movies"onClick={() => setMenu('movies')} className={menu === 'movies' ? 'active' : ''} >Movies</a></p>
                    <p><a href="#beauty" onClick={() => setMenu('beauty')} className={menu === 'beauty' ? 'active' : ''}>Beauty</a></p>
                    <p><a href="#fitness"onClick={() => setMenu('fitness')} className={menu === 'fitness' ? 'active' : ''}>Fitness</a></p>
                    <p><a href="#party" onClick={() => setMenu('party')} className={menu === 'party' ? 'active' : ''}>Party</a></p>
                </div>
                <div className='flex'>
                <Link to={'/cart-page'}>
                    <CiShoppingCart/></Link>
                    <div className='bg-pink-500 h-3 w-3 rounded-full'></div>
                    <button className="p-2 rounded-full bg-white text-blue-600 hover:bg-gray-200 focus:outline-none">
                        sign in
                    </button>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar