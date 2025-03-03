import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, incrementPageViews, getAllPages } from '@/lib/supabase';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { TableOfContents } from '@/components/table-of-contents';
import { extractHeadings, formatDate } from '@/lib/utils';
import { Eye } from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);

  if (!page || !page.is_public) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${page.title} | DrasticCoder`,
    description: page.content.substring(0, 160),
  };
}

export async function generateStaticParams() {
  const pages = await getAllPages(); // Fetch an array of pages with at least a slug property
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const page = await getPageBySlug(params.slug);

  if (!page || !page.is_public) {
    notFound();
  }

  // Increment page views
  await incrementPageViews(params.slug);

  const headings = extractHeadings(page.content);

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_250px]">
        <div>
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {page.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <time dateTime={page.created_at}>
                {formatDate(page.created_at)}
              </time>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{page.views} views</span>
              </div>
            </div>
          </div>

          <MarkdownRenderer content={page.content} />
        </div>

        <div className="hidden md:block">
          <div className="sticky top-20">
            <TableOfContents headings={headings} />
          </div>
        </div>
      </div>
    </div>
  );
}
