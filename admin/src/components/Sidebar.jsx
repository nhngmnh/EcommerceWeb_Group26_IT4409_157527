import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { token } = useContext(AdminContext);

  const menuItems = [
    { path: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { path: '/all-appointments', icon: assets.appointment_icon, label: "Customer's Cart" },
    { path: '/add-product', icon: assets.add_icon, label: 'Add Products' },
    { path: '/list-product', icon: assets.people_icon, label: 'List Products' },
    { path: '/comments-list', icon: assets.people_icon, label: 'List Comments' }, // Fix đường dẫn bị trùng
  ];

  return (
    <div className='min-h-screen bg-gray-200 border-r'>
      {token && (
        <ul className='text-gray-700 mt-5'>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? 'bg-white border-r-4 border-primary' : ''
                }`
              }
              to={item.path}
            >
              <img src={item.icon} alt="" />
              <p className='hidden md:block'>{item.label}</p>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
