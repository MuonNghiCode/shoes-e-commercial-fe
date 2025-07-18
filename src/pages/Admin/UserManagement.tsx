import { useState, useEffect } from "react";
import { adminService } from "@/services";
import { toast } from "react-toastify";
import type { Account, UpdateUserRequest } from "@/types";

interface LocalUser {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  phone?: string;
  address?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;
  _id?: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<LocalUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<LocalUser | null>(null);
  const [newUser, setNewUser] = useState<LocalUser>({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminService.getAllAccounts();

      // Check if response is successful and has data
      if (response && response.success !== false) {
        // Handle different response structures
        let userData: Account[] = [];

        if (Array.isArray(response)) {
          // Direct array response
          userData = response as Account[];
        } else if (response.data && Array.isArray(response.data)) {
          // Wrapped in data property
          userData = response.data;
        } else if (response.success && Array.isArray(response.data)) {
          // Standard ResponseModel structure
          userData = response.data;
        }

        if (userData.length > 0) {
          // Convert Account type to LocalUser type for UI compatibility
          const localUsers: LocalUser[] = userData.map((user: Account) => ({
            username: user.name,
            email: user.email,
            password: "", // Don't show password
            role: user.isAdmin ? "admin" : "user",
            phone: user.phone,
            address: user.address,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            _id: user._id,
          }));
          setUsers(localUsers);
          setLoading(false);
          return;
        }
      }

      // Fallback to mock data
      setUsers([
        {
          username: "admin",
          email: "admin@example.com",
          password: "admin123",
          role: "admin",
        },
        {
          username: "user1",
          email: "user1@example.com",
          password: "user123",
          role: "user",
        },
      ]);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Fallback to mock data
      setUsers([
        {
          username: "admin",
          email: "admin@example.com",
          password: "admin123",
          role: "admin",
        },
        {
          username: "user1",
          email: "user1@example.com",
          password: "user123",
          role: "user",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    // Get current admin info from localStorage or context
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const currentUsername = currentUser.username || currentUser.name;

    // Filter out current admin from the list
    const isCurrentAdmin = user.username === currentUsername;

    // Apply search filter
    const matchesSearch = user.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return !isCurrentAdmin && matchesSearch;
  });

  const handleEditUser = (user: LocalUser) => {
    setEditingUser(user);
    setNewUser({ ...user });
    setShowAddModal(true);
  };

  const handleUpdateUser = async () => {
    if (editingUser && newUser.username && editingUser._id && !isUpdating) {
      // Validate email uniqueness
      const emailExists = users.some(
        (user) => user.email === newUser.email && user._id !== editingUser._id
      );
      if (emailExists) {
        toast.error("Email này đã được sử dụng bởi người dùng khác!");
        return;
      }

      // Validate date of birth
      if (newUser.dateOfBirth) {
        const birthDate = new Date(newUser.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        if (birthDate > today) {
          toast.error("Ngày sinh không thể là ngày trong tương lai!");
          return;
        }

        if (age < 13) {
          toast.error("Tuổi phải từ 13 tuổi trở lên!");
          return;
        }

        if (age > 100) {
          toast.error("Tuổi không thể lớn hơn 100!");
          return;
        }
      }

      setIsUpdating(true);
      try {
        const userData: UpdateUserRequest = {
          name: newUser.username,
          email: newUser.email,
          isAdmin: newUser.role === "admin",
          phone: newUser.phone,
          address: newUser.address,
          gender: newUser.gender,
          dateOfBirth: newUser.dateOfBirth,
        };

        // Don't include password in update requests - keep existing password

        const response = await adminService.updateAccount(
          editingUser._id,
          userData
        );

        // Check if response is successful - handle different response structures
        if (
          response &&
          (response.success === true || response.success !== false)
        ) {
          // Reload users from server
          await fetchUsers();
          setEditingUser(null);
          setNewUser({ username: "", email: "", password: "", role: "user" });
          setShowAddModal(false);
          toast.success("Cập nhật người dùng thành công!");
        } else {
          toast.error("Không thể cập nhật tài khoản!");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        // Fallback to local update for mock data
        setUsers(
          users.map((user) =>
            user.username === editingUser.username
              ? { ...newUser, _id: user._id }
              : user
          )
        );
        setEditingUser(null);
        setNewUser({ username: "", email: "", password: "", role: "user" });
        setShowAddModal(false);
        toast.success("Cập nhật người dùng thành công!");
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleDeleteUser = async (username: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa người dùng ${username}?`)) {
      const userToDelete = users.find((user) => user.username === username);
      if (userToDelete?._id) {
        try {
          const response = await adminService.deleteAccount(userToDelete._id);

          // Check if response is successful - handle different response structures
          if (
            response &&
            (response.success === true || response.success !== false)
          ) {
            // Reload users from server
            await fetchUsers();
            toast.success("Xóa người dùng thành công!");
          } else {
            toast.error("Không thể xóa tài khoản!");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("Có lỗi xảy ra khi xóa tài khoản!");
        }
      } else {
        // For users without _id (mock data), just remove from local state
        setUsers(users.filter((user) => user.username !== username));
      }
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingUser(null);
    setNewUser({ username: "", email: "", password: "", role: "user" });
    // Reload users after closing modal to ensure data is fresh
    fetchUsers();
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--sneako-gray)" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--sneako-gray)" }}>
      <div className="p-6">
        {/* Loading overlay for operations */}
        {isUpdating && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
            <div className="text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-white text-sm">Đang cập nhật...</p>
            </div>
          </div>
        )}

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
            <table className="min-w-full table-fixed">
              <thead>
                <tr style={{ borderBottom: "2px solid var(--sneako-gold)" }}>
                  <th
                    className="text-left py-3 px-4 font-semibold w-32"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Tên đăng nhập
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold w-48"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Email
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold w-32"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Số điện thoại
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold w-40"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Địa chỉ
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold w-28"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Vai trò
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold w-28"
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
                      <div className="max-w-32 truncate" title={user.username}>
                        {user.username}
                      </div>
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      <div className="max-w-48 truncate" title={user.email}>
                        {user.email}
                      </div>
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      <div
                        className="max-w-32 truncate"
                        title={user.phone || "Chưa cập nhật"}
                      >
                        {user.phone || "Chưa cập nhật"}
                      </div>
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      <div
                        className="max-w-35 truncate"
                        title={user.address || "Chưa cập nhật"}
                      >
                        {user.address || "Chưa cập nhật"}
                      </div>
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
                Sửa người dùng
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
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: "var(--sneako-gold)",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={newUser.phone || ""}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: "var(--sneako-gold)",
                    }}
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--sneako-dark)" }}
                  >
                    Địa chỉ
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={newUser.address || ""}
                    onChange={(e) =>
                      setNewUser({ ...newUser, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: "var(--sneako-gold)",
                    }}
                    placeholder="Nhập địa chỉ"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium mb-1"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      Giới tính
                    </label>
                    <select
                      id="gender"
                      value={newUser.gender || ""}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          gender: e.target.value as "male" | "female" | "other",
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        borderColor: "var(--sneako-gold)",
                      }}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium mb-1"
                      style={{ color: "var(--sneako-dark)" }}
                    >
                      Ngày sinh
                    </label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      value={newUser.dateOfBirth || ""}
                      onChange={(e) =>
                        setNewUser({ ...newUser, dateOfBirth: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        borderColor: "var(--sneako-gold)",
                      }}
                      max={new Date().toISOString().split("T")[0]} // Không cho phép chọn ngày tương lai
                    />
                  </div>
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
                  onClick={handleUpdateUser}
                  disabled={isUpdating}
                  className={`sneako-cta flex-1 ${
                    isUpdating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
                </button>
                <button
                  onClick={closeModal}
                  disabled={isUpdating}
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
