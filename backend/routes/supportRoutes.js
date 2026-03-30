const express = require('express');
const supportController = require('../controllers/supportController');

const router = express.Router();

// Get all FAQs
router.get('/faqs', supportController.getFaqs);

// Create support ticket
router.post('/ticket', supportController.createTicket);

// Get passenger tickets
router.get('/tickets', supportController.getPassengerTickets);

// Get ticket by ID
router.get('/ticket/:ticketId', supportController.getTicketById);

module.exports = router;
