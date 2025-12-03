import { createClient } from '@supabase/supabase-js';

// =====================================================
// SUPABASE CONFIGURATION
// =====================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// STORAGE BUCKET NAME
// IMPORTANT: This must match the bucket name in Supabase Storage
// =====================================================
export const STORAGE_BUCKET = 'photos';  // Your actual bucket name

// =====================================================
// DATABASE SETUP SQL
// Run this in Supabase SQL Editor (SQL Editor > New Query)
// =====================================================
/*

-- Create galleries table
CREATE TABLE IF NOT EXISTS galleries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  client_email TEXT,
  date TEXT,
  type TEXT DEFAULT 'Wedding',
  cover_photo TEXT,
  photo_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id UUID REFERENCES galleries(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_photos_gallery_id ON photos(gallery_id);
CREATE INDEX IF NOT EXISTS idx_galleries_slug ON galleries(slug);

-- Enable Row Level Security
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Policies for galleries (allow all reads, authenticated writes)
CREATE POLICY "Anyone can view galleries" ON galleries
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert galleries" ON galleries
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update galleries" ON galleries
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete galleries" ON galleries
  FOR DELETE USING (auth.role() = 'authenticated');

-- Policies for photos
CREATE POLICY "Anyone can view photos" ON photos
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert photos" ON photos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update photos" ON photos
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete photos" ON photos
  FOR DELETE USING (auth.role() = 'authenticated');

*/

// =====================================================
// STORAGE BUCKET POLICIES
// Run this in Supabase SQL Editor after creating 'photos' bucket
// =====================================================
/*

-- Allow public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos');

-- Allow authenticated uploads
CREATE POLICY "Authenticated uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- Allow authenticated updates
CREATE POLICY "Authenticated updates"
ON storage.objects FOR UPDATE
USING (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- Allow authenticated deletes
CREATE POLICY "Authenticated deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'photos' AND auth.role() = 'authenticated');

*/

export default supabase;