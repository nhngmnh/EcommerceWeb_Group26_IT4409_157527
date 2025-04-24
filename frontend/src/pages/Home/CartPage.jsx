import React, { useState } from 'react';
import { Trash } from '@phosphor-icons/react';
import { FaMapMarkerAlt, FaPhoneAlt, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
const steps = ['Giỏ hàng', 'Thông tin đặt hàng', 'Thanh toán', 'Hoàn tất'];

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [currentStep, setCurrentStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1 || isNaN(newQuantity)) return;
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(removeFromCart(id));
      dispatch(addToCart({ ...item, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));

  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const { name, address, phone } = shippingInfo;
      if (!name.trim() || !address.trim() || !phone.trim()) {
        toast.error("Vui lòng điền đầy đủ thông tin giao hàng.");
        return;
      }
    }

    if (currentStep === 2) {
      if (!paymentMethod) {
        toast.error("Vui lòng chọn phương thức thanh toán.");
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

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item.discountedPrice.replace(/\./g, ''));
    return sum + price * item.quantity;
  }, 0);
  
  

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
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Giỏ hàng của bạn đang trống</h2>
              <button
                onClick={() => window.location.href = '/'} // hoặc link đến trang sản phẩm
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Tiếp tục mua hàng
              </button>
            </div>) : (
            <>

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
                          {item.discountedPrice.toLocaleString()}đ
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


                ))
              }
              < div className="flex justify-between items-center mt-4 text-2xl font-bold">
                <span>Tổng cộng:</span>
                <span className="text-red-500">{totalPrice.toLocaleString()}đ</span>
              </div>
            </>
          )}
        </div>
      )
      }

      {/* Step 1: Shipping Info */}
      {
        currentStep === 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2">Tên <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleShippingInfoChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 text-gray-900"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2">Địa chỉ <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingInfoChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 text-gray-900"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2">Số điện thoại <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhoneAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleShippingInfoChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 text-gray-900"
                  required
                />
              </div>
            </div>
          </div>
        )
      }


      {/* Step 2: Payment Method */}
      {
        currentStep === 2 && (
          <div className="space-y-6">
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800">Xác nhận đơn hàng</h2>

            {/* Shipping Info */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-2">
              <div className='text-xl'><span className="font-semibold">Khách hàng:</span> {shippingInfo.name}</div>
              <div className='text-xl'><span className="font-semibold">Số điện thoại:</span> {shippingInfo.phone}</div>
              <div className='text-xl'><span className="font-semibold">Địa chỉ nhận hàng:</span> {shippingInfo.address}</div>
            </div>

            {/* Cart Items */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Số lượng: x{item.quantity}</p>
                  </div>
                  <div className="text-red-500 font-semibold">
                  {(Number(item.discountedPrice.replace(/\./g, '')) * item.quantity).toLocaleString()}đ

                  </div>
                </div>
              ))}

              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-base">
                  <span className="text-gray-700">Tạm tính:</span>
                  <span className="text-red-500 font-semibold">{totalPrice.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-700">Phí vận chuyển:</span>
                  <span className="text-green-600 font-medium">Miễn phí</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng tiền:</span>
                  <span className="text-red-600">{totalPrice.toLocaleString()}đ</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Chọn hình thức thanh toán</h3>
              <div className="space-y-2">
                {[
                  { value: 'COD', label: 'Thanh toán khi nhận hàng' },
                  { value: 'CreditCard', label: 'Thẻ tín dụng' },
                  { value: 'E-Wallet', label: 'Quét mã QR' },
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition hover:border-blue-500 ${paymentMethod === value ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                      }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={value}
                      checked={paymentMethod === value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/* Step 3: Done */}
      {
        currentStep === 3 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Đặt hàng thành công!</h2>
            <p className="text-gray-700">Cảm ơn bạn đã mua sắm với chúng tôi 🎉</p>
          </div>
        )
      }

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
        {currentStep < 3 && cartItems.length !=0 && (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {currentStep === 2 ? 'Xác nhận' : 'Tiếp theo'}
          </button>
        )}
      </div>
    </div >
  );
};

export default CartPage;
