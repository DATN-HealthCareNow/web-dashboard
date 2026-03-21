'use client';

import { Sidebar } from '@/components/sidebar';
import { HealthReportsList } from '@/components/reports/health-reports-list';
import { DoctorsNotes } from '@/components/reports/doctors-notes';
import { ChevronDown } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Health Reports Archive
          </h1>
          <p className="text-gray-600 mt-1">
            Showing records from Jan 2023 to Oct 2023
          </p>
        </header>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Reports Section */}
            <div className="col-span-2 space-y-6">
              {/* Filter */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Filter by Date Range</h3>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.726-1.47M6 20H4a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2h-2.172a4 4 0 00-2.814 1.19l-1.6 1.6a1 1 0 01-1.414 0l-1.6-1.6a4 4 0 00-2.814-1.19z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Select date range (e.g., last 6 months)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
              </div>

              <HealthReportsList />
            </div>

            {/* Doctors Notes Section */}
            <div>
              <DoctorsNotes />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
