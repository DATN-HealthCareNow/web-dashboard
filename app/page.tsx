'use client';

import { Sidebar } from '@/components/sidebar';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { UserDistributionMap } from '@/components/dashboard/user-distribution-map';
import { ActivityLogs } from '@/components/dashboard/activity-logs';

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Overview
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome to the healthcare management platform
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search patients, logs..."
                className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                🔔
              </button>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-6">
          <DashboardStats />
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <UserDistributionMap />
            </div>
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    12.4k
                  </div>
                  <p className="text-gray-600">Total Users</p>
                </div>
              </div>
            </div>
          </div>
          <ActivityLogs />
        </div>
      </main>
    </div>
  );
}
