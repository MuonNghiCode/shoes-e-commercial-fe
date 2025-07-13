import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Không tìm thấy trang</h2>
      <p className="mb-6 text-gray-600">
        Trang bạn truy cập không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Về trang chủ
      </Link>
    </div>
  );
};

export default ErrorPage;
