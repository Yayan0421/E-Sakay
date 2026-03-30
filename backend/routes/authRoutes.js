const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Dashboard route (protected)
router.get('/dashboard', authController.getDashboard);

// Test route - get all users
router.get('/users', authController.getAllUsers);

module.exports = router;
