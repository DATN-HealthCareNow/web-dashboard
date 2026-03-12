import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Calendar() {
  const daysInMonth = 31;
  const firstDay = 0;
  const calendarDays = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">October 2023</h2>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-lg">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-4">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer ${
                day === null
                  ? ''
                  : day === 5
                  ? 'bg-blue-100 border-2 border-blue-500 text-blue-600'
                  : day === 15
                  ? 'bg-blue-50 border border-gray-200 text-gray-900'
                  : 'bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Day Details */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">Selected: October 5, 2023</p>
        <div className="space-y-2">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-sm font-medium text-gray-900">10:00 ...</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-sm font-medium text-gray-900">02:00 ...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
