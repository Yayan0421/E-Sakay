const userModel = require('../models/userModel');

const authController = {
  // Register a new user
  register: (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Validation
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      // Check if email already exists
      if (userModel.emailExists(email)) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Create user
      const user = userModel.create({
        name,
        email,
        password // In production, hash this with bcryptjs
      });

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(201).json({
        message: 'User registered successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Login user
  login: (req, res) => {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Find user
      const user = userModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Check password
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        message: 'Login successful',
        user: userWithoutPassword,
        token: `token_${user.id}_${Date.now()}` // Simple token for demo
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get dashboard data (protected)
  getDashboard: (req, res) => {
    try {
      // In a real app, you'd validate the token here
      const userId = req.body.userId || req.query.userId;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const user = userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return sample dashboard data
      res.json({
        message: 'Dashboard data retrieved',
        dashboard: {
          username: user.name,
          email: user.email,
          recentActivity: [
            { id: 1, action: 'Booked a ride', timestamp: new Date(Date.now() - 3600000) },
            { id: 2, action: 'Updated profile', timestamp: new Date(Date.now() - 7200000) },
            { id: 3, action: 'Completed a ride', timestamp: new Date(Date.now() - 86400000) }
          ],
          stats: {
            totalRides: 24,
            rating: 4.8,
            memberSince: user.createdAt
          }
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all users (for testing)
  getAllUsers: (req, res) => {
    try {
      const users = userModel.getAll();
      res.json({
        message: 'All users retrieved',
        users
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;
