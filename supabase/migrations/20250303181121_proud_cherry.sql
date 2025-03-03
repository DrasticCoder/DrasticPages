/*
  # Create function to increment page views

  1. New Functions
    - `increment_page_views` - Safely increments the view count for a page by slug
*/

CREATE OR REPLACE FUNCTION increment_page_views(page_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE pages
  SET views = views + 1
  WHERE slug = page_slug;
END;
$$ LANGUAGE plpgsql;