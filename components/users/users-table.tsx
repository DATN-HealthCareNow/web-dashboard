import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { apiClient, UserResponse } from "@/lib/api-client";

export function UsersTable() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserResponse[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [changingRole, setChangingRole] = useState<string | null>(null);

  // LOAD API DATA
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiClient.getUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    try {
      setChangingRole(userId);
      const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
      const updatedUser = await apiClient.changeUserRole(userId, newRole);
      
      const newUsers = users.map(u => u.id === userId ? updatedUser : u);
      setUsers(newUsers);
      setFilteredUsers(newUsers.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
          user.email?.toLowerCase().includes(search.toLowerCase()) ||
          user.id?.toLowerCase().includes(search.toLowerCase())
      ));
    } catch (error) {
      console.error("Failed to change user role", error);
      alert("Cập nhật quyền thất bại!");
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
        user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.id?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
  }, [search, users]);

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
            {filteredUsers.map((user) => (
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusBadge(
                      user.status
                    )}`}
                  >
                    ● {user.status}
                  </span>
                </td>

                {/* ROLE / ACTION */}
                <td className="py-4 px-6">
                  <button 
                    onClick={() => handleRoleToggle(user.id, user.role)}
                    disabled={changingRole === user.id}
                    className={`px-3 py-1 text-xs font-semibold rounded border ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
                  >
                    {changingRole === user.id ? 'Updating...' : user.role}
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
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
    </div>
  );
}