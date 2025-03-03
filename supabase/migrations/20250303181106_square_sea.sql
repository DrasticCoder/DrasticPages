/*
  # Create pages table and related schema

  1. New Tables
    - `pages`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `content` (text)
      - `is_public` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `views` (integer)
  2. Security
    - Enable RLS on `pages` table
    - Add policy for public access to public pages
    - Add policy for authenticated users to access all pages
*/

CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  views integer DEFAULT 0
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Policy for public access to public pages
CREATE POLICY "Public pages are viewable by everyone"
  ON pages
  FOR SELECT
  USING (is_public = true);

-- Policy for authenticated users to access all pages
CREATE POLICY "Authenticated users can access all pages"
  ON pages
  FOR ALL
  TO authenticated
  USING (true);