import { useEffect, useState } from "react";
import { Search, Loader2, ChevronLeft, ChevronRight, Lock, Unlock, Trash2 } from "lucide-react";
import { apiClient, UserResponse } from "@/lib/api-client";
import { log } from "console";

export function UsersTable() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserResponse[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [changingRole, setChangingRole] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // LOAD API DATA
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiClient.getUsers();
        setUsers(data);
        setFilteredUsers(data);
        console.log(data);

      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    if (currentRole === 'ADMIN') return;

    try {
      setChangingRole(userId);
      const newRole = 'ADMIN';
      const updatedUser = await apiClient.changeUserRole(userId, newRole);

      const newUsers = users.map(u => u.id === userId ? updatedUser : u);
      setUsers(newUsers);
      setFilteredUsers(newUsers.filter(
        (user) =>
          (user.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
          (user.email || '').toLowerCase().includes(search.toLowerCase()) ||
          (user.id || '').toLowerCase().includes(search.toLowerCase())
      ));
    } catch (error) {
      console.error("Failed to change user role", error);
      alert("Cập nhật quyền thất bại!");
    } finally {
      setChangingRole(null);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      if (newStatus === 'DELETED') {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
      }

      setChangingRole(userId);
      const updatedUser = await apiClient.changeUserStatus(userId, newStatus);

      const newUsers = users.map(u => u.id === userId ? updatedUser : u);
      setUsers(newUsers);
      setFilteredUsers(newUsers.filter(
        (user) =>
          (user.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
          (user.email || '').toLowerCase().includes(search.toLowerCase()) ||
          (user.id || '').toLowerCase().includes(search.toLowerCase())
      ));
    } catch (error) {
      console.error("Failed to change user status", error);
      alert("Cập nhật trạng thái thất bại!");
    } finally {
      setChangingRole(null);
    }
  };

  // TÍNH AGE
  const getAge = (dob?: string) => {
    if (!dob) return "N/A";
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // 🔍 SEARCH
  useEffect(() => {
    const result = users.filter(
      (user) =>
        (user.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (user.id || '').toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
    setCurrentPage(1);
  }, [search, users]);

  // Pagination logic
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const displayUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const getStatusBadge = (status: string) => {
    if (status === "ACTIVE") return "bg-green-100 text-green-800";
    if (status === "SUSPENDED") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Search */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-4 px-6 text-left text-xs font-semibold">User</th>
                <th className="py-4 px-6 text-left text-xs font-semibold">Age</th>
                <th className="py-4 px-6 text-left text-xs font-semibold">Height</th>
                <th className="py-4 px-6 text-left text-xs font-semibold">Weight</th>
                <th className="py-4 px-6 text-left text-xs font-semibold">Status</th>
                <th className="py-4 px-6 text-left text-xs font-semibold">Role</th>
              </tr>
            </thead>

            <tbody>
              {displayUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  {/* USER */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatarUrl || "https://i.pravatar.cc/150"}
                        alt={user.fullName || "User"}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{user.fullName || "User"}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* AGE */}
                  <td className="py-4 px-6">{getAge(user.dateOfBirth)}</td>

                  {/* HEIGHT */}
                  <td className="py-4 px-6">
                    {user.heightCm ? `${user.heightCm} cm` : "N/A"}
                  </td>

                  {/* WEIGHT */}
                  <td className="py-4 px-6">
                    {user.weightKg ? `${user.weightKg} kg` : "N/A"}
                  </td>

                  {/* STATUS */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${user.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200' :
                            user.status === 'SUSPENDED' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-red-50 text-red-700 border-red-200'
                          }`}
                      >
                        {user.status}
                      </span>

                      {/* Quick Actions cho Status */}
                      <div className="flex items-center opacity-70 hover:opacity-100 transition-opacity">
                        {user.status === 'ACTIVE' ? (
                          <button
                            onClick={() => handleStatusChange(user.id, 'SUSPENDED')}
                            disabled={changingRole === user.id}
                            className="p-1.5 text-yellow-600 hover:bg-yellow-100 rounded-md transition-colors"
                            title="Tạm khóa tài khoản"
                          >
                            <Lock size={15} />
                          </button>
                        ) : user.status === 'SUSPENDED' ? (
                          <button
                            onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                            disabled={changingRole === user.id}
                            className="p-1.5 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                            title="Mở khóa tài khoản"
                          >
                            <Unlock size={15} />
                          </button>
                        ) : null}

                        {user.status !== 'DELETED' && (
                          <button
                            onClick={() => handleStatusChange(user.id, 'DELETED')}
                            disabled={changingRole === user.id}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors ml-1"
                            title="Xóa tài khoản"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* ROLE / ACTION */}
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleRoleToggle(user.id, user.role)}
                      disabled={changingRole === user.id || user.role === 'ADMIN'}
                      className={`px-3 py-1 text-xs font-semibold rounded-md border transition-colors ${user.role === 'ADMIN'
                          ? 'bg-purple-50 text-purple-700 border-purple-200 cursor-not-allowed'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-purple-700 hover:border-purple-200'
                        }`}
                      title={user.role === 'ADMIN' ? 'Tài khoản đã là Admin' : 'Thăng cấp lên Admin'}
                    >
                      {changingRole === user.id ? '...' : user.role}
                    </button>
                  </td>
                </tr>
              ))}

              {displayUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            Rows per page: <span className="font-medium">{itemsPerPage}</span>
          </p>
          <div className="flex items-center gap-4">
            <p className="text-gray-600 text-sm">
              {totalItems === 0 ? '0-0 of 0' : `${startIndex + 1}-${endIndex} of ${totalItems}`}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}