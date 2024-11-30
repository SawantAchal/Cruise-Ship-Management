import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { CgProfile } from "react-icons/cg";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [menu, setMenu] = useState();
    const { setToken, token } = useContext(StoreContext);
    const navigate = useNavigate();
    
    // Sidebar toggle state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("cruise token");
        setToken("");
        navigate('/');
    };

    return (
        <div className="relative">
            <div className={`fixed inset-0 z-40 bg-gradient-to-r from-green-400 to-teal-500 md:hidden p-4 text-white space-y-8 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Close Icon when Sidebar is Open */}
                <div className="absolute top-4 right-4">
                    <FaTimes className="text-3xl cursor-pointer"onClick={() => setIsSidebarOpen(false)} />
                </div>

                {/* Menu Links in Sidebar */}
                <div className="space-y-6 pt-24">
                    <p>
                        <a href="#menu" onClick={() => setMenu('menu')} className={`transition duration-300 ${menu === 'menu' ? 'font-semibold underline' : ''}`}>Menu</a>
                    </p>
                    <p>
                        <a href="#stationery" onClick={() => setMenu('stationery')} className={`transition duration-300 ${menu === 'stationery' ? 'font-semibold underline' : ''}`}>Stationery</a>
                    </p>
                    <p>
                        <a href="/movies" onClick={() => setMenu('movies')} className={`transition duration-300 ${menu === 'movies' ? 'font-semibold underline' : ''}`}>Movies</a>
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

                {/* Profile and Cart in Sidebar */}
                <div className="flex flex-col gap-4 mt-6 ">
                    <div onClick={() => navigate('/cart-page')} className="cursor-pointer hover:text-red-500">Cart</div>
                    <div onClick={logout} className="cursor-pointer hover:text-red-500">Logout</div>
                    <div onClick={() => navigate('/profile')} className="cursor-pointer hover:text-red-500">Profile</div>
                </div>
            </div>

            {/* Overlay when sidebar is open (for mobile view) */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}/>
            )}

            {/* Navbar for Desktop (Horizontal navbar for large screens) */}
            <nav className="bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-md fixed w-full z-50">
                {
                    !token ? '' :             
                    <div className="container mx-auto flex justify-between items-center p-4">
                        {/* Logo */}
                        <Link to={'/home-page'}>
                            <p className="text-2xl font-bold">CruiseShip</p>
                        </Link>

                        {/* Hamburger Icon for Mobile */}
                        <div className="md:hidden flex items-center" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            {isSidebarOpen ? (
                                <FaTimes className="text-3xl cursor-pointer" />
                            ) : (
                                <FaBars className="text-3xl cursor-pointer" />
                            )}
                        </div>

                        {/* Menu Links in Navbar (for large screens) */}
                        <div className="hidden md:flex space-x-8">
                            <p>
                                <a href="#menu" onClick={() => setMenu('menu')} className={`transition duration-300 ${menu === 'menu' ? 'font-semibold underline' : ''}`}>Menu</a>
                            </p>
                            <p>
                                <a href="#stationery" onClick={() => setMenu('stationery')} className={`transition duration-300 ${menu === 'stationery' ? 'font-semibold underline' : ''}`}>Stationery</a>
                            </p>
                            <p>
                                <a href="/movies" onClick={() => setMenu('movies')} className={`transition duration-300 ${menu === 'movies' ? 'font-semibold underline' : ''}`}>Movies</a>
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
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                {/* Profile Icon */}
                                <CgProfile className="text-2xl cursor-pointer md:block hidden" />
                                {/* Profile Dropdown Menu */}
                                <ul className="absolute hidden group-hover:flex group-hover:flex-col right-0 group-hover:p-3 flex-col p-3 gap-2 bg-white shadow-md rounded border border-solid text-black border-red-500 outline-2 outline-none outline-white w-28 z-50">
                                    <li onClick={() => navigate('/cart-page')} className="cursor-pointer hover:text-red-500">Cart</li>
                                    <li onClick={logout} className="cursor-pointer hover:text-red-500"> Logout</li>
                                    <li onClick={() => navigate('/profile')} className="cursor-pointer hover:text-red-500"> Profile</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </nav>
        </div>
    );
};

export default Navbar;
