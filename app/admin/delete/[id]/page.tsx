"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePage, getPageBySlug, type Page } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface DeletePageProps {
  params: {
    id: string;
  };
}

export default function DeletePagePage({ params }: DeletePageProps) {
  const router = useRouter();
  const [page, setPage] = useState<Page | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      // This is a client component, so we need to fetch the page data
      const response = await fetch(`/api/pages/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setPage(data.page);
      } else {
        router.push('/admin');
      }
    };

    fetchPage();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (!page) return;
    
    setIsDeleting(true);
    
    try {
      const success = await deletePage(page.id);
      
      if (success) {
        toast.success('Page deleted successfully');
        router.push('/admin');
        router.refresh();
      } else {
        toast.error('Failed to delete page');
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      toast.error('An error occurred while deleting the page');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!page) {
    return (
      <div className="container flex items-center justify-center py-12">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Delete Page</CardTitle>
          <CardDescription>
            Are you sure you want to delete this page? This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{page.title}</p>
          <p className="text-sm text-muted-foreground">
            {page.content.substring(0, 100)}...
          </p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push('/admin')}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}