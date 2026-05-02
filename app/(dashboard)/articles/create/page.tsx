'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
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
import { AlertCircle, Sparkles, Loader, Cloud, RefreshCw, Edit2, Save, User, Box, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/contexts/auth-context';
import { uploadToS3, validateS3Config } from '@/lib/s3-upload';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const categories = [
  "Disease",
  "Nutrition",
  "Lifestyle",
  "Medication",
  "Medical Knowledge"
];

export default function CreateArticlePage() {
  const router = useRouter();
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
  const [isEditingContent, setIsEditingContent] = useState(true);

  const handleGenerateWithAI = async () => {
    if (!title.trim() || !category) {
      setError('Please fill in Title and Category before generating content');
      return;
    }

    setAiGenerating(true);
    setError('');

    try {
      const response = await apiClient.generateArticleWithAI({
        title: title.trim(),
        category,
      });

      setContent(response.content);
      setUseAI(true);
      setIsEditingContent(false);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate content';
      setError(errorMessage);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!validateS3Config()) {
      setError('AWS S3 configuration missing. Please check .env.local');
      return;
    }

    setS3Uploading(true);
    setError('');

    try {
      const url = await uploadToS3(file);
      setCoverImageUrl(url);
      setCoverImageFile(file);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
    } finally {
      setS3Uploading(false);
    }
  };

  const handleSubmit = async () => {
    setError('');

    if (!title.trim() || !category) {
      setError('Please fill in all required fields: Title and Category');
      return;
    }

    setLoading(true);

    try {
      const articleRequest: any = {
        title: title.trim(),
        category,
        status: status,
        summary: summary.trim(),
        content: content.trim() || (useAI ? 'AI Generated Content' : ''),
        ai_generated: useAI === true,
        author_id: user?.id,
        author_name: user?.fullName || user?.email || 'Anonymous',
        seo_keywords: [],
        meta_title: title.trim(),
        meta_description: summary.trim() || title.trim(),
        cover_image_url: coverImageUrl.trim(),
      };

      if (coverImageUrl && coverImageUrl.trim()) {
        articleRequest.cover_image_url = coverImageUrl.trim();
      }

      await apiClient.createArticle(articleRequest);

      // Show success message
      const message = document.createElement('div');
      message.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      message.textContent = `Article created successfully!`;
      document.body.appendChild(message);

      setTimeout(() => {
        message.remove();
      }, 3000);

      // Redirect back to articles list
      router.push('/articles');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create article';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen pb-12">
        <header className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Link href="/articles" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create New Article
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Use AI to generate content or write manually.
              </p>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-6">
          {/* TOP PANEL: AI Content Brief */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0">
            {aiGenerating ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-purple-400 font-medium">AI is generating your content...</p>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-bold text-gray-900">AI Content Brief</h2>
                </div>
                
                <div className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  {/* Title & Category Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-1.5">
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Title</Label>
                      <Input 
                        placeholder="Nhập tiêu đề bài viết..." 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>
                    <div className="col-span-1 space-y-1.5">
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="bg-gray-50 border-gray-200">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Outline / Summary */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Content Outline / Ideas</Label>
                    <Textarea 
                      placeholder="Nhập nội dung mô tả hoặc ý tưởng..." 
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="bg-gray-50 border-gray-200 min-h-[80px] resize-none"
                    />
                  </div>

                  {/* Status and Image Row */}
                  <div className="grid grid-cols-3 gap-4 items-end">
                    <div className="col-span-1 space-y-1.5">
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="bg-gray-50 border-gray-200">
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
                    
                    <div className="col-span-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          id="image-file-ai"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                          disabled={s3Uploading}
                          className="hidden"
                        />
                        <label htmlFor="image-file-ai" className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                            {s3Uploading ? <Loader className="w-4 h-4 animate-spin text-gray-500" /> : <ImageIcon className="w-4 h-4 text-gray-500" />}
                            <span className="text-sm text-gray-600 font-medium">
                              {coverImageUrl ? 'Change Cover Image' : 'Upload Cover Image'}
                            </span>
                          </div>
                        </label>
                        {coverImageUrl && (
                          <img src={coverImageUrl} alt="Preview" className="w-10 h-10 object-cover rounded-md border border-gray-200" />
                        )}
                      </div>

                      <Button 
                        onClick={handleGenerateWithAI}
                        disabled={!title.trim() || !category || aiGenerating}
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0 shadow-sm"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate with AI
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* BOTTOM PANEL: Draft / Editor */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col flex-1 min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                {aiGenerating ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-purple-600 animate-spin" />
                    <span className="font-semibold text-gray-900">Generating Draft</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${status === 'PUBLISHED' ? 'bg-green-500' : 'bg-blue-500'}`} />
                      <span className="text-sm font-semibold text-gray-700 capitalize">{status.toLowerCase()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Cloud className="w-4 h-4" />
                      <span className="text-xs">Saved locally</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {aiGenerating ? (
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-blue-400 w-1/2 animate-pulse" />
                  </div>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={handleGenerateWithAI} disabled={!title.trim() || !category || aiGenerating} className="text-gray-600">
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                      Regenerate
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditingContent(!isEditingContent)} className="text-gray-600">
                      <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                      {isEditingContent ? 'Preview' : 'Edit'}
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading} size="sm" className="bg-violet-700 hover:bg-violet-800 text-white">
                      {loading ? <Loader className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 flex-1">
              {aiGenerating ? (
                <div className="space-y-6 animate-pulse max-w-3xl mx-auto">
                  <div className="w-3/4 h-12 bg-gray-100 rounded-lg" />
                  <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-200" />
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-gray-100 rounded" />
                    <div className="w-full h-4 bg-gray-100 rounded" />
                    <div className="w-5/6 h-4 bg-gray-100 rounded" />
                  </div>
                </div>
              ) : isEditingContent ? (
                <Textarea
                  placeholder="Start writing your article content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full min-h-[400px] border border-gray-200 rounded-xl p-6 focus-visible:ring-1 focus-visible:ring-purple-500 text-gray-700 text-base resize-none"
                />
              ) : (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>{user?.fullName || user?.email || 'HealthCareNow AI'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Box className="w-4 h-4" />
                      <span>{category || 'Uncategorized'}</span>
                    </div>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                    {title || 'Untitled Article'}
                  </h1>

                  {coverImageUrl ? (
                    <img src={coverImageUrl} alt="Cover" className="w-full max-h-[400px] object-cover rounded-xl shadow-sm" />
                  ) : (
                    <div className="w-full h-48 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 bg-gray-50">
                      <span className="text-sm">No cover image</span>
                    </div>
                  )}

                  <div className="prose max-w-none text-gray-700 leading-relaxed">
                    {content ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                      </ReactMarkdown>
                    ) : (
                      <span className="text-gray-400 italic">No content yet. Click Edit to start writing or use AI to generate.</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
