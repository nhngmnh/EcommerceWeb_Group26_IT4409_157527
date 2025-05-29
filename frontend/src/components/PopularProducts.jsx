import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PopularProducts = () => {
  const navigate = useNavigate();
  const { backendurl, search } = useContext(AppContext);
  const [appleProducts, setAppleProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchAppleProducts = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/product/get-products`, {
          params: { query: search }
        });
        let products = res.data.products;

        const filtered = products.filter(p => p.brand === 'Apple');
        setAppleProducts(filtered);
      } catch (error) {
        console.error("Error fetching Apple products:", error);
      }
    };

    fetchAppleProducts();
  }, [backendurl, search]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-8 py-8 px-4 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Apple Products</h2>

      {appleProducts.length > 0 && (
        <>
          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white border rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white border rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-2 hide-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {appleProducts.length === 0 ? (
          <p className='text-gray-500 mt-10'>No Apple products found.</p>
        ) : (
          appleProducts.map(item => (
            <div
              key={item._id}
              onClick={() => navigate(`/detail/${item._id}`, { replace: true })}
              className='min-w-[250px] max-w-[250px] border border-gray-300 p-4 rounded hover:shadow cursor-pointer flex-shrink-0'
            >
              <img src={item.image_url} alt={item.name} className='w-full h-40 object-contain mb-2' />
              <p className='font-semibold'>{item.name}</p>
              <p>{item.available
                ? <span className='text-sm text-green-400'>Available</span>
                : <span className='text-gray-400 text-sm'>Not available</span>}
              </p>
              <p className='text-sm text-gray-600'>{item.brand}</p>
              <p className='text-red-600 font-bold mt-4'>{item.price} ₫
                {item.bestseller && <span className='text-purple-600 text-xs'> - best seller</span>}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularProducts;
