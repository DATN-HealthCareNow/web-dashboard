'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/sidebar';
import { apiClient, DashboardOverviewResponse } from '@/lib/api-client';
import { Loader2 } from 'lucide-react';
import { log } from 'console';

export default function DashboardPage() {
  const [overview, setOverview] = useState<DashboardOverviewResponse | null>(null);
  const [articlesCount, setArticlesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const overviewData = await apiClient.getDashboardOverview();
        console.log(overviewData);

        setOverview(overviewData);
        setArticlesCount(overviewData.stats.totalArticles || 0);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Overview
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome to the personalized health management platform
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search online users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <button
                onClick={() => alert('No new notifications')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                🔔
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="ml-2 text-gray-600">Loading dashboard...</span>
            </div>
          ) : (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-2">Total Users</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {overview?.stats.totalUsers || 0}
                  </div>
                  <p className="text-xs text-green-600 mt-2">
                    +{overview?.stats.newRegistrations || 0} new this month
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-2">Active Users</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {overview?.stats.activeUsers || 0}
                  </div>
                  <p className="text-xs text-green-600 mt-2">Currently Active Users</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-2">Online Now</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {overview?.stats.onlineUsers || 0}
                  </div>
                  <p className="text-xs text-green-600 mt-2">Live sessions</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-2">Articles Published</div>
                  <div className="text-3xl font-bold text-gray-900">{articlesCount}</div>
                  <p className="text-xs text-blue-600 mt-2">Available articles</p>
                </div>
              </div>

              {/* Activity and Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 max-h-96 overflow-y-auto">
                  <h3 className="font-semibold text-gray-900 mb-4">Recent Online Users</h3>
                  <div className="space-y-3">
                    {overview?.onlineUsers && overview.onlineUsers.length > 0 ? (
                      overview.onlineUsers
                        .filter(u =>
                          (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (u.location && u.location.toLowerCase().includes(searchQuery.toLowerCase()))
                        )
                        .slice(0, 10)
                        .map((user, idx) => (
                          <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{user.email || 'Unknown User'}</p>
                              <p className="text-xs text-gray-500">{user.location}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                Online
                              </span>
                              <p className="text-[10px] text-gray-400 mt-1">
                                {new Date(user.connectedAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-gray-500">No users currently online.</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">System Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">System Uptime</span>
                      <span className="text-sm font-semibold text-green-600">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Database Status</span>
                      <span className="text-sm font-semibold text-green-600">Healthy</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">API Status</span>
                      <span className="text-sm font-semibold text-green-600">Online</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Registered</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {overview?.stats.totalUsers || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
