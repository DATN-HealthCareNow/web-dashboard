'use client';

import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Family Premium', value: 55 },
  { name: 'Individual Monthly', value: 30 },
  { name: 'Free Tier', value: 15 },
];

const COLORS = ['#2563eb', '#0ea5e9', '#cbd5e1'];

export function SubscriptionTiers() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Subscription Tiers</h2>
      
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-900">12.4k</p>
          <p className="text-gray-600 mt-1">Total Users</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <span className="text-gray-900">Family Premium</span>
          <span className="ml-auto font-bold">55%</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
          <span className="text-gray-900">Individual Monthly</span>
          <span className="ml-auto font-bold">30%</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-slate-300"></div>
          <span className="text-gray-900">Free Tier</span>
          <span className="ml-auto font-bold">15%</span>
        </div>
      </div>
    </div>
  );
}
