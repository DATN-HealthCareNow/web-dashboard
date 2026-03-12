export function TopPerformingPlans() {
  const plans = [
    { name: 'Annual Family Plan', revenue: '$124k', subscribers: '435 new subscribers' },
    { name: 'Monthly Premium', revenue: '$86k', subscribers: '890 new subscribers' },
    { name: 'Telehealth Add-on', revenue: '$12k', subscribers: '' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Top Performing Plans</h2>
      
      <div className="space-y-4">
        {plans.map((plan, index) => (
          <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0">
            <p className="font-semibold text-gray-900">{plan.name}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{plan.revenue}</p>
            {plan.subscribers && (
              <p className="text-xs text-gray-600 mt-2">{plan.subscribers}</p>
            )}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${50 + index * 15}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
