'use client';

import { useState, useMemo } from 'react';
import { Search, Edit2, Send, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ArticlesTableProps {
  articles?: any[];
  onEdit?: (article: any) => void;
  onPublish?: (article: any) => void;
}

export function ArticlesTable({ articles = [], onEdit, onPublish }: ArticlesTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const uniqueCategories = useMemo(() => {
    const cats = new Set(articles.map(a => a.category).filter(Boolean));
    return Array.from(cats);
  }, [articles]);

  const filteredAndSortedArticles = useMemo(() => {
    let result = [...articles];

    // Search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(article => 
        (article.title && article.title.toLowerCase().includes(lowerSearch)) ||
        (article.author_name && article.author_name.toLowerCase().includes(lowerSearch)) ||
        (article.id && article.id.toString().toLowerCase().includes(lowerSearch))
      );
    }

    // Category filter
    if (categoryFilter !== 'All') {
      result = result.filter(article => article.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter(article => article.status === statusFilter);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'Date') {
        const dateA = new Date(a.updated_at || a.created_at || 0).getTime();
        const dateB = new Date(b.updated_at || b.created_at || 0).getTime();
        return dateB - dateA; // Descending
      } else if (sortBy === 'Title') {
        const titleA = a.title || '';
        const titleB = b.title || '';
        return titleA.localeCompare(titleB);
      } else if (sortBy === 'Views') {
        const viewsA = a.views || 0;
        const viewsB = b.views || 0;
        return viewsB - viewsA; // Descending
      }
      return 0;
    });

    return result;
  }, [articles, searchTerm, categoryFilter, statusFilter, sortBy]);

  // Pagination logic
  const totalItems = filteredAndSortedArticles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const displayArticles = filteredAndSortedArticles.slice(startIndex, endIndex);

  // Reset to page 1 if filters change and current page is out of bounds
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const getCategoryColor = (category: string) => {
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
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Search and Filter */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, author, or ID..."
              className="flex-1 bg-transparent focus:outline-none text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em 1em', paddingRight: '2.5rem' }}
          >
            <option value="All">All Categories</option>
            {uniqueCategories.map(cat => (
              <option key={cat as string} value={cat as string}>{cat as string}</option>
            ))}
          </select>

          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em 1em', paddingRight: '2.5rem' }}
          >
            <option value="All">Status: Any</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="REVIEW">Review</option>
          </select>

          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em 1em', paddingRight: '2.5rem' }}
          >
            <option value="Date">Sort by: Date</option>
            <option value="Title">Sort by: Title</option>
            <option value="Views">Sort by: Views</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Article Title
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Category
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Author
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Views
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Last Modified
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayArticles.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 px-6 text-center text-gray-500">
                  No articles found. Create your first article to get started.
                </td>
              </tr>
            ) : (
              displayArticles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900">{article.title}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{article.author_name}</span>
                  </td>
                  <td className="py-4 px-6">
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
                  </td>
                  <td className="py-4 px-6 text-gray-900">
                    {article.views.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">
                    {article.updated_at
                      ? new Date(article.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'N/A'}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/articles/${article.id}`}
                        className="text-gray-600 hover:text-gray-700 font-medium text-sm flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Eye size={16} />
                        View
                      </Link>
                      <button
                        onClick={() => onEdit?.(article)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      {article.status !== 'PUBLISHED' && (
                        <button
                          onClick={() => onPublish?.(article)}
                          className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-green-50 transition-colors"
                        >
                          <Send size={16} />
                          Publish
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-gray-600 text-sm">
          Rows per page: <span className="font-medium">{itemsPerPage}</span>
        </p>
        <div className="flex items-center gap-4">
          <p className="text-gray-600 text-sm">
            {totalItems === 0 ? '0-0 of 0' : `${startIndex + 1}-${endIndex} of ${totalItems}`}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
