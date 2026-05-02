'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Edit2, Share2, Eye } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // Fetch the specific article
        const articles = await apiClient.getArticles();
        const found = articles.find((a: any) => a.id === articleId);
        
        if (!found) {
          setError('Article not found');
          return;
        }

        setArticle(found);
      } catch (err) {
        console.error('[v0] Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-gray-600">Loading article...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
          <header className="bg-white border-b border-gray-200 px-8 py-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back
            </Button>
          </header>
          <div className="p-8 text-center">
            <p className="text-red-600">{error || 'Article not found'}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => router.push('/articles')}>
                <Edit2 size={16} />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}>
                <Share2 size={16} />
                Share
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <article className="max-w-4xl mx-auto p-8">
          {/* Cover Image */}
          {article.cover_image_url && (
            <div className="mb-8 rounded-lg overflow-hidden bg-gray-200 h-96">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                article.status === 'PUBLISHED'
                  ? 'bg-green-100 text-green-800'
                  : article.status === 'DRAFT'
                  ? 'bg-gray-100 text-gray-800'
                  : article.status === 'REVIEW'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {article.status}
              </span>
              {article.aiGenerated && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  AI Generated
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

            {article.summary && (
              <p className="text-xl text-gray-600 mb-6">{article.summary}</p>
            )}

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-t border-b border-gray-200 py-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Category:</span>
                <span>{article.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{article.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Author:</span>
                <span>{article.authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Last Updated:</span>
                <span>
                  {new Date(article.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-gray-800 leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Meta Information */}
          <div className="bg-gray-100 rounded-lg p-6 mt-12">
            <h3 className="font-semibold text-gray-900 mb-4">SEO Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Meta Title</p>
                <p className="text-gray-900">{article.metaTitle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Meta Description</p>
                <p className="text-gray-900">{article.metaDescription}</p>
              </div>
              {article.seoKeywords && article.seoKeywords.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600">Keywords</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {article.seoKeywords.map((keyword: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
