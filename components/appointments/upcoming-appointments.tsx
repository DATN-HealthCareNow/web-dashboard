import { appointments } from '@/lib/mock-data';

export function UpcomingAppointments() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Upcoming</h2>
        <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          See all
        </a>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <img
                src={appointment.doctorAvatar}
                alt={appointment.doctorName}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{appointment.doctorName}</p>
                <p className="text-gray-600 text-sm">{appointment.specialty}</p>
                <div className="flex items-center gap-2 mt-2 text-blue-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-.707.707a1 1 0 101.414 1.414L9 9.414V6z" />
                  </svg>
                  <span className="text-sm font-medium">{appointment.time}</span>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
