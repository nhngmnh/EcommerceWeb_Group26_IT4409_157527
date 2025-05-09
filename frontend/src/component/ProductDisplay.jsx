import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const ProductDisplay = ({ product }) => {
    const {
        name = 'Sản phẩm',
        images = [],
        rating = 0,
        discountedPrice = 0,
        originalPrice = null,
        promo = '',
        specs = {},
    } = product || {};
    const addToCartProduct = {
        id: product.id,
        name: product.name,
        discountedPrice: product.discountedPrice,
        originalPrice: product.originalPrice,
        images: product.images,
    }
    const dispatch = useDispatch();
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
    const handleAddToCart = () => {
        dispatch(addToCart(addToCartProduct));
        toast.success('Sản phẩm đã được thêm vào giỏ hàng!', {
            position: 'top-right',
            autoClose: 2000,
        });
    };

    return (
        <div className='p-6 bg-white'>
            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.6fr] gap-6 max-w-7xl w-full mx-auto px-2">
                {/* Images Section */}
                <div className="flex flex-col gap-4 md:pr-4">
                    <div className="relative w-full">
                        {images.length > 0 && (
                            <img
                                src={images[currentIndex]}
                                alt={`${name} - Image ${currentIndex + 1}`}
                                className="rounded-xl w-full object-contain max-h-[400px] p-2"
                            />
                        )}

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
                                >
                                    <FaChevronLeft className="text-gray-600 w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
                                >
                                    <FaChevronRight className="text-gray-600 w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnails */}
                    <div className="flex justify-center space-x-2 mt-2">
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Thumbnail ${i}`}
                                onClick={() => handleThumbnailClick(i)}
                                className={`w-20 h-20 object-cover border rounded-lg cursor-pointer ${i === currentIndex ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                {/* Product Info */}
                <div className='ml-6'>
                    <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
                    <div className="flex items-center mt-3 mb-5">
                        <span className="text-yellow-500 text-3xl">★</span>
                        <span className="ml-2 text-lg text-gray-600">({rating})</span>
                    </div>

                    <div className="text-4xl text-red-600 font-bold">
                        {discountedPrice.toLocaleString()}đ
                    </div> {/* Larger price */}
                    {originalPrice && (
                        <div className="text-gray-400 line-through text-xl">
                            {originalPrice.toLocaleString()}đ {/* Larger old price */}
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        disabled={!product}
                        className="mt-6 bg-red-600 text-white px-8 py-4 font-bold rounded-md hover:bg-red-700 transition">
                        MUA NGAY
                    </button> {/* Larger button text */}

                    <ul className="mt-8 space-y-2 text-lg text-gray-700">
                        <li>✓ Bảo hành chính hãng 12 tháng.</li>
                        <li>✓ Hỗ trợ đổi mới trong 7 ngày.</li>
                        <li>✓ Miễn phí giao hàng toàn quốc.</li>
                    </ul> {/* Larger list text */}

                    {promo && (
                        <div className="mt-8 bg-gray-100 p-4 rounded-md w-full max-w-xl">

                            <p className="text-green-600 font-medium text-xl">
                                ✓ {promo}
                            </p> {/* Larger promo text */}
                        </div>
                    )}
                </div>

            </div>
            <div className="mt-12">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-[80%]">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Thông tin sản phẩm</h2>
                    {
                        product?.specs && (
                            <div className="mt-10">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thông số kỹ thuật</h2>
                                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                                    <table className="w-full text-left table-auto min-w-[500px] text-sm md:text-base">
                                        <tbody>
                                            {Object.entries(product.specs).map(([key, value]) => (
                                                <tr key={key} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="p-3 font-medium text-gray-700 w-1/4 border-r border-gray-200">{key}</td>
                                                    <td className="p-3 text-gray-600">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                    {product.description && (
                        <div className="mt-10">
                            <p className="mb-6 text-gray-700 text-lg">{product.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default ProductDisplay;
