import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const ProductsList = () => {
  const navigate = useNavigate();
  const { token, getProducts, products, setProducts } = useContext(AdminContext);

  const handleNavigate = (item) => {
    navigate('/update-product', {
      state: {
        productId: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image, // vì image là array
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (token) {
          await getProducts();
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Products</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {products.map((item, index) => (
          <div
            onClick={() => handleNavigate(item)}
            className='border border-indigo-200 rounded-xl max-w-52 overflow-hidden cursor-pointer group'
            key={index}
          >
            <img
              className='bg-indigo-50 group-hover:bg-primary transition-all duration-500 h-64 object-cover'
              src={item.image?.[0] || 'https://via.placeholder.com/150'}
              alt={item.name}
            />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm line-clamp-2'>{item.description}</p>
              <p className='text-indigo-600 text-sm font-semibold mt-2'>${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
