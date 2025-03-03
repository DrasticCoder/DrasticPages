import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { type Page } from '@/lib/supabase';

interface PageCardProps {
  page: Page;
  showStatus?: boolean;
}

export function PageCard({ page, showStatus = false }: PageCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/${page.slug}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle className="line-clamp-1 text-xl">{page.title}</CardTitle>
            {showStatus && (
              <Badge variant={page.is_public ? "default" : "outline"}>
                {page.is_public ? "Public" : "Private"}
              </Badge>
            )}
          </div>
          <CardDescription className="flex items-center gap-1 text-xs">
            <span>{formatDate(page.created_at)}</span>
            <span className="text-muted-foreground">•</span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {page.views}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {page.content.replace(/[#*`]/g, '').substring(0, 150)}...
          </p>
        </CardContent>
        <CardFooter className="pt-0">
          <p className="text-sm text-primary">Read more →</p>
        </CardFooter>
      </Link>
    </Card>
  );
}