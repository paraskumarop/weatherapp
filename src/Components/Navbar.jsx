import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-slate-950 text-white flex justify-between items-center p-4">
      <ul className="flex items-center space-x-4 cursor-pointer ">
      <h1 className=" px-3 py-2  text-orange-100 text-2xl  hover:text-orange-600 ">
        <NavLink to="/location" className="px-3 py-2 rounded  hover:bg-gray-700 active:bg-gray-900">
            MausamAwesome
          </NavLink>
      </h1>
        <li>
          <NavLink to="/" className="px-3 py-2 rounded  hover:bg-gray-700 active:bg-gray-900">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className="px-3 py-2  rounded hover:bg-gray-700 active:bg-gray-900">
            History
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
