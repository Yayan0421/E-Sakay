-- ============================================
-- CREATE PASSENGERS TABLE IN SUPABASE
-- ============================================
-- Run this in your Supabase SQL Editor to create the passengers table

CREATE TABLE IF NOT EXISTS public.passengers (
  id bigserial NOT NULL,
  name character varying(255) NOT NULL,
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  phone character varying(20) NULL,
  address text NULL,
  avatar_url character varying(500) NULL,
  created_at timestamp without time zone NULL DEFAULT now(),
  updated_at timestamp without time zone NULL DEFAULT now(),
  CONSTRAINT passengers_pkey PRIMARY KEY (id),
  CONSTRAINT passengers_email_key UNIQUE (email)
) TABLESPACE pg_default;

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_passengers_email 
  ON public.passengers USING btree (email) TABLESPACE pg_default;

-- Disable RLS for development (allows anon key to insert/update/delete)
ALTER TABLE public.passengers DISABLE ROW LEVEL SECURITY;

-- ============================================
-- VERIFY TABLE CREATION
-- ============================================
-- Run this to verify the table was created successfully:
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'passengers';

-- Should return: passengers | f (false means RLS is disabled)
