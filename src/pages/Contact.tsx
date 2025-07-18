import React, { useState } from "react";

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Thực tế sẽ gửi dữ liệu tới backend tại đây
  };

  return (
    <div className="min-h-screen bg-[#F5E6C5] py-10 px-2 md:px-8 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-[#FFF8ED] rounded-2xl shadow-lg border border-[#E6D4B6] p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-[#2D1A10] mb-2 tracking-wide text-center">
          Liên hệ với Sneako
        </h1>
        <p className="text-lg text-[#2D1A10] mb-6 text-center max-w-xl">
          Nếu bạn có bất kỳ thắc mắc, góp ý hoặc cần hỗ trợ, hãy liên hệ với
          chúng tôi qua thông tin dưới đây hoặc gửi tin nhắn trực tiếp bằng biểu
          mẫu.
        </p>
        <div className="w-full flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1 flex flex-col gap-4 justify-center">
            <div className="flex items-center gap-3">
              <span className="text-[#C9B37C] text-2xl">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M21 10.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-8.5"
                    stroke="#C9B37C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.27 6.96L12 13l8.73-6.04A2 2 0 0020 5H4a2 2 0 00-.73 1.96z"
                    stroke="#C9B37C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[#2D1A10] text-base font-medium select-all">
                support@sneako.vn
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#C9B37C] text-2xl">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M3 5a2 2 0 012-2h2.28a2 2 0 011.7 1.06l1.09 2.18a2 2 0 001.7 1.06h2.46a2 2 0 001.7-1.06l1.09-2.18A2 2 0 0116.72 3H19a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                    stroke="#C9B37C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 11.37A4 4 0 1112.63 8"
                    stroke="#C9B37C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[#2D1A10] text-base font-medium select-all">
                0123 456 789
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#C9B37C] text-2xl">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M17.657 16.657A8 8 0 013.343 2.343l3.535 3.535a4 4 0 005.657 5.657l3.535 3.535z"
                    stroke="#C9B37C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[#2D1A10] text-base font-medium">
                123 Đường ABC, Quận 1, TP.HCM
              </span>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-1 bg-[#F5E6C5] rounded-xl p-6 shadow border border-[#E6D4B6] flex flex-col gap-4"
          >
            <label className="text-sm font-medium text-[#2D1A10]">
              Họ và tên
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 rounded-lg border border-[#E6D4B6] bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#C9B37C] text-[#2D1A10]"
              />
            </label>
            <label className="text-sm font-medium text-[#2D1A10]">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 rounded-lg border border-[#E6D4B6] bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#C9B37C] text-[#2D1A10]"
              />
            </label>
            <label className="text-sm font-medium text-[#2D1A10]">
              Nội dung
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-[#E6D4B6] bg-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#C9B37C] text-[#2D1A10]"
              />
            </label>
            <button
              type="submit"
              className="bg-[#2D1A10] hover:bg-[#C9B37C] text-white font-semibold py-2 rounded-lg shadow transition-colors mt-2"
              disabled={submitted}
            >
              {submitted ? "Đã gửi liên hệ" : "Gửi liên hệ"}
            </button>
            {submitted && (
              <div className="text-green-600 text-sm mt-2 text-center">
                Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
              </div>
            )}
          </form>
        </div>
        <div className="text-center text-[#bfa046] mt-6 text-sm">
          © {new Date().getFullYear()} Sneako. Đồ án môn SDN302 - FPT
          University.
        </div>
      </div>
    </div>
  );
};

export default Contact;
