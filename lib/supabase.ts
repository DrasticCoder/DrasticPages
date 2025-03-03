import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Page = {
  id: string;
  slug: string;
  title: string;
  content: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  views: number;
};

export async function getPublicPages(): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching public pages:', error);
    return [];
  }

  return data || [];
}

export async function getAllPages(): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all pages:', error);
    return [];
  }

  return data || [];
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (slug === 'favicon.ico') {
    return null;
  }
  
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }

  return data;
}

export async function incrementPageViews(slug: string): Promise<void> {
  const { error } = await supabase.rpc('increment_page_views', { page_slug: slug });
  
  if (error) {
    console.error(`Error incrementing views for page ${slug}:`, error);
  }
}

export async function createPage(page: Omit<Page, 'id' | 'created_at' | 'updated_at' | 'views'>): Promise<Page | null> {
  const { data, error } = await supabase
    .from('pages')
    .insert([page])
    .select()
    .single();

  if (error) {
    console.error('Error creating page:', error);
    return null;
  }

  return data;
}

export async function updatePage(id: string, updates: Partial<Omit<Page, 'id' | 'created_at' | 'updated_at'>>): Promise<Page | null> {
  const { data, error } = await supabase
    .from('pages')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating page ${id}:`, error);
    return null;
  }

  return data;
}

export async function deletePage(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting page ${id}:`, error);
    return false;
  }

  return true;
}