const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create payment and get checkout URL
router.post('/create-payment', paymentController.createPayment);

// PayMongo webhook handler
router.post('/webhook', paymentController.handleWebhook);

// Get payment status
router.get('/status', paymentController.getPaymentStatus);

// Get transaction history for passenger
router.get('/history', paymentController.getTransactionHistory);

// Get payments for a booking
router.get('/booking-payments', paymentController.getBookingPayments);

// Confirm payment after successful redirect from PayMongo
router.post('/confirm-payment', paymentController.confirmPayment);

module.exports = router;
