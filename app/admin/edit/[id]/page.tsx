import { redirect, notFound } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getAllPages } from '@/lib/supabase';
import { PageEditor } from '@/components/page-editor';

export const metadata = {
  title: 'Edit Page | DrasticCoder',
};

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditPagePage({ params }: EditPageProps) {
  const isAuth = isAuthenticated();
  
  if (!isAuth) {
    redirect('/auth');
  }
  
  const pages = await getAllPages();
  const page = pages.find((p) => p.id === params.id);
  
  if (!page) {
    notFound();
  }
  
  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Edit Page</h1>
      <PageEditor page={page} isEditing />
    </div>
  );
}