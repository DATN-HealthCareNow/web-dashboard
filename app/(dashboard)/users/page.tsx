'use client';

import { Sidebar } from '@/components/sidebar';
import { UsersTable } from '@/components/users/users-table';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const router = useRouter();
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                User Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage access, roles, and status for all registered users.
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <UsersTable />
        </div>
      </main>
    </div>
  );
}
