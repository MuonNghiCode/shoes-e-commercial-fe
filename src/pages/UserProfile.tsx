import React, { useState } from "react";
import Sidebar from "@/components/user/sideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialUser = {
  fullName: "Nguyễn Văn A",
  username: "nguyenvana",
  email: "nguyenvana@example.com",
  phone: "0123456789",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  gender: "Nam",
  dob: "1995-01-01",
};

const UserProfile = () => {
  const [user, setUser] = useState(initialUser);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEdit = () => {
    setEdit(true);
    setForm(user);
  };

  const handleCancel = () => {
    setEdit(false);
    setForm(user);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(form);
    setEdit(false);
    toast.success("Cập nhật thông tin thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="min-h-screen bg-[#F5E6C5] py-8 px-2 md:px-8">
      <ToastContainer />
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 w-full">
          <Sidebar />
        </div>
        <div className="md:w-3/4 w-full bg-[#FFF8ED] rounded-2xl shadow p-6 border border-[#E6D4B6]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#2D1A10]">Tài khoản</h2>
            {!edit && (
              <button
                onClick={handleEdit}
                className="bg-[#2D1A10] hover:bg-[#C9B37C] text-white px-5 py-2 rounded-lg font-semibold shadow transition-colors"
              >
                Chỉnh sửa
              </button>
            )}
          </div>
          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                disabled={!edit}
                className="border border-[#E6D4B6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9B37C] bg-[#FFF8ED] disabled:bg-[#F5E6C5] text-[#2D1A10]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Tên đăng nhập
              </label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                disabled
                className="border border-[#E6D4B6] rounded-lg px-3 py-2 bg-[#F5E6C5] text-[#2D1A10]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                disabled={!edit}
                className="border border-[#E6D4B6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9B37C] bg-[#FFF8ED] disabled:bg-[#F5E6C5] text-[#2D1A10]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={!edit}
                className="border border-[#E6D4B6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9B37C] bg-[#FFF8ED] disabled:bg-[#F5E6C5] text-[#2D1A10]"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                disabled={!edit}
                className="border border-[#E6D4B6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9B37C] bg-[#FFF8ED] disabled:bg-[#F5E6C5] text-[#2D1A10]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Giới tính
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                disabled={!edit}
                className="border border-[#E6D4B6] rounded-lg px-3 py-2 bg-[#FFF8ED] disabled:bg-[#F5E6C5] text-[#2D1A10]"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Ngày sinh
              </label>
              <input
                name="dob"
                value={form.dob}
                onChange={handleChange}
                type="date"
                disabled={!edit}
                className="border border-[#E6D4B6] rounded-lg px-3 py-2 bg-[#FFF8ED] disabled:bg-[#F5E6C5] text-[#2D1A10]"
              />
            </div>
            {edit && (
              <div className="md:col-span-2 flex gap-3 justify-end mt-2">
                <button
                  type="submit"
                  className="bg-[#2D1A10] hover:bg-[#C9B37C] text-white px-6 py-2 rounded-lg font-semibold shadow transition-colors"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-[#E6D4B6] hover:bg-[#C9B37C] text-[#2D1A10] px-6 py-2 rounded-lg font-semibold shadow transition-colors"
                >
                  Hủy
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
