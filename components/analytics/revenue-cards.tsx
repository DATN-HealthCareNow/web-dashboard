import { revenueMetrics } from '@/lib/mock-data';
import { TrendingUp } from 'lucide-react';

export function RevenueCards() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {revenueMetrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
            </div>
            <div className="text-2xl">{metric.icon}</div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-green-600">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">{metric.change}</span>
            <span className="text-gray-600 text-sm">vs. last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
