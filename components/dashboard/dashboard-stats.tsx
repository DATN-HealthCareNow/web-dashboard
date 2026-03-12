import { TrendingUp } from 'lucide-react';
import { dashboardStats } from '@/lib/mock-data';

export function DashboardStats() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Total Active Users */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Active Users</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {dashboardStats.totalActiveUsers.toLocaleString()}
            </p>
          </div>
          <div className="text-blue-600 bg-blue-50 p-3 rounded-lg">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-green-600">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">+5.2%</span>
          <span className="text-gray-600 text-sm">vs last month</span>
        </div>
      </div>

      {/* New Registrations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">New Registrations</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {dashboardStats.newRegistrations}
            </p>
          </div>
          <div className="text-purple-600 bg-purple-50 p-3 rounded-lg">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2h8v-2zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-2a4 4 0 00-8 0v2h8z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-green-600">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">+1.8%</span>
          <span className="text-gray-600 text-sm">vs last month</span>
        </div>
      </div>

      {/* Critical Health Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Action Req.</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {dashboardStats.criticalAlerts}
            </p>
            <p className="text-xs text-gray-500 mt-1">Critical Health Alerts</p>
          </div>
          <div className="text-orange-600 bg-orange-50 p-3 rounded-lg">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4 text-orange-600 text-sm font-medium">
          Review needed
        </div>
      </div>
    </div>
  );
}
