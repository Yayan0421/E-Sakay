const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

// Send a message
router.post('/send', messagesController.sendMessage);

// Get conversation between passenger and driver
router.get('/conversation', messagesController.getConversation);

// Get all drivers
router.get('/drivers', messagesController.getDrivers);

// Get all conversations for a passenger
router.get('/conversations', messagesController.getConversations);

// Mark messages as read
router.put('/mark-read', messagesController.markAsRead);

module.exports = router;
