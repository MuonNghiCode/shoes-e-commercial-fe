const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 py-20 mb-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Khám phá thế giới <span className="text-yellow-300">Sneaker</span>{" "}
            chính hãng
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Đa dạng mẫu mã, giá tốt, giao hàng toàn quốc. Đặt hàng ngay để nhận
            ưu đãi hấp dẫn!
          </p>
          <a
            href="#shoes-list"
            className="inline-block bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded shadow hover:bg-yellow-300 transition"
          >
            Mua ngay
          </a>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/6b1e2e2d-2e2e-4e2e-8e2e-2e2e2e2e2e2e/air-max-270-shoe-KkLcGR.png"
            alt="Hero Sneaker"
            className="w-80 h-80 object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
