import { Funnel } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../../types/allProducts';
import CategoryItemComponent from '../../components/CategoryItemComponent';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [sortOption, setSortOption] = useState("Most relevant");

    const allProducts = products;

    // Filter by title
    let filtered = allProducts.filter(p =>
        p.title?.toLowerCase().includes(query.toLowerCase())
    );

    // Sort filtered based on selected sortOption
    if (sortOption === "Lowest price") {
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortOption === "Highest price") {
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (sortOption === "Newest") {
        filtered.sort((a, b) => b.id - a.id); // assuming higher ID means newer
    }

    return (
        <div className="p-6 text-gray-800">
            <h1 className="text-3xl font-bold mb-4 p-2">
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
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border rounded px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        <option>Most relevant</option>
                        <option>Lowest price</option>
                        <option>Highest price</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 md:ml-4 md:mr-4">
                {filtered.length > 0 ? (
                    filtered.map((item) => (
                        <CategoryItemComponent
                            key={item.id}
                            id={item.id}
                            imageUrl={item.imageUrl}
                            title={item.title}
                            rating={item.rating}
                            originalPrice={item.originalPrice}
                            discountedPrice={item.discountedPrice}
                            discountPercentage={item.discountPercentage}
                            specifications={item.specifications}
                        />
                    ))
                ) : (
                    <p className="text-gray-600">Không tìm thấy sản phẩm nào phù hợp.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
