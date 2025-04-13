import { Funnel } from '@phosphor-icons/react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../../types/allProducts';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    // Example product data (replace with your real data)
    const allProducts = products;
    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="p-6 text-gray-800">
            <h1 className="text-3xl font-bold mb-4">
                Kết quả tìm kiếm cho:{' '}
                <span className="text-red-500 font-semibold">{query}</span>
            </h1>
            <div className="flex flex-wrap justify-between items-center mb-6">
                {/* Filter Tags */}
                <div className="flex flex-wrap gap-2">
                    {["All Filters", "Physical items", "Star Seller", "Etsy’s Picks", "On sale", "Vintage", "Accepts Etsy gift cards"].map((label, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-full border ${index === 0
                                ? "border-gray-800 text-gray-800 font-semibold"
                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                {index === 0 && <Funnel className="text-lg" />}
                                {label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Right Side: Count and Sort */}
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span className="text-sm text-gray-600">{filtered.length.toLocaleString()} items found</span>
                    <select className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <option>Most relevant</option>
                        <option>Lowest price</option>
                        <option>Highest price</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {filtered.length > 0 ? (
                    filtered.map(product => (
                        <div key={product.id} className="border p-4 rounded-lg shadow bg-white">
                            <img
                                src={product.images?.[0]}
                                alt={product.name}
                                className="h-40 object-cover w-full mb-2 rounded-md"
                            />
                            <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                            <p className="text-red-500 font-bold">{product.price.toLocaleString()}đ</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">Không tìm thấy sản phẩm nào phù hợp.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
