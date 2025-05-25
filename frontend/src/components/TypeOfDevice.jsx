import React from 'react'
import { typeOfProductData } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const TypeOfDevice = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Hàm để điều hướng với state
  const handleNavigate = (category) => {
    localStorage.setItem('category', category)
    navigate('/products'); // Truyền type vào state
  }

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-black' id='type'>
      <h1 className='text-bold text-3xl font-medium'>Type of products</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply select your product type through our product filters</p>
      <div className='flex sm:justify-center gap-10 pt-5 w-full overflow-scroll'>
        {
          typeOfProductData.map((item, index) => (
            <div
              className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-500 w-24 h-36'
              key={index}
              onClick={() => {
                handleNavigate(item.type);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center bg-white rounded mb-2 mt-5 overflow-hidden">
                <img className='object-contain w-full h-full' src={item.image} alt='' />
              </div>
              <p className='text-center min-h-5'>{item.type}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TypeOfDevice;
