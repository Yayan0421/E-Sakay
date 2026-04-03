## Deployment Guide for E-Sakay

### Prerequisites
- GitHub account (for deployments)
- Vercel account (free tier available)
- Supabase account (already configured)

---

# STEP 1: Deploy Backend (Vercel)

## 1.1 Push to GitHub

```bash
cd c:\Users\wenif\Desktop\Passenger
git push origin main
```

## 1.2 Deploy Backend to Vercel

1. Go to https://vercel.com/new
2. **Import Project** → Select your GitHub repository
3. **Root Directory**: Select `backend`
4. **Framework Preset**: Node.js
5. **Build Command**: `npm install`
6. **Start Command**: `node server.js` or `npm start`
7. Click **Environment Variables** and add:

```
SUPABASE_URL=https://imaymmfvabbqdhvavhfp.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYXltbXB2YWJicWRodmF2aGZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDUzNDY4NCwiZXhwIjoyMDkwMTEwNjg0fQ.nzTGGGE7ubx34XbKQ1Ypw_9VEnnNrFOxpuqzPe_hbvU
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYXltbXB2YWJicWRodmF2aGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MzQ2ODQsImV4cCI6MjA5MDExMDY4NH0.eMGzMBDum0s-NuId6zetH2dEVmg-fS6znqE3Urpv4UE
NODE_ENV=production
```

8. Click **Deploy** and wait for completion
9. **Copy the URLs**: You'll get `https://your-backend-name.vercel.app`

---

# STEP 2: Deploy Frontend (Vercel)

## 2.1 Deploy Frontend to Vercel

1. Go to https://vercel.com/new
2. **Import Project** → Select your GitHub repository (same one)
3. **Root Directory**: Leave empty (default: root)
4. **Framework**: Vite
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. Click **Environment Variables** and add:

```
VITE_SUPABASE_URL=https://imaymmfvabbqdhvavhfp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYXltbXB2YWJicWRodmF2aGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MzQ2ODQsImV4cCI6MjA5MDExMDY4NH0.eMGzMBDum0s-NuId6zetH2dEVmg-fS6znqE3Urpv4UE
VITE_API_BASE_URL=https://your-backend-name.vercel.app
```

**IMPORTANT**: Replace `https://your-backend-name.vercel.app` with the actual backend URL from Step 1.9

8. Click **Deploy** and wait for completion
9. You'll get `https://your-frontend-name.vercel.app`

---

# STEP 3: Verify Deployment

1. Go to your frontend URL
2. Navigate to Profile page
3. Click Edit
4. Change a field and Save
5. Should show ✅ **Profile Updated** message

If it fails:
- Check browser console (F12)
- Check if `VITE_API_BASE_URL` is correct
- Verify backend is running on production

---

## Summary

| Component | Local | Production |
|-----------|-------|------------|
| Frontend | http://localhost:4000 | https://your-frontend.vercel.app |
| Backend | http://localhost:4001 | https://your-backend.vercel.app |
| Database | Supabase | Supabase (same) |

**Key**: Frontend's `VITE_API_BASE_URL` must point to your production backend URL.
