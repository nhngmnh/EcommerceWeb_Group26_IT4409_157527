import { CaretDown, CaretUp, Funnel } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../types/allProducts';
import CategoryItemComponent from '../../components/CategoryItemComponent';
import { prices, colors } from '../../types/categories';

const CategoryPage = () => {
    const { category } = useParams();
    const [sortOption, setSortOption] = useState("Liên quan nhất");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [openFilter, setOpenFilter] = useState(null);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const allProducts = products;

    const categoryMap = {
        "Laptop": ["laptop"],
        "Desktop PC": ["desktop"],
        "Bàn phím": ["keyboard"],
        "Chuột": ["mouse"],
        "Màn hình": ["monitor"],
        "Tai nghe": ["headphone", "earphone"],
        "Loa": ["speaker"],
        "Phụ kiện": ["accessory"]
    };

    useEffect(() => {
        // Filter products by category
        let filtered = allProducts.filter(p => categoryMap[category]?.some(c => c === p.category));

        // Filter by selected colors
        if (selectedColors.length > 0) {
            filtered = filtered.filter(p => selectedColors.includes(p.color));
        }

        // Filter by selected price ranges
        if (selectedPrices.length > 0) {
            filtered = filtered.filter(p => {
                if (selectedPrices.includes('Dưới 5 triệu') && p.discountedPrice < 5000000) return true;
                if (selectedPrices.includes('5 triệu - 20 triệu') && p.discountedPrice >= 5000000 && p.discountedPrice <= 20000000) return true;
                if (selectedPrices.includes('Trên 20 triệu') && p.discountedPrice > 20000000) return true;
                return false;
            });
        }

        // Sorting products based on the selected option
        if (sortOption === "Giá tăng dần") {
            filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        } else if (sortOption === "Giá giảm dần") {
            filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        } else if (sortOption === "Mới nhất") {
            filtered.sort((a, b) => b.id - a.id);
        }

        setFilteredProducts(filtered);
    }, [category, selectedColors, selectedPrices, sortOption, allProducts]);

    const handleCheckboxChange = (value, selected, setSelected) => {
        if (selected.includes(value)) {
            setSelected(selected.filter(item => item !== value));
        } else {
            setSelected([...selected, value]);
        }
    };

    return (
        <div className="p-6 text-gray-800">
            <h1 className="text-3xl font-bold mb-4 p-2 capitalize">
                Danh mục: <span className="text-blue-500 font-semibold">{category}</span>
            </h1>

            <div className="flex flex-wrap justify-between items-center mb-6 relative">
                <div className="flex flex-wrap gap-2">
                    {[{ label: "Bộ lọc", options: [] }, { label: "Giá", options: prices }, { label: "Màu sắc", options: colors }].map((filter, index) => {
                        const selectedArray = filter.label === 'Giá' ? selectedPrices : selectedColors;
                        const setSelectedArray = filter.label === 'Giá' ? setSelectedPrices : setSelectedColors;

                        return (
                            <div className="relative" key={index}>
                                <button
                                    onClick={() => {
                                        if (filter.label === "Bộ lọc") {
                                            setIsSidebarOpen(!isSidebarOpen);
                                        } else {
                                            setOpenFilter(openFilter === filter.label ? null : filter.label);
                                        }
                                    }}
                                    className={`px-4 py-2 rounded-full border ${filter.label === "Bộ lọc"
                                        ? "border-gray-800 text-gray-800 font-semibold"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        {index === 0 && <Funnel className="text-lg" />}
                                        {filter.label}
                                        {index !== 0 && (
                                            openFilter === filter.label ? <CaretUp className="text-sm text-gray-600" /> : <CaretDown className="text-sm text-gray-600" />
                                        )}
                                    </span>
                                </button>

                                {openFilter === filter.label && filter.options.length > 0 && (
                                    <div className="absolute z-10 mt-2 w-52 rounded-lg border border-gray-200 bg-white shadow-lg p-4 animate-fade-in">
                                        {filter.options.map((option, idx) => (
                                            <label key={idx} className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md transition">
                                                <input
                                                    type="checkbox"
                                                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-white"
                                                    checked={selectedArray.includes(option)}
                                                    onChange={() => handleCheckboxChange(option, selectedArray, setSelectedArray)}
                                                />
                                                <span className="text-sm text-gray-700">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span className="text-sm text-gray-600">{filteredProducts.length.toLocaleString()} mặt hàng</span>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border rounded px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        <option>Liên quan nhất</option>
                        <option>Giá tăng dần</option>
                        <option>Giá giảm dần</option>
                        <option>Mới nhất</option>
                    </select>
                </div>
            </div>

            <div className="flex">
                {isSidebarOpen && (
                    <div className="w-64 h-full bg-white shadow-lg p-4 hidden md:block">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Bộ lọc</h2>
                            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-red-500 text-xl md:hidden">
                                ×
                            </button>
                        </div>

                        {[{ label: "Giá", options: prices }, { label: "Màu sắc", options: colors }].map((filter, index) => {
                            const selectedArray = filter.label === "Giá" ? selectedPrices : selectedColors;
                            const setSelectedArray = filter.label === "Giá" ? setSelectedPrices : setSelectedColors;

                            return (
                                <div key={index} className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">{filter.label}</h3>
                                    <div className="space-y-2">
                                        {filter.options.map((option, idx) => (
                                            <label key={idx} className="flex items-center space-x-3 px-2 py-1 rounded-md hover:bg-gray-50 transition">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    checked={selectedArray.includes(option)}
                                                    onChange={() => handleCheckboxChange(option, selectedArray, setSelectedArray)}
                                                />
                                                <span className="text-sm text-gray-800">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="flex-1 p-4">
                    <div className="grid md:grid-cols-4 gap-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item) => (
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
                            <p className="text-gray-600">Không tìm thấy sản phẩm nào trong danh mục này.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
