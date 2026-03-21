'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { ArticlesTable } from '@/components/articles/articles-table';
import { CreateArticleDialog } from '@/components/articles/create-article-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ArticlesPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);

  const handleCreateArticle = (articleData: {
    title: string;
    category: string;
    status: 'Published' | 'Draft' | 'Scheduled';
    content?: string;
  }) => {
    const newArticle = {
      id: String(Date.now()),
      title: articleData.title,
      category: articleData.category,
      categoryColor: getCategoryColor(articleData.category),
      author: {
        name: 'Current User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser',
      },
      status: articleData.status,
      views: 0,
      lastModified: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    setArticles([newArticle, ...articles]);

    // Show success message
    const message = document.createElement('div');
    message.className =
      'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    message.textContent = `Article "${articleData.title}" created successfully!`;
    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 3000);
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      Cardiology: 'text-blue-600',
      'Mental Health': 'text-purple-600',
      Nutrition: 'text-green-600',
      Surgery: 'text-orange-600',
      Endocrinology: 'text-blue-700',
    };
    return colors[category] || 'text-gray-600';
  };

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
            <Button
              onClick={() => setOpenDialog(true)}
              className="flex items-center gap-2"
            >
              <Plus size={20} />
              Create New Article
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <ArticlesTable newArticles={articles} />
        </div>

        {/* Create Article Dialog */}
        <CreateArticleDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          onSubmit={handleCreateArticle}
        />
      </main>
    </div>
  );
}
