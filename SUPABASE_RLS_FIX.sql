-- ============================================
-- FIX ROW-LEVEL SECURITY (RLS) FOR PASSENGERS
-- ============================================
-- Run this in your Supabase SQL Editor to fix the save profile issue

-- Option 1: DISABLE RLS (for development)
-- This allows anyone with the anon key to insert/update/delete
ALTER TABLE public.passengers DISABLE ROW LEVEL SECURITY;

-- If you want to keep RLS enabled, use Option 2 below instead:

-- ============================================
-- Option 2: CREATE PROPER RLS POLICIES (for production)
-- ============================================
-- Only use ONE approach. Uncomment Option 2 if you want to keep RLS.

-- Enable RLS if not already enabled
-- ALTER TABLE public.passengers ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all passengers
-- CREATE POLICY "Enable read access for authenticated users"
--   ON public.passengers
--   FOR SELECT
--   TO authenticated
--   USING (true);

-- Allow users to insert/update their own profile (by email)
-- CREATE POLICY "Enable insert/update for authenticated users"
--   ON public.passengers
--   FOR INSERT, UPDATE
--   TO authenticated
--   WITH CHECK (auth.jwt() ->> 'email' = email);

-- ============================================
-- VERIFY THE CHANGES
-- ============================================
-- After running Option 1 or Option 2, verify:

-- Check if RLS is enabled:
SELECT schemaname, tablename, rowsecurity FROM pg_tables 
WHERE tablename = 'passengers';

-- Check RLS policies:
SELECT * FROM pg_policies WHERE tablename = 'passengers';
