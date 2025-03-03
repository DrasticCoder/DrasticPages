import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { getAllPages } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { PageCard } from '@/components/page-card';
import { PlusCircle } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | DrasticCoder',
};

export default async function AdminPage() {
  const isAuth = isAuthenticated();
  
  if (!isAuth) {
    redirect('/auth');
  }
  
  const pages = await getAllPages();
  
  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Page
          </Button>
        </Link>
      </div>
      
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">All Pages</h2>
          {pages.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((page) => (
                <div key={page.id} className="group relative">
                  <PageCard page={page} showStatus />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link href={`/admin/edit/${page.id}`}>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/admin/delete/${page.id}`}>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-12 text-center">
              <h3 className="text-lg font-medium">No pages yet</h3>
              <p className="mt-2 text-muted-foreground">
                Create your first page to get started
              </p>
              <Link href="/admin/new" className="mt-4 inline-block">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Page
                </Button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}