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
import { Upload } from 'lucide-react';

interface CreateArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (article: {
    title: string;
    category: string;
    status: 'Published' | 'Draft' | 'Scheduled';
    content?: string;
    image?: File;
    useAI?: boolean;
  }) => void;
}

const categories = [
  'Cardiology',
  'Mental Health',
  'Nutrition',
  'Surgery',
  'Endocrinology',
];

const statuses = ['Draft', 'Published', 'Scheduled'];

export function CreateArticleDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateArticleDialogProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Draft');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [useAI, setUseAI] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !category) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit({
      title: title.trim(),
      category,
      status: status as 'Published' | 'Draft' | 'Scheduled',
      content: content.trim(),
      image: image || undefined,
      useAI,
    });

    // Reset form
    setTitle('');
    setCategory('');
    setStatus('Draft');
    setContent('');
    setImage(null);
    setImagePreview('');
    setUseAI(false);
    setLoading(false);
    onOpenChange(false);
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
                  {statuses.map((stat) => (
                    <SelectItem key={stat} value={stat}>
                      {stat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="font-semibold">
              Article Image
            </Label>
            <div className="relative">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {imagePreview ? (
                  <div className="w-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <p className="text-center text-sm text-gray-600 mt-2">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click or drag image here
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="font-semibold">
              Content {useAI && <span className="text-gray-500">(Optional with AI)</span>}
            </Label>
            <Textarea
              id="content"
              placeholder={useAI ? "Content will be generated by AI, or add your own..." : "Write your article content here..."}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              className="min-h-[200px] resize-none"
            />
            <p className="text-xs text-gray-500">
              {content.length} characters
            </p>
          </div>

          {/* AI Generation Checkbox */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Checkbox
              id="useAI"
              checked={useAI}
              onCheckedChange={(checked) => setUseAI(checked as boolean)}
              disabled={loading}
            />
            <Label htmlFor="useAI" className="flex-1 cursor-pointer mb-0">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-900">Generate content with AI</span>
                <span className="text-xs text-gray-600">
                  Let AI generate article content based on your title and category
                </span>
              </div>
            </Label>
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
