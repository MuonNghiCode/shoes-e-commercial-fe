import React, { useState } from "react";

const initialUser = {
  fullName: "Nguyễn Văn A",
  username: "nguyenvana",
  email: "nguyenvana@example.com",
  phone: "0123456789",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  gender: "Nam",
  dob: "1995-01-01",
  role: "User",
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
  };

  return (
    <div>
      <h1>Thông tin cá nhân</h1>
      {!edit ? (
        <>
          <ul>
            <li>
              <strong>Họ và tên:</strong> {user.fullName}
            </li>
            <li>
              <strong>Tên đăng nhập:</strong> {user.username}
            </li>
            <li>
              <strong>Email:</strong> {user.email}
            </li>
            <li>
              <strong>Số điện thoại:</strong> {user.phone}
            </li>
            <li>
              <strong>Địa chỉ:</strong> {user.address}
            </li>
            <li>
              <strong>Giới tính:</strong> {user.gender}
            </li>
            <li>
              <strong>Ngày sinh:</strong> {user.dob}
            </li>
            <li>
              <strong>Vai trò:</strong> {user.role}
            </li>
          </ul>
          <button onClick={handleEdit} style={{ marginTop: 16 }}>
            Cập nhật thông tin
          </button>
        </>
      ) : (
        <form
          onSubmit={handleSave}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxWidth: 400,
          }}
        >
          <label>
            Họ và tên:
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </label>
          <label>
            Tên đăng nhập:
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              disabled
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
            />
          </label>
          <label>
            Số điện thoại:
            <input name="phone" value={form.phone} onChange={handleChange} />
          </label>
          <label>
            Địa chỉ:
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Giới tính:
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </label>
          <label>
            Ngày sinh:
            <input
              name="dob"
              value={form.dob}
              onChange={handleChange}
              type="date"
            />
          </label>
          <label>
            Vai trò:
            <input name="role" value={form.role} disabled />
          </label>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button type="submit">Lưu</button>
            <button type="button" onClick={handleCancel}>
              Hủy
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
