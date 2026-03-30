const userModel = require('../models/supabaseUserModel');

const authController = {
  // Register a new user
  register: async (req, res) => {
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
      const emailExists = await userModel.emailExists(email);
      if (emailExists) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Create user
      const user = await userModel.create({
        name,
        email,
        password
      });

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(201).json({
        message: 'User registered successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Find user
      const user = await userModel.findByEmail(email);
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
        token: `token_${user.id}_${Date.now()}`
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get dashboard data (protected)
  getDashboard: async (req, res) => {
    try {
      const userId = req.body.userId || req.query.userId;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const user = await userModel.findById(parseInt(userId));
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
            memberSince: user.created_at
          }
        }
      });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get all users (for testing)
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.getAll();
      res.json({
        message: 'All users retrieved',
        users
      });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;
