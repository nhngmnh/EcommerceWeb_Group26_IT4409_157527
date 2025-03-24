import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

const HeaderComponent = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-12 py-4 border-b">
      {/* Logo */}
      <Link to="/" className="flex items-center px-4">
        <img src="/logo.png" alt="Logo" className="h-10" />
      </Link>

      {/* Search Bar */}
       {/* Search Bar */}
       <div className="px-8 flex-1 max-w-[600px] relative">
        <div className="relative w-full">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full pl-12 pr-4 py-2 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>
      {/* Icons and Sign In Button */}
      <div className="flex items-center gap-10 px-4">
        <div className="flex flex-col items-center cursor-pointer group py-2">
          <FaHeart className="text-2xl text-gray-800 group-hover:text-red-500 transition-colors" />
          <span className="text-xs text-gray-700 group-hover:text-red-500">Favorites</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer group py-2">
          <FaShoppingCart className="text-2xl text-gray-800 group-hover:text-blue-500 transition-colors" />
          <span className="text-xs text-gray-700 group-hover:text-blue-500">Cart</span>
        </div>
        <Link to="/signin">
          <button className="flex items-center gap-2 bg-transparent bg-none text-gray-800 px-4 py-2 border-gray-400 border rounded-lg hover:bg-gray-200">
            Sign In
          </button>
        </Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
