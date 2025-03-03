'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { createPage, updatePage, type Page } from '@/lib/supabase';
import { slugify } from '@/lib/utils';
import { toast } from 'sonner';

interface PageEditorProps {
  page?: Page;
  isEditing?: boolean;
}

export function PageEditor({ page, isEditing = false }: PageEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(page?.title || '');
  const [content, setContent] = useState(page?.content || '');
  const [isPublic, setIsPublic] = useState(page?.is_public || false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing && page) {
        const updatedPage = await updatePage(page.id, {
          title,
          content,
          is_public: isPublic,
        });

        if (updatedPage) {
          toast.success('Page updated successfully');
          router.push(`/admin`);
          router.refresh();
        } else {
          toast.error('Failed to update page');
        }
      } else {
        const slug = slugify(title);
        const newPage = await createPage({
          title,
          slug,
          content,
          is_public: isPublic,
        });

        console.log('newPage:-------------', newPage);

        if (newPage) {
          toast.success('Page created successfully');
          router.push(`/admin`);
          router.refresh();
        } else {
          toast.error('Failed to create page');
        }
      }
    } catch (error) {
      console.error('Error saving page:', error);
      toast.error('An error occurred while saving the page');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter page title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (Markdown)</Label>
        <div className="min-h-[500px] border rounded-md">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || '')}
            height={500}
            preview="edit"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is-public"
          checked={isPublic}
          onCheckedChange={setIsPublic}
        />
        <Label htmlFor="is-public">Make this page public</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Saving...'
            : isEditing
            ? 'Update Page'
            : 'Create Page'}
        </Button>
      </div>
    </form>
  );
}
