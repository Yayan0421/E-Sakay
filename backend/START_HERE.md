# 🚀 Supabase + Backend Setup - Step by Step

## IMPORTANT: Do These Steps in Order

### Step 1️⃣: Create Database in Supabase (5 mins)

1. Open https://app.supabase.com
2. Sign in and select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Open file: `SUPABASE_SETUP.sql` (in this backend folder)
6. Copy ALL the SQL code
7. Paste it into the Supabase SQL Editor
8. Click **▶ Run** button

**✅ Done!** Your database is created with `users` table

### Step 2️⃣: Install Backend Dependencies (3 mins)

Open PowerShell in the backend folder:

```powershell
cd C:\Users\wenif\Desktop\Passenger\backend
npm install
```

Wait for the installation to complete.

### Step 3️⃣: Check Environment Variables

Make sure `.env` file exists in backend folder with:

```
SUPABASE_URL=https://imaymmpvabbqdhvavhfp.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYXltbXB2YWJicWRodmF2aGZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDUzNDY4NCwiZXhwIjoyMDkwMTEwNjg0fQ.nzTGGGE7ubx34XbKQ1Ypw_9VEnnNrFOxpuqzPe_hbvU
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYXltbXB2YWJicWRodmF2aGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MzQ2ODQsImV4cCI6MjA5MDExMDY4NH0.eMGzMBDum0s-NuId6zetH2dEVmg-fS6znqE3Urpv4UE
PORT=4001
```

### Step 4️⃣: Start Backend Server

```powershell
npm start
```

You should see:
```
✅ Server running on http://localhost:4001
📡 CORS enabled for http://localhost:4000
```

### Step 5️⃣: Test It Works

Open another PowerShell and run:

```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4001/api/register" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

You should get a response like:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "created_at": "2024-01-01T12:00:00Z"
  }
}
```

### Step 6️⃣: Verify Data in Supabase

1. Go to https://app.supabase.com
2. Go to **Table Editor** (left sidebar)
3. Click on **users** table
4. You should see your test user with email, name, and password!

### Step 7️⃣: Run Frontend and Backend Together

**Terminal 1 - Frontend:**
```powershell
cd C:\Users\wenif\Desktop\Passenger
npm run dev
```

**Terminal 2 - Backend:**
```powershell
cd C:\Users\wenif\Desktop\Passenger\backend
npm start
```

Now:
- Frontend: http://localhost:4000
- Backend: http://localhost:4001
- Database: Your Supabase Cloud

---

## 🎯 What Happens When User Registers:

```
1. User fills form in React (name, email, password)
   ↓
2. Frontend sends POST to http://localhost:4001/api/register
   ↓
3. Backend receives request
   ↓
4. Backend validates the data
   ↓
5. Backend connects to Supabase
   ↓
6. Backend stores user in Supabase 'users' table
   ↓
7. Backend returns success response to Frontend
   ↓
8. Frontend stores user info and redirects to dashboard
   ↓
9. You can see the data in Supabase!
```

---

## 📁 Files Created:

```
backend/
├── .env                          ← Your Supabase credentials
├── package.json                  ← Dependencies updated
├── server.js                     ← Main backend (updated)
├── SUPABASE_SETUP.sql           ← SQL to create tables (COPY THIS)
├── SUPABASE_SETUP.md            ← Detailed guide
├── QUICK_START.md               ← Setup instructions
├── config/
│   └── supabaseClient.js        ← Connects to Supabase
├── models/
│   └── supabaseUserModel.js     ← Database queries
├── controllers/
│   └── supabaseAuthController.js ← Business logic
├── routes/
│   └── supabaseAuthRoutes.js    ← API endpoints
└── middleware/
    ├── logger.js
    └── errorHandler.js
```

---

## ✅ Checklist:

- [ ] SQL created in Supabase
- [ ] npm install completed
- [ ] .env file exists
- [ ] Backend starts with `npm start`
- [ ] Can register user and see it in Supabase
- [ ] Frontend and Backend running together

---

## 🆘 Troubleshooting:

**Q: Backend won't start?**
```
npm install
npm start
```

**Q: Module not found errors?**
```
npm install @supabase/supabase-js dotenv
```

**Q: "Table users does not exist" error?**
- Run the SQL from `SUPABASE_SETUP.sql` in Supabase SQL Editor

**Q: Still stuck?**
- Check backend console for error messages
- Check Supabase Dashboard → Logs
- Make sure .env has correct credentials

---

Enjoy! Your backend is now connected to Supabase 🎉
