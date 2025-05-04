import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaSearch, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { categories } from "../types/categories";
import LoginComponent from "./Auth/LoginComponent";
import RegisterComponent from "./Auth/RegisterComponent";
import ForgotPasswordComponent from "./Auth/ForgotPasswordComponent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderComponent = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setOpenRegister(!openRegister);
  };
  const handleForgotPasswordClick = () => {
    setOpenForgotPassword(!openForgotPassword);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handleSearchIconClick = () => {
    if (searchValue.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchIconClick();
    }
  }

  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-8 py-4 border-b border-gray-200 sticky top-0 z-50">
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
            <span>Danh mục</span>
            <FaChevronDown className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category}`}
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tìm kiếm sản phẩm"
            className="w-full pl-12 pr-4 py-2 border-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Icons and Sign In Button */}
      <div className="flex items-center gap-10 px-4">
        <div className="flex flex-col items-center cursor-pointer group py-2">
          <Link to="/favourites" className="flex flex-col items-center cursor-pointer group py-2">
            <FaHeart className="text-2xl text-gray-800 group-hover:text-red-500 transition-colors" />
            <span className="text-xs text-gray-700 group-hover:text-red-500">Yêu thích</span>
          </Link>
        </div>
        <div className="flex flex-col items-center cursor-pointer group py-2 relative">
          <Link to="/cart" className="flex flex-col items-center cursor-pointer group py-2 relative">
            <div className="relative">
              <FaShoppingCart className="text-2xl text-gray-800 group-hover:text-blue-500 transition-colors" />

              {/* Badge */}
              {totalQuantity > 0 && (
                <div className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4  flex items-center justify-center">
                  {totalQuantity}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-700 group-hover:text-blue-500">Giỏ hàng</span>
          </Link>
        </div>

        <button
          onClick={handleClick}
          className="flex items-center gap-2 bg-transparent bg-none text-gray-800 px-5 py-2 border-gray-400 border-2 rounded-full hover:bg-gray-200"
        >
          Đăng nhập
        </button>
      </div>
      {open && <LoginComponent handleClose={handleClick} handleRegisterClick={handleRegisterClick} handleForgotPasswordClick={handleForgotPasswordClick} />}
      {openRegister && <RegisterComponent handleClose={handleRegisterClick} handleLoginClick={handleClick} />}
      {openForgotPassword && <ForgotPasswordComponent handleClose={handleForgotPasswordClick} handleLoginClick={handleClick} />}
    </header>
  );
};

export default HeaderComponent;
