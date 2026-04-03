## Deployment Guide for E-Sakay

### Prerequisites

- Frontend: Vercel, Netlify, or any static host
- Backend: Vercel, Railway, Render, or any Node.js host
- Database: Supabase (already configured)

---

## Frontend Deployment (Vercel/Netlify)

### 1. Environment Variables for Frontend

Set these in your hosting platform's environment variables:

```
VITE_SUPABASE_URL=https://imaymmfvabbqdhvavhfp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYXltbXB2YWJicWRodmF2aGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MzQ2ODQsImV4cCI6MjA5MDExMDY4NH0.eMGzMBDum0s-NuId6zetH2dEVmg-fS6znqE3Urpv4UE
VITE_API_BASE_URL=https://your-backend-url.com
```

**Note**: Replace `https://your-backend-url.com` with your actual backend deployment URL.

### 2. Deploy Steps

```bash
npm run build
```

Deploy the `dist` folder to Vercel/Netlify.

---

## Backend Deployment (Vercel/Railway/Render)

### 1. Environment Variables for Backend

Set these in your backend hosting platform:

```
SUPABASE_URL=https://imaymmfvabbqdhvavhfp.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYXltbXB2YWJicWRodmF2aGZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDUzNDY4NCwiZXhwIjoyMDkwMTEwNjg0fQ.nzTGGGE7ubx34XbKQ1Ypw_9VEnnNrFOxpuqzPe_hbvU
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYXltbXB2YWJicWRodmF2aGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MzQ2ODQsImV4cCI6MjA5MDExMDY4NH0.eMGzMBDum0s-NuId6zetH2dEVmg-fS6znqE3Urpv4UE
PORT=3001
NODE_ENV=production
```

### 2. Deploy from Backend Folder

```bash
cd backend
npm install
npm start
```

Or configure your host to:
- **Root directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

---

## CORS Configuration for CrossOrigin Requests

The backend is configured to allow requests from:
- `http://localhost:4001` (local frontend)
- `http://localhost:4000` (local fallback)
- `http://localhost:5173` (Vite default)
- Production domains ending in `.vercel.app` or `.netlify.app`

**For custom domains**, update `backend/server.js`:

```javascript
const allowedOrigins = [
  'https://your-frontend-domain.com',
  'https://your-backend-domain.com'
];
```

---

## Troubleshooting

### Profile Save Not Working in Production?

1. **Check VITE_API_BASE_URL** → Must point to your backend
2. **Check CORS** → Verify frontend domain is allowed in backend
3. **Check Backend Logs** → Verify requests are reaching the backend
4. **Check Supabase Connection** → Verify SERVICE_ROLE_KEY is correct

### Connection Still Fails?

Try using a proxy or API gateway (Cloudflare, Kong) if direct CORS doesn't work.

---

## Summary

| Component | Development | Production |
|-----------|-------------|-----------|
| Frontend | `http://localhost:4001` | Your Vercel/Netlify URL |
| Backend | `http://localhost:3001` | Your backend deployment URL |
| Database | Supabase (same for both) | Supabase (same for both) |

**Key**: Frontend must know the Backend URL via `VITE_API_BASE_URL` environment variable.
