import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ItemDisplayComponent from '../../components/ItemDisplayComponent'
import CategoryItemComponent from '../../components/CategoryItemComponent'
import { sampleItems, laptopItems, keyboardItems } from '../../types/item'
import laptopImage from '../../assets/images/shopping.jpg'
import pcImage from '../../assets/images/pc.jpg'
import keyboardImage from '../../assets/images/keyboard.webp'
import headphoneImage from '../../assets/images/earphone.jpg'
import mouseImage from '../../assets/images/mouse.jpeg'
import accessoriesImage from '../../assets/images/accessories.webp'
import HeroComponent from '../../components/HeroComponent'


const HomePage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLaptopPage, setCurrentLaptopPage] = useState(0);
  const [currentKeyboardPage, setCurrentKeyboardPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sampleItems.length / itemsPerPage);
  const totalLaptopPages = Math.ceil(laptopItems.length / itemsPerPage);
  const totalKeyboardPages = Math.ceil(keyboardItems.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const handlePrevLaptopPage = () => {
    setCurrentLaptopPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextLaptopPage = () => {
    setCurrentLaptopPage((prev) => (prev < totalLaptopPages - 1 ? prev + 1 : prev));
  };

  const handlePrevKeyboardPage = () => {
    setCurrentKeyboardPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextKeyboardPage = () => {
    setCurrentKeyboardPage((prev) => (prev < totalKeyboardPages - 1 ? prev + 1 : prev));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sampleItems.slice(startIndex, endIndex);

  const startLaptopIndex = currentLaptopPage * itemsPerPage;
  const endLaptopIndex = startLaptopIndex + itemsPerPage;
  const currentLaptopItems = laptopItems.slice(startLaptopIndex, endLaptopIndex);

  const startKeyboardIndex = currentKeyboardPage * itemsPerPage;
  const endKeyboardIndex = startKeyboardIndex + itemsPerPage;
  const currentKeyboardItems = keyboardItems.slice(startKeyboardIndex, endKeyboardIndex);

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 lg:px-16">
      {/* Hero Section */}
      <section className="container mx-auto px-8 py-12">
        <HeroComponent />
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-gray-800">Deal hot nhất</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={currentPage === 0}
            >
              <FaChevronLeft className="text-gray-600 w-5 h-5" />
            </button>
            <button
              onClick={handleNextPage}
              className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''
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

      {/* Featured Products */}
      <section className="container mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Danh mục phổ biến</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Laptop Category */}
          <div onClick={() => navigate('/category/laptop')} className="group cursor-pointer">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300">
              <img
                src={laptopImage}
                alt="Laptop Gaming"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800">Laptop </h3>
          </div>

          {/* PC Category */}
          <div onClick={() => navigate('/category/pc')} className="group cursor-pointer">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300">
              <img
                src={pcImage}
                alt="PC Gaming"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800">PC </h3>
          </div>

          {/* Keyboard Category */}
          <div onClick={() => navigate('/category/keyboard')} className="group cursor-pointer">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300">
              <img
                src={keyboardImage}
                alt="Bàn phím"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800">Bàn phím</h3>
          </div>

          {/* Headphone Category */}
          <div onClick={() => navigate('/category/headphone')} className="group cursor-pointer">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300">
              <img
                src={headphoneImage}
                alt="Tai nghe"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800">Tai nghe</h3>
          </div>

          {/* Mouse Category */}
          <div onClick={() => navigate('/category/mouse')} className="group cursor-pointer">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300">
              <img
                src={mouseImage}
                alt="Chuột"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800">Chuột</h3>
          </div>

          {/* Accessories Category */}
          <div onClick={() => navigate('/category/accessories')} className="group cursor-pointer">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300">
              <img
                src={accessoriesImage}
                alt="Phụ kiện"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800">Phụ kiện</h3>
          </div>
        </div>
      </section>

      {/* Laptop Products Section */}
      <section className="container mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-800">Laptop Gaming bán chạy</h2>

          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/category/laptop')}
              className="text-blue-600 hover:text-blue-800 font-medium text-lg px-4 py-2 rounded-full hover:bg-blue-50 transition-all duration-300"
            >
              Xem tất cả
            </button>
            <button
              onClick={handlePrevLaptopPage}
              className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 ${currentLaptopPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={currentLaptopPage === 0}
            >
              <FaChevronLeft className="text-gray-600 w-5 h-5" />
            </button>
            <button
              onClick={handleNextLaptopPage}
              className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ${currentLaptopPage === totalLaptopPages - 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={currentLaptopPage === totalLaptopPages - 1}
            >
              <FaChevronRight className="text-gray-600 w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-800 ease-in-out"
            style={{ transform: `translateX(-${currentLaptopPage * 100}%)` }}
          >
            {laptopItems.map((item) => (
              <div key={item.id} className="w-[20%] px-2 flex-shrink-0">
                <CategoryItemComponent
                  id={item.id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  rating={item.rating}
                  originalPrice={item.originalPrice}
                  discountedPrice={item.discountedPrice}
                  discountPercentage={item.discountPercentage}
                  specifications={[
                    `${item.specifications.cpu}`,
                    `${item.specifications.gpu}`,
                    `${item.specifications.ram}`,
                    `${item.specifications.storage}`,
                    `${item.specifications.screen}`,
                    `${item.specifications.refreshRate}`
                  ]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keyboard Products Section */}
      <section className="container mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-800">Bàn phím bán chạy</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/category/keyboard')}
              className="text-blue-600 hover:text-blue-800 font-medium text-lg px-4 py-2 rounded-full hover:bg-blue-50 transition-all duration-300"
            >
              Xem tất cả
            </button>
            <button
              onClick={handlePrevKeyboardPage}
              className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 ${currentKeyboardPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={currentKeyboardPage === 0}
            >
              <FaChevronLeft className="text-gray-600 w-5 h-5" />
            </button>
            <button
              onClick={handleNextKeyboardPage}
              className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ${currentKeyboardPage === totalKeyboardPages - 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={currentKeyboardPage === totalKeyboardPages - 1}
            >
              <FaChevronRight className="text-gray-600 w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-800 ease-in-out"
            style={{ transform: `translateX(-${currentKeyboardPage * 100}%)` }}
          >
            {keyboardItems.map((item) => (
              <div key={item.id} className="w-[20%] px-2 flex-shrink-0">
                <CategoryItemComponent
                  id={item.id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  rating={item.rating}
                  originalPrice={item.originalPrice}
                  discountedPrice={item.discountedPrice}
                  discountPercentage={item.discountPercentage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Deals Section */}

      {/* Categories */}
      {/* <section className="container mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Danh mục sản phẩm</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Điện tử', 'Thời trang', 'Nhà cửa', 'Thể thao'].map((category) => (
            <div key={category} className="bg-gray-100 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-200 transition duration-300">
              <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  )
}

export default HomePage