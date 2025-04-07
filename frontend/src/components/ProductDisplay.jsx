import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductDisplay = ({ product }) => {
    const {
        name = 'Sản phẩm',
        images = [],
        rating = 0,
        price = 0,
        oldPrice = null,
        promo = '',
    } = product || {};

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 p-6 bg-white">
            {/* Images Section */}
            <div className="space-y-4 relative">
                {images.length > 0 && (
                    <img
                        src={images[currentIndex]}
                        alt={`${name} - Image ${currentIndex + 1}`}
                        className="rounded-xl w-full object-contain"
                    />
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-100"
                        >
                            <FaChevronLeft className="text-gray-600 w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-100"
                        >
                            <FaChevronRight className="text-gray-600 w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Thumbnails */}
                <div className="flex space-x-2 mt-2">
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`Thumbnail ${i}`}
                            onClick={() => handleThumbnailClick(i)}
                            className={`w-20 h-20 object-cover border rounded-lg cursor-pointer ${
                                i === currentIndex ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div>
                <h1 className="text-3xl font-semibold text-gray-800">{name}</h1> {/* Increased font size */}
                <div className="flex items-center mt-3 mb-5">
                    <span className="text-yellow-500 text-3xl">★</span> {/* Larger rating star */}
                    <span className="ml-2 text-lg text-gray-600">({rating})</span> {/* Larger rating number */}
                </div>

                <div className="text-4xl text-red-600 font-bold">
                    {price.toLocaleString()}đ
                </div> {/* Larger price */}
                {oldPrice && (
                    <div className="text-gray-400 line-through text-xl">
                        {oldPrice.toLocaleString()}đ {/* Larger old price */}
                    </div>
                )}

                <button className="mt-6 bg-red-600 text-white px-8 py-4 font-bold rounded-md hover:bg-red-700 transition">
                    MUA NGAY
                </button> {/* Larger button text */}

                <ul className="mt-8 space-y-2 text-lg text-gray-700">
                    <li>✓ Bảo hành chính hãng 12 tháng.</li>
                    <li>✓ Hỗ trợ đổi mới trong 7 ngày.</li>
                    <li>✓ Miễn phí giao hàng toàn quốc.</li>
                </ul> {/* Larger list text */}

                {promo && (
                    <div className="mt-8 bg-gray-100 p-4 rounded-md">
                        <p className="text-green-600 font-medium text-xl">
                            ✓ {promo}
                        </p> {/* Larger promo text */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDisplay;
