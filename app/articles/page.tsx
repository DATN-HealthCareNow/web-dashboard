'use client';

import { Sidebar } from '@/components/sidebar';
import { ArticlesTable } from '@/components/articles/articles-table';
import { Plus } from 'lucide-react';

export default function ArticlesPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Article Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage, edit, and publish medical content and health tips.
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Plus size={20} />
              Create New Article
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <ArticlesTable />
        </div>
      </main>
    </div>
  );
}
