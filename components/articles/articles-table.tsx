import { articles } from '@/lib/mock-data';
import { Search, SlidersHorizontal } from 'lucide-react';

export function ArticlesTable() {
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
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, author, or ID..."
              className="flex-1 bg-transparent focus:outline-none text-gray-900"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <span>All Categories</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <span>Status: Any</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <span>Sort by: Date</span>
          </button>
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
            {articles.map((article) => (
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
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-900">{article.author.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    article.status === 'Published'
                      ? 'bg-green-100 text-green-800'
                      : article.status === 'Draft'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.status === 'Published' && '● '}
                    {article.status === 'Draft' && '● '}
                    {article.status === 'Scheduled' && '● '}
                    {article.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-900">
                  {article.views.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-gray-600 text-sm">
                  {article.lastModified}
                </td>
                <td className="py-4 px-6">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-gray-600 text-sm">
          Rows per page: <span className="font-medium">10</span>
        </p>
        <p className="text-gray-600 text-sm">
          1-5 of 45
        </p>
      </div>
    </div>
  );
}
