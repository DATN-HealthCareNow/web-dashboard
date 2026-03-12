import { Filter, Download } from 'lucide-react';

export function ActivityLogs() {
  const logs = [
    {
      timestamp: '10:42 AM',
      user: 'Dr. Sarah Smith',
      userId: '#DOC-892',
      action: 'Updated Patient Record',
      status: 'Success',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      timestamp: '10:40 AM',
      user: 'System Auto-Bot',
      userId: '',
      action: 'API Latency Check',
      status: 'Warning',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      timestamp: '10:35 AM',
      user: 'Nurse J. Doe',
      userId: '#NUR-114',
      action: 'Discharge Summary',
      status: 'Success',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      timestamp: '10:28 AM',
      user: 'Admin User',
      userId: '',
      action: 'User Permission Edit',
      status: 'Success',
      statusColor: 'bg-green-100 text-green-800',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Recent System Activity Logs</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Timestamp
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                User / ID
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Action Type
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{log.timestamp}</td>
                <td className="py-3 px-4">
                  <div className="text-gray-900">{log.user}</div>
                  {log.userId && (
                    <div className="text-xs text-gray-500">{log.userId}</div>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-900">{log.action}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${log.statusColor}`}>
                    {log.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
