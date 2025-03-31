import React from 'react'

const HeroComponent = () => {
    return (
        <div className="flex gap-6">
            {/* Banner 1 */}
            <div className="w-[60%] rounded-3xl overflow-hidden cursor-pointer hover:shadow-lg transition duration-300" onClick={() => navigate('/birthday-gifts')}>
                <div className="flex h-[400px]">
                    <div className="w-[50%] p-12 relative bg-[#9747FF]/20">
                        <h1 className="text-5xl font-bold text-gray-800 mb-4">
                            Best<br />birthday yet!
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">Give gifts that say, "I get you."</p>
                        <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300" onClick={() => navigate('/birthday-gifts')}>
                            Shop special
                        </button>
                    </div>
                    <div className="w-[50%] relative bg-[#9747FF]/20">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="w-full h-full bg-gray-100 rounded-l-[200px]">
                                <img src={""} alt="Product" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner 2 */}
            <div className="w-[40%] rounded-3xl overflow-hidden cursor-pointer hover:shadow-lg transition duration-300" onClick={() => navigate('/small-shops')}>
                <div className="relative h-[400px]">
                    <img src={""} alt="Small Shops" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" /> {/* Overlay for better text visibility */}
                    <div className="absolute bottom-8 left-8 right-8">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Great deals from<br />small shops
                        </h2>
                        <button className="bg-white text-gray-900 px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300" onClick={() => navigate('/small-shops')}>
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroComponent;