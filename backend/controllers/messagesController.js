const messagesModel = require('../models/messagesModel');

const messagesController = {
  // Send a message
  sendMessage: async (req, res) => {
    try {
      const { bookingId, senderEmail, senderName, message } = req.body;

      // Validation
      if (!bookingId || !senderEmail || !message) {
        return res.status(400).json({ error: 'Booking ID, sender email, and message are required' });
      }

      console.log('Sending message for booking', bookingId, 'from', senderEmail);
      const result = await messagesModel.sendMessage(bookingId, senderEmail, senderName, message, 'passenger');
      
      res.status(201).json({
        message: 'Message sent successfully',
        data: result
      });
    } catch (error) {
      console.error('Send message error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get conversation for a booking
  getConversation: async (req, res) => {
    try {
      const { bookingId } = req.query;

      // Validation
      if (!bookingId) {
        return res.status(400).json({ error: 'Booking ID is required' });
      }

      console.log('Fetching messages for booking:', bookingId);
      const conversation = await messagesModel.getConversation(bookingId);
      
      res.status(200).json({
        message: 'Conversation retrieved successfully',
        data: conversation
      });
    } catch (error) {
      console.error('Get conversation error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get all drivers
  getDrivers: async (req, res) => {
    try {
      const drivers = await messagesModel.getDrivers();
      
      res.status(200).json({
        message: 'Drivers retrieved successfully',
        data: drivers
      });
    } catch (error) {
      console.error('Get drivers error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get all conversations for a passenger
  getConversations: async (req, res) => {
    try {
      const { passengerEmail } = req.query;

      // Validation
      if (!passengerEmail) {
        return res.status(400).json({ error: 'Passenger email is required' });
      }

      console.log('Getting conversations for passenger:', passengerEmail);
      const conversations = await messagesModel.getConversations(passengerEmail);
      
      res.status(200).json({
        message: 'Conversations retrieved successfully',
        data: conversations
      });
    } catch (error) {
      console.error('Get conversations error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Mark messages as read
  markAsRead: async (req, res) => {
    try {
      const { bookingId } = req.body;

      // Validation
      if (!bookingId) {
        return res.status(400).json({ error: 'Booking ID is required' });
      }

      await messagesModel.markAsRead(bookingId);
      
      res.status(200).json({
        message: 'Messages marked as read'
      });
    } catch (error) {
      console.error('Mark as read error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = messagesController;
