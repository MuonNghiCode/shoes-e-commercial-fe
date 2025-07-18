import React from "react";

const teamMembers = [
  {
    name: "Nguyễn Văn A",
    role: "Trưởng nhóm",
    avatar: "/avatar1.webp",
  },
  {
    name: "Trần Thị B",
    role: "Thành viên",
    avatar: "/avatar2.webp",
  },
  {
    name: "Lê Văn C",
    role: "Thành viên",
    avatar: "/avatar3.webp",
  },
  {
    name: "Phạm Thị D",
    role: "Thành viên",
    avatar: "/avatar4.webp",
  },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5E6C5] py-10 px-2 md:px-8 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-[#FFF8ED] rounded-2xl shadow-lg border border-[#E6D4B6] p-8 flex flex-col items-center">
        <img
          src="/logo.webp"
          alt="Sneako Logo"
          className="w-24 h-24 mb-4 drop-shadow"
        />
        <h1 className="text-4xl font-extrabold text-[#2D1A10] mb-2 tracking-wide text-center">
          Về Sneako
        </h1>
        <p className="text-lg text-[#2D1A10] mb-6 text-center max-w-2xl">
          Sneako là nền tảng thương mại điện tử chuyên về giày sneaker và thời
          trang cao cấp, mang đến trải nghiệm mua sắm hiện đại, tiện lợi và an
          toàn cho khách hàng. Chúng tôi cam kết cung cấp sản phẩm chính hãng,
          dịch vụ tận tâm và không ngừng đổi mới để đáp ứng nhu cầu của bạn.
        </p>
        <div className="w-full flex flex-col md:flex-row gap-8 items-center mb-8">
          <img
            src="/welcome2.webp"
            alt="Sneaker Luxury"
            className="w-full md:w-1/2 rounded-xl shadow-md object-cover"
            style={{ maxHeight: 220 }}
          />
          <ul className="flex-1 space-y-3 text-[#2D1A10] text-base font-medium">
            <li>✔️ Sản phẩm đa dạng, cập nhật liên tục</li>
            <li>✔️ Đảm bảo chất lượng và nguồn gốc</li>
            <li>✔️ Giao hàng nhanh chóng, hỗ trợ tận tình</li>
            <li>✔️ Đội ngũ phát triển trẻ trung, sáng tạo</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-[#2D1A10] mb-4 text-center">
          Thành viên nhóm phát triển
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center bg-[#F5E6C5] rounded-xl p-4 shadow border border-[#E6D4B6] w-40"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full mb-2 object-cover bg-white"
              />
              <div className="font-semibold text-[#2D1A10]">{member.name}</div>
              <div className="text-sm text-[#C9B37C]">{member.role}</div>
            </div>
          ))}
        </div>
        <div className="text-center text-[#bfa046] mt-6 text-sm">
          © {new Date().getFullYear()} Sneako. Đồ án môn SDN302 - FPT
          University.
        </div>
      </div>
    </div>
  );
};

export default About;
