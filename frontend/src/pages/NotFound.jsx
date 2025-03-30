import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 overflow-hidden">
      <h1 className="text-8xl font-extrabold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-2">Oops! Page Not Found</p>

      <div className="w-full max-w-lg h-64 mt-6">
      </div>

      <Link
        to="/"
        className="mt-6 px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-400 transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
