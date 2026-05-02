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
import { AlertCircle, Upload, Sparkles, Loader } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/contexts/auth-context';
import { uploadToS3, validateS3Config } from '@/lib/s3-upload';

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
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [useAI, setUseAI] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [s3Uploading, setS3Uploading] = useState(false);
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
      // Handle both camelCase and snake_case depending on how the backend returns it
      setCoverImageUrl(article.coverImageUrl || article.cover_image_url || '');
      setUseAI(article.aiGenerated || false);
      setError('');
    }
  }, [article, open]);

  const handleGenerateWithAI = async () => {
    if (!title.trim() || !category) {
      setError('Please fill in Title and Category before generating content');
      return;
    }

    setAiGenerating(true);
    setError('');

    try {
      console.log('[v0] Generating article with AI:', { title: title.trim(), category });

      const response = await apiClient.generateArticleWithAI({
        title: title.trim(),
        category,
      });

      console.log('[v0] AI generated content:', response);

      setContent(response.content);
      setUseAI(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate content';
      setError(errorMessage);
      console.error('[v0] Error generating content:', err);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!validateS3Config()) {
      setError('AWS S3 configuration missing. Please set NEXT_PUBLIC_AWS_ACCESS_KEY_ID, NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY, and NEXT_PUBLIC_AWS_S3_BUCKET in .env.local');
      return;
    }

    setS3Uploading(true);
    setError('');

    try {
      const url = await uploadToS3(file);
      console.log('[v0] Image uploaded to S3:', url);
      setCoverImageUrl(url);
      setCoverImageFile(file);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      console.error('[v0] Error uploading image:', err);
    } finally {
      setS3Uploading(false);
    }
  };

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
      const articleRequest: any = {
        title: title.trim(),
        category,
        status: status,
        summary: summary.trim(),
        content: content.trim() || (useAI ? 'AI Generated Content' : ''),
        ai_generated: useAI === true,
        author_id: user?.id,
        author_name: user?.fullName || user?.email || 'Anonymous',
        seo_keywords: article?.seoKeywords || article?.seo_keywords || [],
        meta_title: title.trim(),
        meta_description: summary.trim() || title.trim(),
      };

      if (coverImageUrl && coverImageUrl.trim()) {
        articleRequest.cover_image_url = coverImageUrl.trim();
      }

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
      setUseAI(false);
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

          {/* Cover Image */}
          <div className="space-y-2">
            <Label htmlFor="image" className="font-semibold">
              Cover Image (Upload to S3)
            </Label>

            <div className="relative">
              <input
                id="edit-image-file"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                disabled={loading || s3Uploading}
                className="hidden"
              />
              <label
                htmlFor="edit-image-file"
                className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {coverImageUrl ? (
                  <div className="w-full text-center">
                    <img
                      src={coverImageUrl}
                      alt="Cover preview"
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                    <p className="text-sm text-gray-600">
                      {s3Uploading ? 'Uploading...' : 'Click to change image'}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    {s3Uploading ? (
                      <>
                        <Loader className="w-8 h-8 text-blue-600 mx-auto mb-2 animate-spin" />
                        <p className="text-sm text-gray-600">Uploading to S3...</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click or drag image here</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content" className="font-semibold">
                Content {useAI && <span className="text-gray-500">(AI Generated)</span>}
              </Label>
              <button
                type="button"
                onClick={handleGenerateWithAI}
                disabled={!title.trim() || !category || aiGenerating || loading}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {aiGenerating ? (
                  <>
                    <Loader size={14} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Generate with AI
                  </>
                )}
              </button>
            </div>
            <Textarea
              id="content"
              placeholder="Write your article content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading || aiGenerating}
              className="min-h-[250px] resize-none"
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
