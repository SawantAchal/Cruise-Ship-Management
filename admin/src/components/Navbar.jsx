import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-12 bg-gray-900 text-white flex justify-between items-center px-8 shadow-md z-10">
      <div className="text-lg font-semibold">
        <h1>Achal Sawant</h1>
      </div>
      <div className="flex gap-8 text-sm font-medium">
        <p className="cursor-pointer hover:text-gray-300">Menu</p>
        <p className="cursor-pointer hover:text-gray-300">Stationery</p>
      </div>
    </nav>
  )
}

export default Navbar
