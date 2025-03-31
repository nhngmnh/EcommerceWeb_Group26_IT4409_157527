import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Star,
  Desktop,
  Memory,
  HardDrive,
  Monitor,
  Cpu,
  GraphicsCard,
  Target
} from '@phosphor-icons/react'

const CategoryItemComponent = ({
    id,
    imageUrl,
    title,
    rating,
    originalPrice,
    discountedPrice,
    discountPercentage,
    specifications
}) => {
  // Hàm để lấy icon phù hợp cho từng loại thông số
  const getSpecIcon = (spec) => {
    if (spec.includes('RTX') || spec.includes('GTX') || spec.includes('RX') || spec.includes('Radeon')) 
      return <GraphicsCard weight="light" size={16} />
    if (spec.includes('i5') || spec.includes('i7') || spec.includes('i3') || spec.includes('AMD') || spec.includes('Ryzen')) 
      return <Cpu weight="light" size={16} />
    if (spec.includes('GB') || spec.includes('TB')) {
      if (spec.includes('RAM') || spec.toLowerCase().includes('ddr')) 
        return <Memory weight="light" size={16} />
      return <HardDrive weight="light" size={16} />
    }
    if (spec.includes('inch')) 
      return <Monitor weight="regular" size={20} />
    if (spec.includes('Hz')) 
      return <Target weight="light" size={16} />
    return null
  }

  return (
    <Link to={`/product/${id}`} className="block bg-white rounded-lg p-4 hover:shadow-md hover:border-gray-400 transition-shadow border border-gray-200">
      {/* Hình ảnh sản phẩm */}
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-contain" />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{title}</h3>
        {/* Thông số kỹ thuật */}
        {specifications && specifications.length > 0 && (
          <div className="mt-3 p-2 bg-gray-100 rounded-lg grid grid-cols-2 gap-2">
            {specifications.map((spec, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600 gap-1.5">
                {getSpecIcon(spec)}
                <span>{spec}</span>
              </div>
            ))}
          </div>
        )}

        {/* Giá */}
        <div className="mt-3">
          {originalPrice && (
            <div className="text-sm text-gray-500 line-through">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice)}
            </div>
          )}
          {discountedPrice && (
            <div className="text-xl font-bold text-red-600">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discountedPrice)}
              {discountPercentage > 0 && (
                <span className="ml-2 text-sm font-normal bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                  -{discountPercentage}%
                </span>
              )}
            </div>
          )}
        </div>

        {/* Đánh giá */}
        <div className="mt-2 flex items-center">
          <Star weight="fill" className="text-yellow-400" size={16} />
          <span className="ml-1 text-sm text-gray-600">{rating || "0.0"}</span>
        </div>
      </div>
    </Link>
  )
}

export default CategoryItemComponent