import React, { useState } from 'react'
import { FaShoppingCart, FaSearch, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import heroImage from '../../assets/images/thang_03_thu_cu_doi_moi_banner_web_slider_800x400.webp'
import ItemDisplayComponent from '../../components/ItemDisplayComponent'
import { sampleItems } from '../../types/item'

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sampleItems.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sampleItems.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 lg:px-16">
      {/* Hero Section */}
      <section className="container mx-auto px-8 py-12">
        <div className="flex items-stretch rounded-3xl overflow-hidden">
          <div className="w-[45%] p-12 relative bg-[#9747FF]/20">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">
              Best<br />birthday yet!
            </h1>
            <p className="text-xl text-gray-600 mb-8">Give gifts that say, "I get you."</p>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300 text-lg">
              Shop special
            </button>
          </div>
          <div className="w-[55%] pl-12 bg-[#9747FF]/20">
            {/* Hình ảnh sẽ được thêm vào đây */}
            <div className="aspect-[4/3] bg-gray-100 rounded-l-[280px] overflow-hidden">
            <img src={""} alt="Product" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-gray-800">Today's big deals</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 ${
                currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentPage === 0}
            >
              <FaChevronLeft className="text-gray-600 w-5 h-5" />
            </button>
            <button
              onClick={handleNextPage}
              className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ${
                currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentPage === totalPages - 1}
            >
              <FaChevronRight className="text-gray-600 w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-800 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {sampleItems.map((item) => (
              <div key={item.id} className="w-[20%] px-2 flex-shrink-0">
                <ItemDisplayComponent
                  imageUrl={item.imageUrl}
                  title={item.title}
                  rating={item.rating}
                  originalPrice={item.originalPrice}
                  discountedPrice={item.discountedPrice}
                  discountPercentage={item.discountPercentage}
                  saleText={item.saleText}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Danh mục sản phẩm</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Điện tử', 'Thời trang', 'Nhà cửa', 'Thể thao'].map((category) => (
            <div key={category} className="bg-gray-100 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-200 transition duration-300">
              <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage