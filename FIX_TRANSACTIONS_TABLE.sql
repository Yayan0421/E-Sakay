-- Make booking_id nullable to allow testing
ALTER TABLE public.transactions 
ALTER COLUMN booking_id DROP NOT NULL;
