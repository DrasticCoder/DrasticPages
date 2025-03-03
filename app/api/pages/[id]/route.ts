import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getPageBySlug, getAllPages } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const isAuth = isAuthenticated();
  
  if (!isAuth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const pages = await getAllPages();
  const page = pages.find((p) => p.id === params.id);
  
  if (!page) {
    return NextResponse.json(
      { error: 'Page not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ page });
}