'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/sidebar';
import { ArticlesTable } from '@/components/articles/articles-table';
import { CreateArticleDialog } from '@/components/articles/create-article-dialog';
import { EditArticleDialog } from '@/components/articles/edit-article-dialog';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default function ArticlesPage() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getArticles();
        console.log('[v0] Fetched articles:', data);
        setArticles(data);
      } catch (error) {
        console.error('[v0] Error fetching articles:', error);
        // You can show a toast notification here
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleCreateArticle = async (article: any) => {
    // Article has already been created via API in the dialog
    // Just add it to the local state for immediate UI update
    setArticles([article, ...articles]);
    setOpenCreateDialog(false);

    // Show success message
    const message = document.createElement('div');
    message.className =
      'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    const aiNote = article.aiGenerated ? ' (AI-generated)' : '';
    message.textContent = `Article "${article.title}"${aiNote} created successfully!`;
    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 3000);
  };

  const handleEditClick = (article: any) => {
    setSelectedArticle(article);
    setOpenEditDialog(true);
  };

  const handleUpdateArticle = (updatedArticle: any) => {
    // Update the article in the list
    setArticles(articles.map(a => a.id === updatedArticle.id ? updatedArticle : a));
    setOpenEditDialog(false);
    setSelectedArticle(null);

    // Show success message
    const message = document.createElement('div');
    message.className =
      'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    message.textContent = `Article "${updatedArticle.title}" updated successfully!`;
    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 3000);
  };

  const handlePublishArticle = async (article: any) => {
    try {
      const response = await apiClient.publishArticle(article.id);
      console.log('[v0] Article published:', response);

      // Update the article in the list
      setArticles(articles.map(a => a.id === article.id ? response : a));

      // Show success message
      const message = document.createElement('div');
      message.className =
        'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      message.textContent = `Article "${article.title}" published successfully!`;
      document.body.appendChild(message);

      setTimeout(() => {
        message.remove();
      }, 3000);
    } catch (error) {
      console.error('[v0] Error publishing article:', error);
      const message = document.createElement('div');
      message.className =
        'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      message.textContent = `Failed to publish article: ${error instanceof Error ? error.message : 'Unknown error'}`;
      document.body.appendChild(message);

      setTimeout(() => {
        message.remove();
      }, 3000);
    }
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
                {loading ? 'Loading articles...' : `Manage, edit, and publish medical content and health tips. (${articles.length} articles)`}
              </p>
            </div>
            <Button
              onClick={() => setOpenCreateDialog(true)}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Plus size={20} />
              Create New Article
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="ml-2 text-gray-600">Loading articles...</span>
            </div>
          ) : (
            <ArticlesTable 
              articles={articles}
              onEdit={handleEditClick}
              onPublish={handlePublishArticle}
            />
          )}
        </div>

        {/* Create Article Dialog */}
        <CreateArticleDialog
          open={openCreateDialog}
          onOpenChange={setOpenCreateDialog}
          onSubmit={handleCreateArticle}
        />

        {/* Edit Article Dialog */}
        <EditArticleDialog
          open={openEditDialog}
          onOpenChange={setOpenEditDialog}
          article={selectedArticle}
          onSubmit={handleUpdateArticle}
        />
      </main>
    </div>
  );
}
