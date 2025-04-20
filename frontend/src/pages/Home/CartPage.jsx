import React, { useState } from 'react';
import { Trash } from '@phosphor-icons/react';

const steps = ['Giỏ hàng', 'Thông tin đặt hàng', 'Thanh toán', 'Hoàn tất'];

const CartPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Chuột Logitech G102 LightSync White',
      image: 'https://example.com/logitech-g102.png',
      originalPrice: 599000,
      discountPrice: 390000,
      quantity: 1
    },
    {
      id: 2,
      name: 'Bàn phím cơ Corsair K70 RGB MK.2',
      image: 'https://example.com/corsair-k70.png',
      originalPrice: 2990000,
      discountPrice: 2390000,
      quantity: 1
    },
    {
      id: 3,
      name: 'Tai nghe Sony WH-1000XM4',
      image: 'https://example.com/sony-wh1000xm4.png',
      originalPrice: 7990000,
      discountPrice: 6990000,
      quantity: 1
    },

  ]);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1 || isNaN(newQuantity)) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const { name, address, phone } = shippingInfo;
      if (!name.trim() || !address.trim() || !phone.trim()) {
        alert('Vui lòng điền đầy đủ thông tin giao hàng.');
        return;
      }
    }

    if (currentStep === 2) {
      if (!paymentMethod) {
        alert('Vui lòng chọn phương thức thanh toán.');
        return;
      }

      // Fake submit
      console.log('Đặt hàng:', { cartItems, shippingInfo, paymentMethod });
      setOrderCompleted(true);
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.discountPrice * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 text-black max-w-[60%]">
      {/* Progress Tracker */}
      <div className="flex bg-red-50 p-4 mb-8 rounded justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex items-center relative">
            {/* Step circle and label */}
            <div className="flex flex-col items-center w-full z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-1 text-sm
            ${index === currentStep ? 'bg-red-500 border-red-500 text-white' : 'border-gray-400 text-gray-600'}`}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm font-medium ${index === currentStep ? 'text-red-500' : 'text-gray-600'
                  }`}
              >
                {step}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute right-0 top-4 w-full flex justify-end">
                <div className="w-full h-px border-t border-dashed border-gray-300 mx-4"></div>
              </div>
            )}
          </div>
        ))}
      </div>


      {/* Step 0: Cart */}
      {currentStep === 0 && (
        <div>
          {cartItems.map((item) => (
            <div className="flex items-center justify-between border-b py-4">
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain border rounded"
                />
                <div>
                  <h3 className="font-semibold text-xl">{item.name}</h3>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-lg text-gray-500 flex items-center mt-6 hover:text-red-500"
                  >
                    <Trash size={16} weight="light" className="mr-1" />
                    Xoá
                  </button>
                </div>
              </div>

              {/* Price + Quantity */}
              <div className="flex flex-col items-end space-y-2">
                <div className="text-right">
                  <div className="text-red-500 font-bold text-xl">
                    {item.discountPrice.toLocaleString()}đ
                  </div>
                  <div className="text-gray-400 line-through text-lg">
                    {item.originalPrice.toLocaleString()}đ
                  </div>
                </div>
                <div className="flex items-center border rounded overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-lg"
                  >
                    –
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-10 text-center border-x outline-none"
                  />
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>


          ))}
          <div className="flex justify-between items-center mt-4 text-2xl font-bold">
            <span>Tổng cộng:</span>
            <span className="text-red-500">{totalPrice.toLocaleString()}đ</span>
          </div>

        </div>
      )}

      {/* Step 1: Shipping Info */}
      {currentStep === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
          <div className="mb-4">
            <label className="block mb-2">Tên</label>
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleShippingInfoChange}
              className="border px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingInfoChange}
              className="border px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleShippingInfoChange}
              className="border px-4 py-2 w-full"
            />
          </div>
        </div>
      )}

      {/* Step 2: Payment Method */}
      {currentStep === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Hình thức thanh toán</h2>
          {['COD', 'CreditCard', 'E-Wallet'].map((method) => (
            <label key={method} className="block mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              {method === 'COD'
                ? 'Thanh toán khi nhận hàng'
                : method === 'CreditCard'
                  ? 'Thẻ tín dụng'
                  : 'Ví điện tử'}
            </label>
          ))}
        </div>
      )}

      {/* Step 3: Done */}
      {currentStep === 3 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Đặt hàng thành công!</h2>
          <p className="text-gray-700">Cảm ơn bạn đã mua sắm với chúng tôi 🎉</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 0 && currentStep < 3 && (
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Quay lại
          </button>
        )}
        {currentStep < 3 && (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {currentStep === 2 ? 'Xác nhận' : 'Tiếp theo'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
