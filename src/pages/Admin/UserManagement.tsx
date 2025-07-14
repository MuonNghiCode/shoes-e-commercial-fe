import { useState } from "react";
import { users as mockUsers, type User } from "@/mocks/users";
import { UserModal } from "../../components/modals";
import { Plus, Edit2, Trash2 } from "../../lib/icons";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (userData: User) => {
    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.username === editingUser.username ? userData : user
        )
      );
    } else {
      // Add new user
      setUsers([...users, userData]);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (username: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa người dùng ${username}?`)) {
      setUsers(users.filter((user) => user.username !== username));
    }
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
          <button
            className="sneako-cta flex items-center gap-2"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            Thêm người dùng
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
                          className="p-2 text-xs font-medium rounded border hover:opacity-80 transition-opacity"
                          style={{
                            borderColor: "var(--sneako-gold)",
                            color: "var(--sneako-dark)",
                            background: "var(--sneako-gray)",
                          }}
                          title="Sửa"
                        >
                          <Edit2 size={14} />
                        </button>
                        {user.username !== "admin" && (
                          <button
                            onClick={() => handleDeleteUser(user.username)}
                            className="p-2 text-xs font-medium rounded bg-red-100 text-red-800 border border-red-200 hover:bg-red-200 transition-colors"
                            title="Xóa"
                          >
                            <Trash2 size={14} />
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

        {/* User Modal */}
        <UserModal
          isOpen={showAddModal}
          onClose={closeModal}
          user={editingUser}
          onSave={handleAddUser}
        />
      </div>
    </div>
  );
};

export default UserManagement;
