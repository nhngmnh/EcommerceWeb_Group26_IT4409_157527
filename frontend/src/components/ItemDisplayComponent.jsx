// import React from 'react';
// import { FaStar } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// const ItemDisplayComponent = ({
//   imageUrl,
//   title,
//   rating,
//   originalPrice,
//   discountedPrice,
//   discountPercentage,
//   saleText,
//   productId
// }) => {
//   return (
//     <Link to={`/product/${productId}`} className="block"> {/* Wrap the component with Link */}
//       <div className="bg-white transition-all duration-300 py-2 px-1">
//         <div className="bg-white rounded-lg overflow-hidden hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer border border-gray-200 hover:border-gray-400">
//           {/* Ảnh sản phẩm */}
//           <div className="relative aspect-square">
//             <img
//               src={imageUrl}
//               alt={title}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Thông tin sản phẩm */}
//           <div className="p-4">
//             {/* Tiêu đề */}
//             <h3 className="text-sm text-gray-800 font-medium mb-2 line-clamp-1">
//               {title}
//             </h3>

//             {/* Đánh giá */}
//             <div className="flex items-center gap-1 mb-2">
//               <span className="text-yellow-400 font-semibold">{rating}</span>
//               <FaStar className="text-yellow-400" />
//             </div>

//             {/* Giá */}
//             <div className="flex items-center gap-2">
//               <span className="text-lg font-bold text-gray-900">
//                 {discountedPrice.toLocaleString()}đ
//               </span>
//               <span className="text-sm text-gray-500 line-through">
//                 {originalPrice.toLocaleString()}đ
//               </span>
//               {discountPercentage && (
//                 <span className="text-sm font-medium text-green-600">
//                   {discountPercentage}% off
//                 </span>
//               )}
//             </div>

//             {/* Sale text */}
//             {saleText && (
//               <div className="mt-2">
//                 <span className="text-sm text-gray-600">{saleText}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ItemDisplayComponent;