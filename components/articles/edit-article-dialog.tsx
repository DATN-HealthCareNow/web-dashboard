'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/contexts/auth-context';

interface EditArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: any | null;
  onSubmit: (article: any) => void;
}

const categories = [
  "Disease",
  "Nutrition",
  "Lifestyle",
  "Medication",
  "Medical Knowledge"
];

export function EditArticleDialog({
  open,
  onOpenChange,
  article,
  onSubmit,
}: EditArticleDialogProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form with article data when dialog opens
  useEffect(() => {
    if (article && open) {
      setTitle(article.title || '');
      setCategory(article.category || '');
      setStatus(article.status || 'DRAFT');
      setSummary(article.summary || '');
      setContent(article.content || '');
      setCoverImageUrl(article.coverImageUrl || '');
      setError('');
    }
  }, [article, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !category) {
      setError('Please fill in all required fields: Title and Category');
      return;
    }

    setLoading(true);

    try {
      // Build the request according to ArticleUpsertRequest DTO
      const articleRequest = {
        title: title.trim(),
        category,
        status: status,
        summary: summary.trim(),
        content: content.trim(),
        coverImageUrl: coverImageUrl.trim() || undefined,
        authorId: user?.id,
        authorName: user?.email || 'Anonymous',
        seoKeywords: article?.seoKeywords || [],
        metaTitle: title.trim(),
        metaDescription: summary.trim() || title.trim(),
      };

      // Call the API to update the article
      const response = await apiClient.updateArticle(article.id, articleRequest);

      console.log('[v0] Article updated successfully:', response);

      // Call the callback with the response
      onSubmit(response);

      // Reset form
      setTitle('');
      setCategory('');
      setStatus('DRAFT');
      setSummary('');
      setContent('');
      setCoverImageUrl('');
      setError('');
      onOpenChange(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update article';
      setError(errorMessage);
      console.error('[v0] Error updating article:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Article</DialogTitle>
          <DialogDescription>
            Update article details and content
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="font-semibold">
              Article Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="font-semibold">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" disabled={loading}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="font-semibold">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" disabled={loading}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="REVIEW">Review</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary" className="font-semibold">
              Summary
            </Label>
            <Input
              id="summary"
              placeholder="Brief summary of the article"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Cover Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image" className="font-semibold">
              Cover Image URL
            </Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              disabled={loading}
              type="url"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="font-semibold">
              Content
            </Label>
            <Textarea
              id="content"
              placeholder="Write your article content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              className="min-h-[200px] resize-none"
            />
            <p className="text-xs text-gray-500">
              {content.length} characters
            </p>
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Article'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
