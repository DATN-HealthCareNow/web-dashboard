import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: "ACTIVE" | "SUSPENDED" | "DELETED";

  dateOfBirth?: string;
  heightCm?: number;
  weightKg?: number;

  avatarUrl?: string;
  lastLogin?: string;
};

// 🎯 MOCK DATA
const mockUsers: User[] = [
  {
    id: "U001",
    fullName: "Nguyen Van A",
    email: "a@gmail.com",
    role: "USER",
    status: "ACTIVE",
    dateOfBirth: "1995-05-20",
    heightCm: 170,
    weightKg: 65,
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    lastLogin: "2026-03-20",
  },
  {
    id: "U002",
    fullName: "Tran Thi B",
    email: "b@gmail.com",
    role: "USER",
    status: "SUSPENDED",
    dateOfBirth: "2000-08-10",
    heightCm: 160,
    weightKg: 50,
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "U003",
    fullName: "Le Van C",
    email: "c@gmail.com",
    role: "USER",
    status: "ACTIVE",
    dateOfBirth: "1988-01-15",
    heightCm: 175,
    weightKg: 70,
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
];

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  // LOAD MOCK DATA
  useEffect(() => {
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

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
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toLowerCase().includes(search.toLowerCase())
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
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="py-4 px-6 text-left text-xs font-semibold">User</th>
              <th className="py-4 px-6 text-left text-xs font-semibold">Age</th>
              <th className="py-4 px-6 text-left text-xs font-semibold">Height</th>
              <th className="py-4 px-6 text-left text-xs font-semibold">Weight</th>
              <th className="py-4 px-6 text-left text-xs font-semibold">Status</th>
              <th className="py-4 px-6 text-left text-xs font-semibold">Action</th>
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
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{user.fullName}</p>
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

                {/* ACTION */}
                <td className="py-4 px-6">
                  <button className="text-blue-600 text-sm hover:underline">
                    Edit
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
      </div>
    </div>
  );
}