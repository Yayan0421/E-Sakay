-- ==========================================
-- Complete E-Sakay Database Schema
-- ==========================================
-- Run this in Supabase SQL Editor

-- ==========================================
-- 1. Bookings Table
-- ==========================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_email VARCHAR(255),
  passenger_name VARCHAR(255) NOT NULL,
  passenger_email VARCHAR(255) NOT NULL,
  passenger_phone VARCHAR(20),
  pickup_address TEXT,
  pickup_latitude DECIMAL(10, 8),
  pickup_longitude DECIMAL(11, 8),
  dropoff_address TEXT,
  dropoff_latitude DECIMAL(10, 8),
  dropoff_longitude DECIMAL(11, 8),
  status VARCHAR(50) DEFAULT 'pending',
  ride_type VARCHAR(50),
  notes TEXT,
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_driver_email ON bookings(driver_email);
CREATE INDEX IF NOT EXISTS idx_bookings_passenger_email ON bookings(passenger_email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- ==========================================
-- 2. Transactions Table (Payment Records)
-- ==========================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  passenger_email VARCHAR(255) NOT NULL,
  passenger_name VARCHAR(255),
  pickup_address TEXT,
  dropoff_address TEXT,
  amount BIGINT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  paymongo_payment_id VARCHAR(255),
  paymongo_checkout_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_passenger_email ON transactions(passenger_email);
CREATE INDEX IF NOT EXISTS idx_transactions_booking_id ON transactions(booking_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- Disable RLS on transactions for Data API access
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;

-- ==========================================
-- 3. Rides Complete Table (Historical Records)
-- ==========================================
CREATE TABLE IF NOT EXISTS rides_complete (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID,
  driver_email VARCHAR(255),
  passenger_name VARCHAR(255),
  passenger_email VARCHAR(255),
  passenger_phone VARCHAR(20),
  pickup_address TEXT,
  pickup_latitude DECIMAL(10, 8),
  pickup_longitude DECIMAL(11, 8),
  dropoff_address TEXT,
  dropoff_latitude DECIMAL(10, 8),
  dropoff_longitude DECIMAL(11, 8),
  status VARCHAR(50),
  ride_type VARCHAR(50),
  booking_created_at TIMESTAMP,
  completed_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rides_complete_driver_email ON rides_complete(driver_email);
CREATE INDEX IF NOT EXISTS idx_rides_complete_passenger_email ON rides_complete(passenger_email);
CREATE INDEX IF NOT EXISTS idx_rides_complete_status ON rides_complete(status);

-- ==========================================
-- 4. Driver Earnings Table
-- ==========================================
CREATE TABLE IF NOT EXISTS driver_earnings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_email VARCHAR(255) NOT NULL,
  ride_id UUID REFERENCES rides_complete(id) ON DELETE SET NULL,
  amount BIGINT NOT NULL,
  commission_rate DECIMAL(5, 2) DEFAULT 10.0,
  commission_amount BIGINT,
  net_earnings BIGINT,
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_driver_earnings_driver_email ON driver_earnings(driver_email);
CREATE INDEX IF NOT EXISTS idx_driver_earnings_status ON driver_earnings(status);

-- ==========================================
-- 5. Support Tables
-- ==========================================
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  passenger_email VARCHAR(255) NOT NULL,
  passenger_name VARCHAR(255),
  subject VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'open',
  priority VARCHAR(50) DEFAULT 'normal',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_passenger_email ON support_tickets(passenger_email);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);

-- Disable RLS on support_tickets
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;

-- ==========================================
-- 6. FAQs Table
-- ==========================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  order_number INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Disable RLS on FAQs
ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category, order_number, is_active) VALUES
('How do I book a ride?', 'Open the app, enter your pickup and destination locations, select your preferred vehicle (motorcycle or tricycle), and confirm the booking. A driver will be matched with you within minutes.', 'booking', 1, true),
('How are drivers verified?', 'All E-Sakay drivers undergo a comprehensive verification process including background checks, license verification, and vehicle inspection. We prioritize your safety.', 'safety', 2, true),
('What payment methods are accepted?', 'We accept cash payments to drivers and digital payments including credit/debit cards, e-wallets, and bank transfers. Choose your preferred method during booking.', 'payment', 3, true),
('How do I track my ride?', 'Once a driver is assigned, you can see their real-time location on the map. You''ll also receive updates about the driver''s arrival and route.', 'tracking', 4, true),
('What is your cancellation policy?', 'You can cancel free of charge if you do so before the driver arrives. A cancellation fee of ₱50 applies if the driver has already started heading to your location.', 'cancellation', 5, true),
('How can I report a safety concern?', 'If you experience any safety concern, contact our 24/7 support team immediately via the in-app SOS button or call our hotline. We take all reports seriously.', 'safety', 6, true)
ON CONFLICT DO NOTHING;

-- ==========================================
-- 7. Passengers Table
-- ==========================================
CREATE TABLE IF NOT EXISTS passengers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_passengers_email ON passengers(email);

-- ==========================================
-- 8. Drivers Table
-- ==========================================
CREATE TABLE IF NOT EXISTS drivers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  vehicle_type VARCHAR(100),
  license_plate VARCHAR(50),
  rating DECIMAL(3, 2) DEFAULT 5.0,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_drivers_email ON drivers(email);

-- ==========================================
-- 9. Messages Table
-- ==========================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  passenger_email VARCHAR(255),
  driver_email VARCHAR(255),
  sender_type VARCHAR(50),
  message TEXT NOT NULL,
  read_status BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_passenger_email ON messages(passenger_email);
CREATE INDEX IF NOT EXISTS idx_messages_driver_email ON messages(driver_email);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- ==========================================
-- Done! Database schema created
-- ==========================================
