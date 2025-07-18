import { useParams } from "react-router-dom";
import { productService } from "@/services";
import React, { useState } from "react";
import { Particles } from "@/components";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail: React.FC = () => {
  let { user } = useAuth();
  // Nếu user chưa có, lấy từ localStorage
  if (!user || !user._id) {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  }
  const { id } = useParams<{ id: string }>();
  const [shoe, setShoe] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();

  React.useEffect(() => {
    if (id) {
      productService.getProductById(id).then((data) => {
        setShoe({
          ...data,
          sizes: Array.isArray(data.sizes)
            ? data.sizes
            : typeof data.sizes === "string"
            ? data.sizes.split(",")
            : [data.sizes],
        });
      });
    }
  }, [id]);

  if (!shoe) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-2xl font-bold text-[color:var(--sneako-gold,#e6c066)]">
        Không tìm thấy sản phẩm.
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full px-2 md:px-0 py-10 flex flex-col items-center bg-gradient-to-br from-[color:var(--sneako-beige,#f5f5dc)] via-white to-[color:var(--sneako-gold,#e6c066)] relative overflow-hidden">
      {/* Glassmorphism background overlay */}
      <Particles />
      <div className="relative w-full max-w-6xl mx-auto z-10 flex flex-col gap-10">
        {/* Top info */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center w-full">
          {/* Ảnh sản phẩm lớn nổi bật */}
          <div className="flex-shrink-0 w-full max-w-[520px] aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-[color:var(--sneako-beige,#f5f5dc)] shadow-2xl flex items-center justify-center border-4 border-[color:var(--sneako-gold,#e6c066)]/70 relative">
            <img
              src={shoe.images[0]}
              alt={shoe.name}
              className="w-full h-full object-cover object-center select-none drop-shadow-2xl scale-105 transition-transform duration-300 hover:scale-110"
              draggable={false}
              style={{ maxHeight: "420px" }}
            />
            {/* Hiệu ứng ánh sáng */}
            <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] bg-gradient-to-t from-white/30 via-transparent to-white/10" />
          </div>
          {/* Thông tin sản phẩm */}
          <div className="flex-1 flex flex-col gap-5 items-start justify-center px-2 md:px-0">
            <span className="inline-block bg-white/90 text-[color:var(--sneako-dark)] text-xs font-bold px-4 py-1 rounded-full border border-[color:var(--sneako-gold)] tracking-wider uppercase shadow w-fit">
              {shoe.brand}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[color:var(--sneako-gold,#e6c066)] mb-3 tracking-tight drop-shadow-lg leading-tight">
              {shoe.name}
            </h1>
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <span className="text-sm text-gray-700/80 bg-white/60 px-2 py-1 rounded border border-[color:var(--sneako-gold)]/30">
                Loại: {shoe.category}
              </span>
              <span className="text-sm text-gray-700/80 bg-white/60 px-2 py-1 rounded border border-[color:var(--sneako-gold)]/30">
                Còn lại: {shoe.stock}
              </span>
              {typeof shoe.averageRating === "number" && (
                <span className="flex items-center gap-1 text-yellow-600 font-semibold text-sm bg-white/60 px-2 py-1 rounded border border-[color:var(--sneako-gold)]/30">
                  <svg
                    width="18"
                    height="18"
                    fill="#FFD700"
                    viewBox="0 0 24 24"
                    className="inline-block drop-shadow"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  {shoe.averageRating?.toFixed(1)}
                  <span className="text-gray-500 text-xs">
                    ({shoe.numOfReviews || 0} đánh giá)
                  </span>
                </span>
              )}
            </div>
            <div className="text-base md:text-lg text-gray-700/90 mb-2 max-w-2xl">
              {shoe.description}
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl md:text-4xl font-bold text-[color:var(--sneako-gold,#e6c066)] tracking-wider drop-shadow-xl">
                {shoe.price.toLocaleString()}₫
              </span>
            </div>
            {/* Size chọn mua */}
            <div className="mb-4">
              <div className="font-semibold text-[color:var(--sneako-brown,#3d2c18)] mb-1">
                Chọn size:
              </div>
              <div className="flex flex-wrap gap-2">
                {shoe.sizes.map((sz: string | number) => (
                  <label
                    key={sz}
                    className={`px-3 py-1 rounded-lg border-2 cursor-pointer font-medium transition-colors duration-150 text-sm select-none bg-white/60 border-[color:var(--sneako-gold,#e6c066)]/40 ${
                      selectedSize === sz
                        ? "bg-[color:var(--sneako-gold,#e6c066)]/20 border-[color:var(--sneako-gold,#e6c066)] text-[color:var(--sneako-gold,#e6c066)]"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSize === sz}
                      onChange={() =>
                        setSelectedSize(
                          selectedSize === String(sz) ? null : String(sz)
                        )
                      }
                      className="hidden"
                    />
                    {sz}
                  </label>
                ))}
              </div>
            </div>
            {/* Nút bỏ vào giỏ hàng */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <button
                className="w-full md:w-fit flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-[color:var(--sneako-gold)] font-extrabold text-lg border-2 border-[color:var(--sneako-gold)] shadow-md hover:bg-yellow-100 hover:text-[color:var(--sneako-gold)] transition-all duration-200 tracking-wide hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[color:var(--sneako-gold)] disabled:opacity-60 mb-3"
                disabled={!selectedSize}
                onClick={() => {
                  if (selectedSize && shoe) {
                    addToCart({
                      id: shoe.id,
                      name: shoe.name,
                      price: shoe.price,
                      images: shoe.images,
                      size: selectedSize,
                    });
                    toast.success(
                      `Đã thêm ${shoe.name} (Size ${selectedSize}) vào giỏ hàng!`
                    );
                  }
                }}
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3"
                  />
                </svg>
                {selectedSize
                  ? `Bỏ vào giỏ hàng (Size ${selectedSize})`
                  : "Chọn size để thêm"}
              </button>
              {/* Nút mua */}
              <button
                className="w-full md:w-fit flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[color:var(--sneako-gold)] text-[color:var(--sneako-dark)] font-extrabold text-lg border-2 border-[color:var(--sneako-gold)] shadow-md hover:bg-yellow-300 hover:text-black transition-all duration-200 tracking-wide hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[color:var(--sneako-gold)] disabled:opacity-60"
                disabled={!selectedSize}
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3"
                  />
                </svg>
                {selectedSize
                  ? `Mua ngay (Size ${selectedSize})`
                  : "Chọn size để mua"}
              </button>
            </div>
          </div>
        </div>

        {/* Đánh giá & Review */}
        <div className="w-full mt-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-[color:var(--sneako-brown,#3d2c18)] mb-2 tracking-wide drop-shadow">
            Đánh giá & Review
          </h2>
          {typeof shoe.averageRating === "number" && (
            <div className="flex items-center gap-2 text-lg font-semibold text-yellow-700">
              <svg
                width="22"
                height="22"
                fill="#FFD700"
                viewBox="0 0 24 24"
                className="inline-block drop-shadow"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {shoe.averageRating?.toFixed(1)} trên 5
              <span className="text-gray-500 text-base">
                ({shoe.numOfReviews || 0} đánh giá)
              </span>
            </div>
          )}
          <div className="flex flex-col gap-3 mt-2">
            {shoe.review && shoe.review.length > 0 ? (
              shoe.review.map((rv: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-white/70 rounded-xl px-5 py-3 border border-[color:var(--sneako-gold,#e6c066)]/30 text-gray-800 shadow-sm"
                >
                  <span className="block text-base">{rv}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">
                Chưa có review nào cho sản phẩm này.
              </div>
            )}
            {/* Form đánh giá */}
            <form
              className="mt-6 flex flex-col gap-3 bg-white/80 rounded-xl p-5 border border-[color:var(--sneako-gold,#e6c066)]/30 shadow"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!user || !user.id)
                  return toast.error("Bạn cần đăng nhập để đánh giá!");
                const form = e.target as HTMLFormElement;
                const rating = Number(
                  (form.elements.namedItem("rating") as HTMLInputElement).value
                );
                const comment = (
                  form.elements.namedItem("comment") as HTMLInputElement
                ).value;
                if (!comment || !rating)
                  return toast.error("Vui lòng nhập đủ thông tin đánh giá!");
                try {
                  console.log("Review payload:", {
                    productId: shoe._id,
                    accountId: user.id,
                    rating,
                    comment,
                  });
                  await productService.createProductReview(shoe._id, {
                    productId: shoe._id,
                    accountId: user.id,
                    rating,
                    comment,
                  });
                  toast.success("Đã gửi đánh giá!");
                  // Reload lại sản phẩm để cập nhật review mới
                  productService.getProductById(shoe._id).then((data) => {
                    setShoe({
                      ...data,
                      sizes: Array.isArray(data.sizes)
                        ? data.sizes
                        : typeof data.sizes === "string"
                        ? data.sizes.split(",")
                        : [data.sizes],
                    });
                  });
                  form.reset();
                } catch (err) {
                  toast.error("Gửi đánh giá thất bại!");
                  console.error("Review error:", err);
                }
              }}
              // disabled={!user?._id}
            >
              <div className="flex gap-3 items-center">
                <label className="font-semibold text-[color:var(--sneako-brown)]">
                  Đánh giá:
                </label>
                <select
                  name="rating"
                  className="px-3 py-2 rounded-lg border border-[color:var(--sneako-gold)] bg-white"
                >
                  <option value="">Chọn điểm</option>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} sao
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="comment"
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-[color:var(--sneako-gold)] bg-white"
                placeholder="Nhập nhận xét của bạn..."
              />
              <button
                type="submit"
                className="w-fit px-6 py-2 rounded-full bg-[color:var(--sneako-gold)] text-white font-bold border-2 border-[color:var(--sneako-gold)] shadow hover:bg-yellow-300 hover:text-black transition-all duration-200"
                disabled={!user || !user.id}
              >
                {user && user.id
                  ? "Gửi đánh giá"
                  : "Bạn cần đăng nhập để đánh giá"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
