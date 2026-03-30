# E-Sakay Live Map Setup Guide

## Installation

Run the following command to install the required dependencies:

```bash
npm install leaflet react-leaflet @supabase/supabase-js
```

## Configuration

### 1. Leaflet CSS Import

Add the following to your `src/main.jsx` file:

```javascript
import 'leaflet/dist/leaflet.css'
```

Or add it to your main CSS file.

### 2. Supabase Configuration (Optional)

To enable real-time driver updates from a database:

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Create a `drivers` table with the following schema:

```sql
CREATE TABLE drivers (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  status TEXT DEFAULT 'available',
  vehicle_type TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

4. Update the `livemap.jsx` file with your Supabase credentials:

```javascript
const SUPABASE_URL = 'your-supabase-url'
const SUPABASE_KEY = 'your-supabase-anon-key'
```

### 3. Enable Supabase Realtime (Optional)

In your Supabase dashboard:
1. Go to Project Settings → Replication
2. Enable replication for the `drivers` table
3. Subscribe to realtime updates in the component

## Features

✅ **Interactive Map** - Full-screen Leaflet map with dynamic map tiles
✅ **Driver Markers** - Vehicle icons (car/motorcycle) for each active driver
✅ **Real-time Updates** - Drivers' positions update every 3 seconds (simulated)
✅ **Geolocation** - "You are here" marker using browser geolocation API
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
✅ **Sidebar Navigation** - Fixed sidebar that collapses with icons only
✅ **Driver Details** - Click on markers to see driver information
✅ **Driver List** - Sidebar showing all active drivers with status

## Current Implementation

The live map currently uses **simulated driver data** for demonstration. To use real data:

1. Remove the mock data initialization
2. Implement Supabase client connection
3. Subscribe to realtime updates using `@supabase/supabase-js`

### Example: Integrating Supabase

```javascript
// In livemap.jsx after imports
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Subscribe to driver updates
useEffect(() => {
  const subscription = supabase
    .from('drivers')
    .on('*', payload => {
      // Update driver location in state
      setDrivers(prevDrivers => 
        prevDrivers.map(driver => 
          driver.id === payload.new.id ? payload.new : driver
        )
      )
    })
    .subscribe()

  return () => subscription.unsubscribe()
}, [])
```

## Customization

### Change Map Provider
To use a different map tile provider, modify the `TileLayer` component URL in `livemap.jsx`.

### Customize Icons
Edit the Leaflet icon URLs in the `livemap.jsx` file to use different car/motorcycle icons.

### Adjust Update Frequency
Change the interval in the `setInterval` to modify how often driver positions update (currently 3000ms).

## Troubleshooting

**Map not displaying?**
- Ensure Leaflet CSS is imported in main.jsx
- Check browser console for errors

**Geolocation not working?**
- Must use HTTPS (or localhost for testing)
- User must grant location permission

**Markers not showing?**
- Verify latitude/longitude values are valid
- Check icon URLs are accessible

## Mobile Responsiveness

- Desktop: Map takes 70% width, driver list 30%
- Tablet: Map and list stack vertically
- Mobile: Optimized layout with touch-friendly markers

Enjoy your E-Sakay live map! 🗺️
