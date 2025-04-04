import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';

const RegisterComponent = ({ handleClose, handleLoginClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        handleClose();
        handleLoginClick();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic đăng ký ở đây
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl transform transition-all">
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        ✕
                    </button>

                    <div className="p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo tài khoản mới</h1>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Địa chỉ email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 text-gray-900"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Họ và tên <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Họ và tên"
                                            value={fullname}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 text-gray-900"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Mật khẩu <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Mật khẩu"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 text-gray-900"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 text-center text-gray-500">
                                <p>
                                    Bằng cách nhấn vào Đăng ký hoặc Tiếp tục với mạng xã hội, bạn đồng ý với{' '}
                                    <a href="#" className="text-blue-600 hover:underline">Điều khoản sử dụng</a>
                                    {' '}và{' '}
                                    <a href="#" className="text-blue-600 hover:underline">Chính sách bảo mật</a>.
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-6 mb-6 font-medium"
                            >
                                Đăng ký
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">HOẶC</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    type="button"
                                    className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <FaGoogle className="h-5 w-5 text-red-600" />
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <FaFacebook className="h-5 w-5 text-blue-600" />
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <FaApple className="h-5 w-5 text-gray-900" />
                                </button>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600">Đã có tài khoản?{' '}
                                    <button
                                        onClick={handleLogin}
                                        type="button"
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Đăng nhập
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;


