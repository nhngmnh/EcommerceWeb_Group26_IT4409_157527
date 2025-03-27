import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaSearch, FaShoppingCart, FaUser, FaChevronDown } from "react-icons/fa";
import { categories } from "../types/categories";


const HeaderComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearchIconClick = () => {
    searchInputRef.current.focus();
  };

  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-8 py-4 border-b border-gray-200">
      {/* Logo and Categories */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center px-6">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </Link>
        
        {/* Categories Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100"
          >
            <span>Categories</span>
            <FaChevronDown className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category.toLowerCase()}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 flex-1 max-w-[600px] relative">
        <div className="relative w-full">
          <FaSearch 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700" 
            onClick={handleSearchIconClick}
          />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for anything"
            className="w-full pl-12 pr-4 py-2 border-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
          <button className="flex items-center gap-2 bg-transparent bg-none text-gray-800 px-5 py-2 border-gray-400 border-2 rounded-full hover:bg-gray-200">
            Sign In
          </button>
        </Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
