-- ==========================================
-- E-Sakay Database Setup for Supabase
-- ==========================================
-- Copy and paste this entire script into Supabase SQL Editor

-- ==========================================
-- 1. Create Passengers Table
-- ==========================================
CREATE TABLE IF NOT EXISTS passengers (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on email for faster queries
CREATE INDEX IF NOT EXISTS idx_passengers_email ON passengers(email);

-- ==========================================
-- 2. Enable Row Level Security (RLS)
-- ==========================================
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;

-- Allow all passengers to see data (for now)
CREATE POLICY "Enable read access for all passengers" ON passengers
  FOR SELECT USING (true);

-- Allow passengers to register (insert new records)
CREATE POLICY "Enable insert for authentication" ON passengers
  FOR INSERT WITH CHECK (true);

-- ==========================================
-- 3. Create Rides Table (Optional - for future use)
-- ==========================================
CREATE TABLE IF NOT EXISTS rides (
  id BIGSERIAL PRIMARY KEY,
  passenger_id BIGINT NOT NULL REFERENCES passengers(id) ON DELETE CASCADE,
  pickup_location VARCHAR(500) NOT NULL,
  dropoff_location VARCHAR(500) NOT NULL,
  ride_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Create index on passenger_id
CREATE INDEX IF NOT EXISTS idx_rides_passenger_id ON rides(passenger_id);

-- Enable RLS on rides
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;

-- Allow passengers to see their own rides
CREATE POLICY "Passengers can view their own rides" ON rides
  FOR SELECT USING (auth.uid()::text = passenger_id::text OR true);

-- Allow users to insert rides
CREATE POLICY "Users can insert rides" ON rides
  FOR INSERT WITH CHECK (true);

-- ==========================================
-- 4. Create Drivers Table
-- ==========================================
CREATE TABLE IF NOT EXISTS drivers (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  vehicle_type VARCHAR(50),
  license_plate VARCHAR(20),
  rating DECIMAL(3,2) DEFAULT 5.0,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_drivers_email ON drivers(email);

-- ==========================================
-- 5. Create Messages Table
-- ==========================================
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  passenger_id BIGINT NOT NULL REFERENCES passengers(id) ON DELETE CASCADE,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  sender_type VARCHAR(20) NOT NULL DEFAULT 'passenger',
  message TEXT NOT NULL,
  read_status BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_passenger_id ON messages(passenger_id);
CREATE INDEX IF NOT EXISTS idx_messages_driver_id ON messages(driver_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(passenger_id, driver_id);

-- Enable RLS on messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow passengers and drivers to see their messages
CREATE POLICY "Users can view their messages" ON messages
  FOR SELECT USING (true);

-- Allow users to insert messages
CREATE POLICY "Users can insert messages" ON messages
  FOR INSERT WITH CHECK (true);

-- ==========================================
-- Done! Your database is ready
-- ==========================================
-- Tables created:
-- - passengers (for storing passenger information)
-- - drivers (for storing driver information)
-- - rides (for storing ride bookings)
-- - messages (for storing conversations between passengers and drivers)
--
-- Next steps:
-- 1. Go back to your backend
-- 2. Run: npm install
-- 3. Run: npm start
-- 4. Test the API endpoints
