import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { PageEditor } from '@/components/page-editor';

export const metadata = {
  title: 'Create New Page | DrasticCoder',
};

export default function NewPagePage() {
  const isAuth = isAuthenticated();
  
  if (!isAuth) {
    redirect('/auth');
  }
  
  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Create New Page</h1>
      <PageEditor />
    </div>
  );
}