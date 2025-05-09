import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaQuestionCircle, FaUserShield } from 'react-icons/fa';

const FooterComponent = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-12 pb-4 mt-12 border-t-2 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Liên Kết Nhanh */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Trang Chủ</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Giới thiệu</a></li>
              <li><a href="/careers" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Tuyển dụng</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Liên hệ</a></li>
            </ul>
          </div>

          {/* Chính Sách */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">
              Chính Sách
            </h3>
            <ul className="space-y-2">
              <li><a href="/warranty-policy" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Chính sách bảo hành</a></li>
              <li><a href="/shipping-policy" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Chính sách giao hàng</a></li>
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Chính sách bảo mật</a></li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">
              Help
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/help-center" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                  <FaQuestionCircle className="w-4 h-4" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="/privacy-settings" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                  <FaUserShield className="w-4 h-4" />
                  Privacy Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Thông Tin Liên Hệ */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">
              Thông Tin Liên Hệ
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@example.com</li>
              <li>Điện thoại: (84) 123-456-789</li>
              <li>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</li>
            </ul>
          </div>

          {/* Mạng Xã Hội */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">
              Theo Dõi Chúng Tôi
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Your E-commerce Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;