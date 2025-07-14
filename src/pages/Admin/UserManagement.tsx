import { useState } from "react";
import { users as mockUsers, type User } from "@/mocks/users";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User>({
    username: "",
    password: "",
    role: "user",
  });

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (newUser.username && newUser.password) {
      setUsers([...users, { ...newUser }]);
      setNewUser({ username: "", password: "", role: "user" });
      setShowAddModal(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUser({ ...user });
    setShowAddModal(true);
  };

  const handleUpdateUser = () => {
    if (editingUser && newUser.username && newUser.password) {
      setUsers(
        users.map((user) =>
          user.username === editingUser.username ? { ...newUser } : user
        )
      );
      setEditingUser(null);
      setNewUser({ username: "", password: "", role: "user" });
      setShowAddModal(false);
    }
  };

  const handleDeleteUser = (username: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa người dùng ${username}?`)) {
      setUsers(users.filter((user) => user.username !== username));
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingUser(null);
    setNewUser({ username: "", password: "", role: "user" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--sneako-gray)" }}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--sneako-dark)" }}
            >
              Quản lý người dùng
            </h1>
            <p className="text-lg" style={{ color: "var(--sneako-dark)" }}>
              Quản lý tài khoản người dùng hệ thống
            </p>
          </div>
          <button className="sneako-cta" onClick={() => setShowAddModal(true)}>
            + Thêm người dùng
          </button>
        </div>

        {/* Search and Filter */}
        <div
          className="mb-6 p-6 rounded-lg shadow-sm border"
          style={{
            background: "var(--sneako-beige)",
            borderColor: "var(--sneako-gold)",
          }}
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  borderColor: "var(--sneako-gold)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div
          className="p-6 rounded-lg shadow-sm border"
          style={{
            background: "var(--sneako-beige)",
            borderColor: "var(--sneako-gold)",
          }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "var(--sneako-dark)" }}
          >
            Danh sách người dùng ({filteredUsers.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr style={{ borderBottom: "2px solid var(--sneako-gold)" }}>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Tên đăng nhập
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Vai trò
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Trạng thái
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.username}
                    style={{
                      borderBottom:
                        index < filteredUsers.length - 1
                          ? "1px solid var(--sneako-gold)"
                          : "none",
                    }}
                  >
                    <td
                      className="py-3 px-4 font-medium"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      {user.username}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Hoạt động
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="px-3 py-1 text-xs font-medium rounded border"
                          style={{
                            borderColor: "var(--sneako-gold)",
                            color: "var(--sneako-dark)",
                            background: "var(--sneako-gray)",
                          }}
                        >
                          Sửa
                        </button>
                        {user.username !== "admin" && (
                          <button
                            onClick={() => handleDeleteUser(user.username)}
                            className="px-3 py-1 text-xs font-medium rounded bg-red-100 text-red-800 border border-red-200"
                          >
                            Xóa
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="p-6 rounded-lg shadow-lg w-full max-w-md"
              style={{
                background: "var(--sneako-beige)",
                border: "2px solid var(--sneako-gold)",
              }}
            >
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: "var(--sneako-dark)" }}
              >
                {editingUser ? "Sửa người dùng" : "Thêm người dùng mới"}
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Tên đăng nhập
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: "var(--sneako-gold)",
                    }}
                    disabled={!!editingUser}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Mật khẩu
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: "var(--sneako-gold)",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Vai trò
                  </label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        role: e.target.value as "admin" | "user",
                      })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: "var(--sneako-gold)",
                    }}
                  >
                    <option value="user">Người dùng</option>
                    <option value="admin">Quản trị viên</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={editingUser ? handleUpdateUser : handleAddUser}
                  className="sneako-cta flex-1"
                >
                  {editingUser ? "Cập nhật" : "Thêm"}
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border rounded font-medium"
                  style={{
                    borderColor: "var(--sneako-gold)",
                    color: "var(--sneako-dark)",
                    background: "var(--sneako-gray)",
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
