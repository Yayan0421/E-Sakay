# Supabase Database Setup Guide

Follow these steps to set up your Supabase database:

## Step 1: Go to Supabase Dashboard

1. Go to https://app.supabase.com
2. Sign in to your account
3. Select your project: **imaymmpvabbqdhvavhfp**

## Step 2: Create Users Table

1. Go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Paste this SQL code:

```sql
-- Create users table
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on email for faster queries
CREATE INDEX idx_users_email ON users(email);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to see public data
CREATE POLICY "Allow public read access" ON users
  FOR SELECT USING (true);

-- Create policy to allow users to insert their own data
CREATE POLICY "Allow users to register" ON users
  FOR INSERT WITH CHECK (true);
```

4. Click **Run** button

## Step 3: Verify Table Creation

1. Go to **Table Editor** (left sidebar)
2. You should see a new table called **users**
3. Click on it to see the columns: `id`, `name`, `email`, `password`, `created_at`, `updated_at`

## Step 4: Backend Setup

### Install Dependencies
```bash
cd backend
npm install
```

This will install:
- `@supabase/supabase-js` - Supabase client
- `dotenv` - Environment variables

### Environment Variables

The `.env` file is already created with your credentials:
```
SUPABASE_URL=https://imaymmpvabbqdhvavhfp.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_key_here
SUPABASE_ANON_KEY=your_key_here
PORT=4001
```

**⚠️ IMPORTANT**: Never commit `.env` to Git! It's in `.gitignore` for security.

## Step 5: Start Backend

```bash
npm start
```

You should see:
```
✅ Server running on http://localhost:4001
📡 CORS enabled for http://localhost:4000
```

## Step 6: Test the Backend

### Test Register Endpoint

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

Expected Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T12:00:00Z"
  }
}
```

### Test Login Endpoint

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

### Verify Data in Supabase

1. Go to Supabase Dashboard
2. Click **Table Editor** → **users**
3. You should see your registered users with their data

## Step 7: Update Frontend Auth Context

Update your React login to call the backend:

```javascript
// In your Login component
const handleLogin = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:4001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Use the existing login function from AuthContext
      login(email, password);
      navigate('/dashboard');
    } else {
      setError(data.error);
    }
  } catch (err) {
    setError('Network error: ' + err.message);
  }
};
```

## API Endpoints

| Endpoint | Method | Body |
|----------|--------|------|
| `/api/register` | POST | `{ name, email, password }` |
| `/api/login` | POST | `{ email, password }` |
| `/api/dashboard` | GET | `?userId=1` |
| `/api/users` | GET | - |

## Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js dotenv
```

### Error: "Database connection failed"
1. Check that `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are correct in `.env`
2. Make sure the users table exists in Supabase (check Table Editor)
3. Restart the backend: `npm start`

### Data not showing in Supabase
1. Check the backend console for errors
2. Go to Supabase Dashboard → **Table Editor** → **users**
3. Manually refresh or wait a moment for data to appear

## Next Steps

1. ✅ Add more fields to users table (phone, address, etc.)
2. ✅ Create rides table for storing ride bookings
3. ✅ Add password hashing with bcryptjs
4. ✅ Add JWT authentication
5. ✅ Add email verification

## File Structure

```
backend/
├── config/
│   └── supabaseClient.js      # Supabase connection
├── models/
│   └── supabaseUserModel.js   # Database queries
├── controllers/
│   └── supabaseAuthController.js  # Business logic
├── routes/
│   └── supabaseAuthRoutes.js  # API endpoints
├── middleware/
│   ├── logger.js
│   └── errorHandler.js
├── server.js
├── .env                       # Your credentials (DO NOT COMMIT)
└── package.json
```

---

Enjoy your connected database! 🚀
