export function UserDistributionMap() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">User Distribution Map</h2>
        <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View Full Report
        </a>
      </div>
      
      <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-6xl font-light text-gray-400 mb-2">
            300 × 300
          </div>
          <p className="text-gray-500">Interactive map will be displayed here</p>
        </div>
      </div>

      {/* Top Region */}
      <div className="mt-4 bg-blue-50 rounded-lg p-3">
        <p className="text-gray-700 font-medium">TOP REGION</p>
        <p className="text-lg font-bold text-gray-900">North America <span className="text-blue-600">42%</span></p>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
        </div>
      </div>
    </div>
  );
}
