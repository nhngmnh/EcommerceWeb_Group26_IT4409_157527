import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const ProductsList = () => {
  const navigate = useNavigate();
  const {
    aToken,
    changeAvailability,
    getProducts,
    products,
    setProducts,
    changeBestsellerStatus,
    filterProducts,
    setFilterProducts,
    search,
    deleteProduct
  } = useContext(AdminContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleNavigate = (item) => {
    navigate('/update-product', {
      state: {
        productId: item._id,
        specifications: item.specifications,
        name: item.name,
        category: item.category,
        brand: item.brand,
        description: item.description,
        image_url: item.image_url,
        price: item.price,
        stock_quantity: item.stock_quantity,
      },
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (aToken) {
          await getProducts();
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [aToken]);

  useEffect(() => {
    if (!search) {
      setFilterProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product?.name.toLowerCase().includes(search.toLowerCase()) ||
        product?.category.toLowerCase().includes(search.toLowerCase()) ||
        product?.brand.toLowerCase().includes(search.toLowerCase()) ||
        product?.description.toLowerCase().includes(search.toLowerCase())
      );
      setFilterProducts(filtered);
    }
  }, [search, products, setFilterProducts]);

  const handleDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct._id);
      setProducts((prev) => prev.filter((p) => p._id !== selectedProduct._id));
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Products</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {filterProducts.map((item, index) => (
          <div className="border border-indigo-200 rounded-xl max-w-52 overflow-hidden group" key={index}>
            <img
              onClick={() => handleNavigate(item)}
              className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 h-64 object-cover cursor-pointer"
              src={item.image_url}
              alt=""
            />
            <div className="p-4">
              <p className="text-gray-600 font-bold text-lg">{item.name}</p>
              <p className="text-zinc-600 text-sm">{item.category}</p>

              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  onChange={() => {
                    changeAvailability(item._id);
                    setProducts((prevProducts) =>
                      prevProducts.map((p) =>
                        p._id === item._id ? { ...p, available: !p.available } : p
                      )
                    );
                  }}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>

              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  onChange={() => {
                    changeBestsellerStatus(item._id);
                    setProducts((prevProducts) =>
                      prevProducts.map((p) =>
                        p._id === item._id ? { ...p, bestseller: !p.bestseller } : p
                      )
                    );
                  }}
                  type="checkbox"
                  checked={item.bestseller}
                />
                <p>Bestseller</p>
              </div>

              <button
                onClick={() => {
                  setSelectedProduct(item);
                  setShowModal(true);
                }}
                className="mt-2 text-red-500 text-sm hover:underline"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[300px]">
            <p className="text-center text-gray-700 mb-4">
              Bạn muốn xóa sản phẩm <strong>{selectedProduct.name}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
