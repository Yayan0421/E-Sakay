require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/supabaseAuthRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const supportRoutes = require('./routes/supportRoutes');
const passengerRoutes = require('./routes/passengerRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
const configuredOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([
  'http://localhost:4000',
  'http://localhost:4001',
  'http://localhost:5173',
  ...configuredOrigins
]));

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  const normalizedOrigin = origin.replace(/\/$/, '');
  const normalizedAllowed = allowedOrigins.map(o => o.replace(/\/$/, ''));
  if (normalizedAllowed.includes(normalizedOrigin)) return true;
  return origin.endsWith('.netlify.app') || origin.endsWith('.vercel.app');
};

// Middleware
app.use(cors({
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());
app.use(logger);

// Routes
app.use('/api', authRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/support', supportRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ message: 'Backend is running', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for http://localhost:4000`);
});
