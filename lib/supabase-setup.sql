-- ============================================
-- Valentine App - Supabase Database Setup
-- ============================================
-- Run this script in Supabase SQL Editor
-- Go to: Dashboard > SQL Editor > New query
-- Then paste this entire file and click "Run"
-- ============================================

-- 1. Create the valentines table
CREATE TABLE IF NOT EXISTS valentines (
                                          id TEXT PRIMARY KEY,

    -- People
                                          recipient_name TEXT NOT NULL,
                                          sender_name TEXT NOT NULL,

    -- Content
                                          proposal_text TEXT NOT NULL,
                                          love_letter TEXT NOT NULL,

    -- Photos
                                          photo1_url TEXT,
                                          photo1_caption TEXT,
                                          photo2_url TEXT,
                                          photo2_caption TEXT,
                                          short_note TEXT,

    -- Flower messages (for the bouquet screen)
                                          flower_msg_1 TEXT NOT NULL,
                                          flower_msg_2 TEXT NOT NULL,
                                          flower_msg_3 TEXT NOT NULL,
                                          flower_msg_4 TEXT NOT NULL,


    -- Stamp/seal selection
                                          stamp_type TEXT NOT NULL DEFAULT 'cats-love',

    -- Metadata
                                          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    view_count INTEGER DEFAULT 0
    );

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_valentines_created
    ON valentines(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_valentines_recipient
    ON valentines(recipient_name);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE valentines ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON valentines;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON valentines;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON valentines;

-- 5. Create RLS policies

-- Policy 1: Allow anyone to read valentines (public access)
CREATE POLICY "Enable read access for all users"
ON valentines
FOR SELECT
                              USING (true);

-- Policy 2: Allow insert (we'll use service role key in the API)
CREATE POLICY "Enable insert for authenticated users only"
ON valentines
FOR INSERT
WITH CHECK (true);

-- Policy 3: Allow update for view count
CREATE POLICY "Enable update for authenticated users only"
ON valentines
FOR UPDATE
                      USING (true);

-- 6. Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON valentines TO anon, authenticated;

-- ============================================
-- Verification Queries
-- ============================================
-- Run these one by one to verify setup:

-- Check if table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'valentines'
) AS table_exists;

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'valentines'
ORDER BY ordinal_position;

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'valentines';

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================
-- Uncomment to insert a test valentine:

/*
INSERT INTO valentines (
  id,
  recipient_name,
  sender_name,
  proposal_text,
  love_letter,
  flower_msg_1,
  flower_msg_2,
  flower_msg_3,
  flower_msg_4,
  stamp_type
) VALUES (
  'test123456',
  'Rachel',
  'John',
  'Rachel, will you be my valentine?',
  'My love, I just wanted to remind you how much you mean to me. Every day with you feels warmer, brighter, and a little more magical.',
  'I think about you every daisy 🌼',
  'My heart rose when I saw you 🌹',
  'I love you bunches 💐',
  'I will never leaf you 🍃',
  'cats-love'
);
*/

-- ============================================
-- Cleanup (if you need to start over)
-- ============================================
-- WARNING: This will delete ALL data!
-- Uncomment to drop everything:

/*
DROP TABLE IF EXISTS valentines CASCADE;
*/

-- ============================================
-- Setup Complete! ✅
-- ============================================
-- Next steps:
-- 1. Create storage bucket: valentine-images
-- 2. Make bucket public
-- 3. Set up storage policies (see README.md)
-- 4. Add your API keys to .env.local
-- 5. Run: npm run dev
-- ============================================