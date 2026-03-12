import { healthReports } from '@/lib/mock-data';
import { Download, ChevronDown } from 'lucide-react';

export function HealthReportsList() {
  return (
    <div className="space-y-4">
      {healthReports.map((report) => (
        <div
          key={report.id}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {report.month} {report.year}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'Stable'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    • {report.status}
                  </span>
                  <span className="text-gray-600 text-sm">
                    Updated {report.updatedDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <Download size={18} />
                PDF
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronDown size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 text-xs font-medium uppercase">Blood Pressure</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {report.metrics.bloodPressure}
              </p>
              <p className="text-gray-600 text-xs mt-2">mmHg</p>
              <p className="text-gray-600 text-xs mt-1">Normal Range</p>
              <div className="mt-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 text-xs font-medium uppercase">Heart Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {report.metrics.heartRate}
              </p>
              <p className="text-gray-600 text-xs mt-2">bpm</p>
              <div className="mt-3 flex items-center gap-1 text-orange-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V10" />
                </svg>
                <span className="text-xs font-medium">-2 bpm month</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 text-xs font-medium uppercase">BMI</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {report.metrics.bmi}
              </p>
              <p className="text-gray-600 text-xs mt-2">Stable</p>
              <div className="mt-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 text-xs font-medium uppercase">Weight</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {report.metrics.weight}
              </p>
              <p className="text-gray-600 text-xs mt-2">kg</p>
              <div className="mt-3 flex items-center gap-1 text-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a2 2 0 004 0v-5a1 1 0 011-1h2a1 1 0 011 1v3a4 4 0 01-4 4h-4a4 4 0 01-4-4v-3z" />
                </svg>
                <span className="text-xs font-medium">+1 kg month</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
