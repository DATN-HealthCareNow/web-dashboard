'use client';

import { useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, AlertCircle, Sparkles, Loader } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/contexts/auth-context';
import { uploadToS3, validateS3Config } from '@/lib/s3-upload';

interface CreateArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (article: any) => void;
}

const categories = [
  "Disease",
  "Nutrition",
  "Lifestyle",
  "Medication",
  "Medical Knowledge"
];

const statuses = ['Draft', 'Published', 'Scheduled'];

export function CreateArticleDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateArticleDialogProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [useAI, setUseAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [s3Uploading, setS3Uploading] = useState(false);
  const [error, setError] = useState('');

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

      // Set the generated content
      setContent(response.content);

      // Mark as AI generated - this is important!
      setUseAI(true);

      console.log('[v0] Content set, aiGenerated will be true on submit');
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
      console.log("---------------");
      console.log(url);
      console.log(file);
      console.log("---------------");
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
        status: status, // DRAFT, REVIEW, SCHEDULED, PUBLISHED
        summary: summary.trim(),
        content: content.trim() || (useAI ? 'AI Generated Content' : ''),
        aiGenerated: useAI === true, // Ensure it's always true when AI was used
        authorId: user?.id,
        authorName: user?.email || 'Anonymous',
        seoKeywords: [],
        metaTitle: title.trim(),
        metaDescription: summary.trim() || title.trim(),
        cover_image_url: coverImageUrl.trim(),
      };

      // Add coverImageUrl only if it has a value
      if (coverImageUrl && coverImageUrl.trim()) {
        articleRequest.coverImageUrl = coverImageUrl.trim();
      }

      console.log('[v0] Article request:', articleRequest);

      // Call the API to create the article
      const response = await apiClient.createArticle(articleRequest);

      console.log('[v0] Article created successfully:', response);

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
      const errorMessage = err instanceof Error ? err.message : 'Failed to create article';
      setError(errorMessage);
      console.error('[v0] Error creating article:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Article</DialogTitle>
          <DialogDescription>
            Add a new medical article or health tip to your knowledge base.
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
              placeholder="e.g., 10 Tips for Heart Health"
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
                id="image-file"
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
                htmlFor="image-file"
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
              {loading ? 'Creating...' : 'Create Article'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
