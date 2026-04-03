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

// Middleware
app.use(cors({
  origin: 'http://localhost:4000',
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
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for http://localhost:4000`);
});
