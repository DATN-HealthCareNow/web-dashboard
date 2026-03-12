'use client';

import { Sidebar } from '@/components/sidebar';
import { RevenueCards } from '@/components/analytics/revenue-cards';
import { RevenueChart } from '@/components/analytics/revenue-chart';
import { SubscriptionTiers } from '@/components/analytics/subscription-tiers';
import { RecentTransactions } from '@/components/analytics/recent-transactions';
import { TopPerformingPlans } from '@/components/analytics/top-performing-plans';
import { Download } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Revenue Analytics
              </h1>
              <p className="text-gray-600 mt-1">
                Financial performance and subscription metrics
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                📅 Oct 2023
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                <Download size={18} />
                Export Report
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-6">
          <RevenueCards />
          
          <div className="grid grid-cols-2 gap-6">
            <RevenueChart />
            <SubscriptionTiers />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <RecentTransactions />
            </div>
            <div>
              <TopPerformingPlans />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
