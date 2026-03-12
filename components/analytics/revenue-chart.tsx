'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 3200 },
  { month: 'Feb', revenue: 2800 },
  { month: 'Mar', revenue: 3500 },
  { month: 'Apr', revenue: 3100 },
  { month: 'May', revenue: 3800 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3600 },
  { month: 'Aug', revenue: 2900 },
  { month: 'Sep', revenue: 3400 },
  { month: 'Oct', revenue: 3900 },
  { month: 'Nov', revenue: 4100 },
  { month: 'Dec', revenue: 3700 },
];

export function RevenueChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Monthly Revenue Trends</h2>
        <p className="text-3xl font-bold text-gray-900 mt-2">$4.2M</p>
        <p className="text-green-600 font-medium mt-1">+8.5% YTD</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#f3f4f6',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#2563eb" 
              strokeWidth={2}
              fill="#dbeafe"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
        <button className="text-gray-600 hover:text-gray-900 font-medium">12M</button>
        <button className="text-blue-600 font-medium">6M</button>
        <button className="text-gray-600 hover:text-gray-900 font-medium">30D</button>
      </div>
    </div>
  );
}
