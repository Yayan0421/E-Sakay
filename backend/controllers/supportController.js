const supportModel = require('../models/supportModel');

const supportController = {
  // Get all FAQs
  getFaqs: async (req, res) => {
    try {
      const faqs = await supportModel.getAllFaqs();
      res.status(200).json({
        message: 'FAQs retrieved successfully',
        data: faqs
      });
    } catch (error) {
      console.error('Get FAQs error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Create support ticket
  createTicket: async (req, res) => {
    try {
      const { passengerEmail, passengerName, subject, category, description, priority } = req.body;

      if (!passengerEmail || !subject || !category || !description) {
        return res.status(400).json({ 
          error: 'Missing required fields: passengerEmail, subject, category, description' 
        });
      }

      console.log('Creating support ticket:', { passengerEmail, subject, category });
      
      const ticket = await supportModel.createTicket({
        passengerEmail,
        passengerName,
        subject,
        category,
        description,
        priority: priority || 'normal'
      });

      console.log('Support ticket created successfully:', ticket.id);
      res.status(201).json({
        message: 'Support ticket created successfully',
        data: ticket
      });
    } catch (error) {
      console.error('Create ticket error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get passenger tickets
  getPassengerTickets: async (req, res) => {
    try {
      const { passengerEmail } = req.query;

      if (!passengerEmail) {
        return res.status(400).json({ error: 'Passenger email is required' });
      }

      const tickets = await supportModel.getPassengerTickets(passengerEmail);
      
      res.status(200).json({
        message: 'Tickets retrieved successfully',
        data: tickets
      });
    } catch (error) {
      console.error('Get tickets error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get ticket by ID
  getTicketById: async (req, res) => {
    try {
      const { ticketId } = req.params;

      if (!ticketId) {
        return res.status(400).json({ error: 'Ticket ID is required' });
      }

      const ticket = await supportModel.getTicketById(ticketId);

      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }

      res.status(200).json({
        message: 'Ticket retrieved successfully',
        data: ticket
      });
    } catch (error) {
      console.error('Get ticket error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = supportController;
