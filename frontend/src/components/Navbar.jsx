import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
    const [menu, setMenu] = useState();
    const { setToken  , token} = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("cruise token");
        setToken("");
        navigate('/');
    };

    return (
        <nav className="bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-md fixed w-full z-50">
            {
                !token ? '' :             <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link to={'/home-page'}>
                    <p className="text-2xl font-bold">CruiseShip</p>
                </Link>

                {/* Menu Links */}
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

                {/* Profile and Cart Icons */}
                <div className='flex items-center gap-4'>
                    {/* Profile Dropdown */}
                    <div className="relative group">
                        {/* Profile Icon */}
                        <CgProfile/>
                        <ul className='absolute hidden z-10 right-3 group-hover:flex group-hover:flex-col group-hover:p-3 gap-2 bg-white shadow-md rounded border border-solid text-black border-red-500 outline-2 outline-none outline-white w-28'>
                            <li onClick={() => navigate('/cart-page')} className='flex items-center gap-2 cursor-pointer hover:text-red-500'>cart</li>
                            <li onClick={logout}>logout</li>
                            <li onClick={() => navigate('/profile')}>profile</li>
                        </ul>
                    </div>
                </div>
            </div>
            }

        </nav>
    );
};

export default Navbar;
