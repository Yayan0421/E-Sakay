-- Fix transaction cascade delete issue
-- This script updates the foreign key constraint on transactions.booking_id
-- to use SET NULL instead of CASCADE DELETE
-- This ensures payment records persist even if bookings are deleted

-- Step 1: Drop the existing foreign key constraint (if it exists)
ALTER TABLE IF EXISTS transactions
DROP CONSTRAINT IF EXISTS transactions_booking_id_fkey;

-- Step 2: Re-create the foreign key with ON DELETE SET NULL
ALTER TABLE transactions
ADD CONSTRAINT transactions_booking_id_fkey 
FOREIGN KEY (booking_id) 
REFERENCES bookings(id) 
ON DELETE SET NULL;

-- Step 3: Update any NULL booking_ids to ensure data integrity
-- (This is optional - for testing purposes we made booking_id nullable)
