import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="pt-44 w-64 h-screen bg-gray-800 text-white fixed">
      <div className="flex flex-col space-y-4 p-4">
      <NavLink to={'/all-users'} className="hover:text-gray-300 transition duration-200">
          <p>All users</p>
        </NavLink>
        <NavLink to={'/usersAll-orders'} className="hover:text-gray-300 transition duration-200">
          <p>All orders</p>
        </NavLink>
        <hr/>
        <NavLink to={'/add-menu'} className="hover:text-gray-300 transition duration-200">
          <p>Add Menu</p>
        </NavLink>
        <NavLink to={'/listof-menu'} className="hover:text-gray-300 transition duration-200">
          <p>List of Menu</p>
        </NavLink>
        <NavLink to={'/menu-order'} className="hover:text-gray-300 transition duration-200">
          <p>Menu Orders</p>
        </NavLink>
        <hr/>
        <NavLink to={'/add-stationery'} className="hover:text-gray-300 transition duration-200">
          <p>Add Stationery</p>
        </NavLink>
        <NavLink to={'/listof-stationery'} className="hover:text-gray-300 transition duration-200">
          <p>List of Stationery</p>
        </NavLink>
        <NavLink to={'/stationery-order'} className="hover:text-gray-300 transition duration-200">
          <p>Stationery Orders</p>
        </NavLink>
        <hr/>
        <NavLink to={'/movies'} className="hover:text-gray-300 transition duration-200">
          <p>Manage Movies</p>
        </NavLink>
        <NavLink to={'/bookings'} className="hover:text-gray-300 transition duration-200">
          <p>Manage Bookings</p>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
