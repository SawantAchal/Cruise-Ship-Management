import React from 'react';
import { exploreMenu } from '../assets/menuData.js';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="py-8 px-4">
      <h1 className='text-center text-5xl font-bold text-gray-800 mb-6'>Explore Menu</h1>
      <div className='flex justify-center items-center bg-gradient-to-r from-pink-400 to-pink-600 rounded-lg p-4 shadow-md'>
        {exploreMenu.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))}
            className={`cursor-pointer text-white text-lg font-medium mx-4 p-2 rounded-lg transition-colors duration-300 
              ${category === item.menu_name ? 'bg-white text-pink-600' : 'hover:bg-pink-500 hover:opacity-80'}`}
          >
            {item.menu_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
