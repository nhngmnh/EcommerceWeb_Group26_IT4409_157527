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
      name: faker.commerce.productName(),
      price: "20.000.000", // 20-40 mil VND
      oldPrice: "25.000.000",
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }).toFixed(1),
      images: Array.from({ length: 5 }).map(() =>
        faker.image.urlPicsumPhotos({ width: 160, height: 160 })
      ),
      promo: `Ưu đãi ${faker.finance.amount(100000, 1000000, 0)}đ khi nâng cấp RAM.`,
    };

    console.log("Generated product: ", fakeProduct);  // Log the generated product for debugging

    setProduct(fakeProduct);  // Set product state
  }, [id]);  // Dependency on `id` ensures this runs when the id changes

  if (!product) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4 mt-2 font-semibold text-gray-800">Chi tiết sản phẩm</h2>
      <ProductDisplay product={product} />
    </div>
  );
};

export default ProductDetailPage;
