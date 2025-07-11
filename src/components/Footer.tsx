const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-8">
      <div className="container mx-auto">
        <div className="mb-2 font-semibold">
          Shoes Shop &copy; {new Date().getFullYear()}
        </div>
        <div className="text-sm text-gray-300">
          Địa chỉ: 123 Đường Sneaker, Quận 1, TP.HCM | Điện thoại: 0123 456 789
        </div>
      </div>
    </footer>
  );
};

export default Footer;
