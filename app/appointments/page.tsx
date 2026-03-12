'use client';

import { Sidebar } from '@/components/sidebar';
import { Calendar } from '@/components/appointments/calendar';
import { UpcomingAppointments } from '@/components/appointments/upcoming-appointments';
import { Plus } from 'lucide-react';

export default function AppointmentsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Appointments
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your schedule and view upcoming consultations.
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Plus size={20} />
              Book New Appointment
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-6">
            <Calendar />
            <UpcomingAppointments />
          </div>
        </div>
      </main>
    </div>
  );
}
