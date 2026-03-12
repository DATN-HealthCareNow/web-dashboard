import { Lock } from 'lucide-react';

const notes = [
  {
    doctorName: 'Dr. Sarah Smith',
    date: 'Oct 15',
    note: 'Patient shows improved BP levels. Maintain current medication dosage for another month.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=smith',
  },
  {
    doctorName: 'Dr. James Wilson',
    date: 'Sep 28',
    note: 'Cholesterol levels are slightly high. Recommended dietary adjustments and light cardio.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wilson',
  },
  {
    doctorName: 'Dr. Sarah Smith',
    date: 'Aug 12',
    note: 'Annual checkup complete. All vitals are within normal range.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=smith2',
  },
];

export function DoctorsNotes() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Doctor's Notes</h2>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Lock size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note, index) => (
          <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0">
            <div className="flex items-start gap-3">
              <img
                src={note.avatar}
                alt={note.doctorName}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{note.doctorName}</p>
                <p className="text-gray-600 text-sm">{note.date}</p>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  {note.note}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 text-blue-600 hover:text-blue-700 font-medium text-sm">
        View All Notes
      </button>
    </div>
  );
}
