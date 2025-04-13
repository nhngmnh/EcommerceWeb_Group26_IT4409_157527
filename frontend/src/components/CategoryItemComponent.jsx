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
  Target,
  Usb,
  Keyboard,
  DownloadSimple,
  Lightbulb,
  BatteryCharging
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

  const getSpecIcon = (key, spec) => {
    const lowerKey = key.toLowerCase();
  
    switch (lowerKey) {
      case 'cpu':
        return <Cpu weight="light" size={16} />;
      case 'gpu':
        return <GraphicsCard weight="light" size={16} />;
      case 'ram':
        return <Memory weight="light" size={16} />;
      case 'storage':
        return <HardDrive weight="light" size={16} />;
      case 'screen':
        return <Monitor weight="regular" size={20} />;
      case 'refreshrate':
      case 'refreshRate': // support camelCase and lowercase
        return <Target weight="light" size={16} />;
      case 'connection':
        return <Usb weight="light" size={16} />;
      case 'switch':
        return <DownloadSimple weight="light" size={16} />; // replace with a keyboard icon if available
      case 'size':
        return <Keyboard weight="light" size={16} />; // optional: replace with Ruler or Layout icon
      case 'led':
        return <Lightbulb weight="light" size={16} />; // replace with a keyboard icon if available
      case 'battery':
        return <BatteryCharging weight="light" size={16} />; // replace with a battery icon if available
      default:
        return null;
    }
  };
   
  return (
    <Link to={`/product/${id}`} className="block bg-white rounded-lg p-4 hover:shadow-md hover:border-gray-400 transition-shadow border border-gray-200">
      {/* Hình ảnh sản phẩm */}
      <div className="relative aspect-square">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-900 line-clamp-2 h-[3rem] leading-[1.5rem]">{title}</h3>

        {/* Thông số kỹ thuật */}
        {specifications && Object.keys(specifications).length > 0 && (
          <div className="mt-3 p-2 bg-gray-100 rounded-lg grid grid-cols-3 gap-2">
            {Object.entries(specifications).map(([key, value], index) => (
              <div key={index} className="flex items-center text-sm text-gray-600 gap-1.5">
                {getSpecIcon(key, value)}
                <span>{value}</span>
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