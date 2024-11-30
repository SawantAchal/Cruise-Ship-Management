import React from 'react';
import bg from '../assets/bg3.jpg';

const Header = () => {
  return (
    <main
      className="w-full h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.7)' // Slightly darkened for text visibility
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div> {/* Gradient overlay */}
      <div className="relative z-10 text-center text-white p-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to CruiseShip</h1>
        <p className="text-lg mb-8">Experience the journey of a lifetime with us!</p>
        <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:shadow-lg transition duration-300">
          Book Now
        </button>
      </div>
    </main>
  );
};

export default Header;

