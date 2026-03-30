-- Create bookings table to store ride bookings from passengers
CREATE TABLE IF NOT EXISTS public.bookings (
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
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, in_progress, completed, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on driver_email for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_driver_email ON public.bookings(driver_email);
CREATE INDEX IF NOT EXISTS idx_bookings_passenger_email ON public.bookings(passenger_email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- Create passengers table for user authentication
CREATE TABLE IF NOT EXISTS public.passengers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create drivers table
CREATE TABLE IF NOT EXISTS public.drivers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  vehicle_type VARCHAR(100),
  license_plate VARCHAR(50),
  rating DECIMAL(3, 2),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table for driver-passenger communication
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  passenger_email VARCHAR(255),
  driver_email VARCHAR(255),
  sender_type VARCHAR(50), -- 'passenger' or 'driver'
  message TEXT NOT NULL,
  read_status BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for messages
CREATE INDEX IF NOT EXISTS idx_messages_passenger_email ON public.messages(passenger_email);
CREATE INDEX IF NOT EXISTS idx_messages_driver_email ON public.messages(driver_email);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);
