# Backend Setup - Quick Start Guide

Follow these steps to set up and run the backend with Supabase:

## ⚠️ IMPORTANT: Set Up Database First

Before running the backend, you must create the database tables in Supabase:

1. Go to https://app.supabase.com and sign in
2. Select your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy and paste the SQL from `SUPABASE_SETUP.sql`
6. Click **Run**

See `SUPABASE_SETUP.md` for detailed instructions.

## Step 1: Navigate to Backend Folder

```powershell
cd backend
```

## Step 2: Install Dependencies

```powershell
npm install
```

This will install:
- Express.js (web framework)
- CORS (cross-origin requests)
- Supabase client (@supabase/supabase-js)
- Dotenv (environment variables)

## Step 3: Verify Environment Variables

Check that `.env` file exists with your Supabase credentials:

```
SUPABASE_URL=https://imaymmpvabbqdhvavhfp.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_key_here
SUPABASE_ANON_KEY=your_key_here
PORT=4001
```

If `.env` is missing, create it with the above values.

## Step 4: Start the Backend Server

```powershell
npm start
```

You should see:
```
✅ Server running on http://localhost:4001
📡 CORS enabled for http://localhost:4000
```

## Step 5: Run Frontend and Backend Together

Open **2 Terminal Windows**:

**Terminal 1 - Frontend (Port 4000):**
```powershell
cd Passenger
npm run dev
```

**Terminal 2 - Backend (Port 4001):**
```powershell
cd backend
npm start
```

## Testing the Backend with Supabase

### Register User:
```powershell
$body = @{
    name = "John Doe"
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4001/api/register" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

### Login User:
```powershell
$body = @{
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4001/api/login" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

### Verify Data in Supabase:
1. Go to Supabase Dashboard
2. Click **Table Editor** → **users**
3. You should see your registered users

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Create new user (stores in Supabase) |
| POST | `/api/login` | Login user (fetches from Supabase) |
| GET | `/api/dashboard?userId=1` | Get dashboard data |
| GET | `/api/users` | Get all users |
| GET | `/health` | Server health check |

## Your Data Flow

```
React Frontend (Port 4000)
    ↓ (user registers/logs in)
Express Backend (Port 4001)
    ↓ (stores/fetches data)
Supabase Database
    ↓ (persists data)
Your Supabase Cloud
```

## Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js dotenv
```

### Error: "Table 'users' does not exist"
- Run the SQL from `SUPABASE_SETUP.sql` in your Supabase SQL Editor
- Make sure you're connected to the right project

### Error: "Authentication failed"
- Check your `.env` file has correct Supabase URL and keys
- Restart the backend: `npm start`

### Data not showing in Supabase
- Check backend console for errors
- Verify table exists: go to Supabase → Table Editor
- Refresh the page or wait a moment

## Files Reference

| File | Purpose |
|------|---------|
| `server.js` | Main backend server |
| `config/supabaseClient.js` | Supabase connection |
| `models/supabaseUserModel.js` | Database queries |
| `controllers/supabaseAuthController.js` | Business logic |
| `routes/supabaseAuthRoutes.js` | API endpoints |
| `.env` | Your Supabase credentials |
| `SUPABASE_SETUP.md` | Detailed Supabase setup guide |
| `SUPABASE_SETUP.sql` | SQL to create tables |

## Next Steps

1. ✅ Test register/login with backend
2. ✅ Verify data appears in Supabase Dashboard
3. ✅ Connect React frontend to backend API
4. ✅ Add more features (profile updates, ride bookings, etc.)

Enjoy! 🚀

