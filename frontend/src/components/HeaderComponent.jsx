import React from "react";
import { Input, Button } from "antd";
import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-12 py-4 border-b">
      {/* Logo */}
      <Link to="/" className="flex items-center px-4">
        <img src="/logo.png" alt="Logo" className="h-10" />
      </Link>

      {/* Search Bar */}
      <div className="px-8 flex-1 max-w-[600px]">
        <Input.Search
          placeholder="Search for anything"
          enterButton
          className="w-full"
          size="large"
          style={{ 
            borderRadius: '24px',
            borderColor: '#4B5563',
            color: '#1F2937'
          }}
        />
      </div>

      {/* Icons and Sign In Button */}
      <div className="flex items-center gap-10 px-4">
        <div className="flex flex-col items-center cursor-pointer group py-2">
          <HeartOutlined className="text-2xl text-gray-800 group-hover:text-red-500 transition-colors" />
          <span className="text-xs text-gray-700 group-hover:text-red-500">Favorites</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer group py-2">
          <ShoppingCartOutlined className="text-2xl text-gray-800 group-hover:text-blue-500 transition-colors" />
          <span className="text-xs text-gray-700 group-hover:text-blue-500">Cart</span>
        </div>
        <Button
          type="default"
          icon={<UserOutlined />}
          size="large"
          className="bg-white text-gray-800 hover:bg-gray-50 border-gray-400 px-6"
        >
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default HeaderComponent;