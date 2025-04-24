import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
import ProductDisplay from "../../components/ProductDisplay";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulate fetching product data with faker (could be replaced with API call)
    const fakeProduct = {
      name: "Laptop gaming HP VICTUS 16-r0376TX AY8Z2PA"   ,
      discountedPrice: "20.000.000", // 20-40 mil VND
      originalPrice: "25.000.000",
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }).toFixed(1),
      images: Array.from({ length: 5 }).map(() =>
        faker.image.urlPicsumPhotos({ width: 160, height: 160 })
      ),
      promo: `Ưu đãi ${faker.finance.amount(100000, 1000000, 0)}đ khi nâng cấp RAM.`,
      description: `ASUS TUF Gaming F15 là mẫu laptop gaming mạnh mẽ, được thiết kế dành riêng cho các game thủ và người dùng chuyên nghiệp.

Sở hữu vi xử lý Intel Core i7 thế hệ thứ 12 cùng card đồ họa NVIDIA GeForce RTX 3050Ti, máy có khả năng xử lý mọi tác vụ nặng như chơi game, đồ họa, và edit video một cách mượt mà.

Thiết kế bền bỉ đạt chuẩn quân đội MIL-STD 810H, bàn phím RGB nổi bật, cùng hệ thống tản nhiệt hiệu quả giúp đảm bảo hiệu suất ổn định trong thời gian dài.`,

      specs: {
        "CPU": "Intel Core i7-13700H",
        "RAM": "16GB DDR5",
        "SSD": "1TB NVMe",
        "GPU": "NVIDIA RTX 4060",
        "Display": "15.6-inch 165Hz QHD",
        "Weight": "2.3kg",
        "OS": "Windows 11 Home",
        "Battery": "76Wh, 4-cell Li-ion"
      }
    };

    console.log("Generated product: ", fakeProduct);  // Log the generated product for debugging

    setProduct(fakeProduct);  // Set product state
  }, [id]);  // Dependency on `id` ensures this runs when the id changes

  if (!product) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4 mt-2 ml-6 font-semibold text-gray-800">Chi tiết sản phẩm</h2>
      <ProductDisplay product={product} />
    </div>
  );
};

export default ProductDetailPage;
