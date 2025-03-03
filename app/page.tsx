import { getPublicPages } from '@/lib/supabase';
import { PageCard } from '@/components/page-card';

export const revalidate = 60;

export default async function Home() {
  const pages = await getPublicPages();

  return (
    <div className="container py-12">
      <section className="mb-12 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Hi, I'm DrasticCoder
        </h1>
        <p className="text-xl text-muted-foreground">
          Welcome to my personal blog where I share my thoughts, code snippets, and experiences.
          I'm a passionate developer who loves to explore new technologies and share knowledge.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold tracking-tight">Latest Pages</h2>
        {pages.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <h3 className="text-lg font-medium">No pages yet</h3>
            <p className="mt-2 text-muted-foreground">
              Check back soon for new content!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}