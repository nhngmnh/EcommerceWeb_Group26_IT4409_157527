import React from 'react'
import { useNavigate } from 'react-router-dom'
import { branch } from '../assets/assets'

const FamousBranch = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Hàm điều hướng với state là brand
  const handleNavigate = (brand) => {
    localStorage.setItem('brand', brand);
    navigate('/products');
  };

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-black' id='type'>
      <h1 className='text-bold text-3xl font-medium'>Find your device with famous brands</h1>
      <p className='sm:w-1/3 text-center text-sm'>Help you feel secure in choosing products from the most reputable brands</p>

      <div className='max-w-6xl mx-auto w-full'>
  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pt-5 place-content-center'>
    {
      branch.map((item, index) => (
        <div
          key={index}
          className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-500 w-28 sm:w-36'
          onClick={() => {
            handleNavigate(item.name);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center bg-white rounded mb-2 mt-5 overflow-hidden">
            <img
              className='object-contain w-full h-full'
              src={item.image}
              alt={item.name}
            />
          </div>
          <p className='text-center min-h-5'>{item.name}</p>
        </div>
      ))
    }
  </div>
</div>
    </div>
  )
}

export default FamousBranch
