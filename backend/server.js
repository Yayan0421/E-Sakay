require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/supabaseAuthRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const supportRoutes = require('./routes/supportRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4001;

const configuredOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([
  'http://localhost:4000',
  'http://localhost:5173',
  ...configuredOrigins
]));

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  return origin.endsWith('.netlify.app');
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
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 CORS enabled for: ${allowedOrigins.join(', ')}${configuredOrigins.length === 0 ? ', *.netlify.app' : ''}`);
});
