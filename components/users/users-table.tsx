import { users } from '@/lib/mock-data';
import { Search } from 'lucide-react';

export function UsersTable() {
  const getRoleIcon = (role: string) => {
    if (role === 'Doctor') {
      return '⚕️';
    } else if (role === 'Admin') {
      return '👤';
    } else {
      return '👥';
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Active') {
      return 'bg-green-100 text-green-800';
    } else if (status === 'Inactive') {
      return 'bg-gray-100 text-gray-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Search and Filter */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              className="flex-1 bg-transparent focus:outline-none text-gray-900"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg bg-black text-white font-medium hover:bg-gray-900">
            All Roles
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <span>Doctors</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <span>Admins</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <span>Staff</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Filter Status
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                User
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Role
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Last Login
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-gray-900">
                    <span>{getRoleIcon(user.role)}</span>
                    <span>{user.role}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                    {user.status === 'Active' && '● '}
                    {user.status === 'Inactive' && '● '}
                    {user.status === 'Suspended' && '● '}
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600 text-sm">
                  {user.lastLogin}
                </td>
                <td className="py-4 px-6">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-gray-600 text-sm">
          Showing 1-5 of 128 users
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">&lt;</button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
          <span className="px-2">...</span>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">12</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">&gt;</button>
        </div>
      </div>
    </div>
  );
}
