-- ============================================
-- Migration: Add short_note field
-- ============================================
-- Run this in Supabase SQL Editor if you already
-- have the valentines table created
-- ============================================

-- Add the new column
ALTER TABLE valentines
    ADD COLUMN IF NOT EXISTS short_note TEXT;

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'valentines'
  AND column_name = 'short_note';

-- ✅ Migration complete!
-- Now you can add a short note to valentines that
-- will appear on the photos screen alongside the images