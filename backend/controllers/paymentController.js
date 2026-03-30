const axios = require('axios');
const paymentModel = require('../models/paymentModel');

const PAYMONGO_API_URL = 'https://api.paymongo.com/v1';
const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4000';

// Helper function to encode PayMongo credentials
const getAuthHeader = () => {
  const credentials = Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64');
  return {
    'Authorization': `Basic ${credentials}`,
    'Content-Type': 'application/json'
  };
};

const paymentController = {
  // Create payment and return checkout URL
  createPayment: async (req, res) => {
    try {
      const { bookingId, amount, passengerEmail, passengerName } = req.body;

      // Validation
      if (!bookingId || !amount || !passengerEmail) {
        return res.status(400).json({ error: 'Missing required fields: bookingId, amount, passengerEmail' });
      }

      console.log('Creating payment for booking:', bookingId);

      // Fetch booking details to store in transaction (for independence)
      let pickupAddress = '';
      let dropoffAddress = '';
      try {
        const supabase = require('../config/supabaseClient');
        const { data: booking } = await supabase
          .from('bookings')
          .select('pickup_address, dropoff_address')
          .eq('id', bookingId)
          .single();
        
        if (booking) {
          pickupAddress = booking.pickup_address;
          dropoffAddress = booking.dropoff_address;
        }
      } catch (e) {
        console.warn('Could not fetch booking details:', e.message);
      }

      // Create transaction in database (pending)
      const transaction = await paymentModel.createTransaction({
        bookingId,
        passengerEmail,
        passengerName: passengerName || 'Passenger',
        pickupAddress,
        dropoffAddress,
        amount: Math.round(amount * 100) // Convert to cents
      });

      console.log('Transaction created:', transaction.id);

      // Create payment intent with PayMongo
      const paymentData = {
        data: {
          attributes: {
            line_items: [
              {
                currency: 'PHP',
                amount: Math.round(amount * 100), // Amount in cents
                description: `E-Sakay Ride Payment - Booking #${bookingId}`,
                name: 'Ride Fare',
                quantity: 1
              }
            ],
            payment_method_types: ['gcash'],
            description: `E-Sakay Ride Payment - Booking #${bookingId}`,
            redirect: {
              success: `${FRONTEND_URL}/payment-confirm?payment_success=true&transaction_id=${transaction.id}`,
              failed: `${FRONTEND_URL}/payment-confirm?payment_failed=true&transaction_id=${transaction.id}`
            },
            billing: {
              address: {
                line1: 'N/A',
                postal_code: '1234',
                city: 'Manila',
                state: 'Metro Manila',
                country: 'PH'
              },
              email: passengerEmail,
              name: passengerName || 'Passenger'
            }
          }
        }
      };

      console.log('Calling PayMongo API...');
      const paymongoResponse = await axios.post(
        `${PAYMONGO_API_URL}/checkout_sessions`,
        paymentData,
        { headers: getAuthHeader() }
      );

      console.log('PayMongo response received');
      const paymentId = paymongoResponse.data.data.id;
      const checkoutUrl = paymongoResponse.data.data.attributes.checkout_url;

      // Update transaction with PayMongo details
      await paymentModel.updateTransactionWithPayMongo(transaction.id, {
        paymentId,
        checkoutUrl
      });

      console.log('Payment created successfully:', checkoutUrl);

      res.status(200).json({
        message: 'Payment created successfully',
        transaction_id: transaction.id,
        payment_id: paymentId,
        checkout_url: checkoutUrl,
        amount: amount
      });
    } catch (error) {
      console.error('Payment creation error:', error.response?.data || error.message);
      res.status(500).json({ 
        error: error.response?.data?.errors?.[0]?.detail || error.message 
      });
    }
  },

  // Handle PayMongo webhook
  handleWebhook: async (req, res) => {
    try {
      const event = req.body;
      console.log('Webhook received:', event.type);

      // Verify webhook (basic validation)
      if (!event.data || !event.data.id) {
        return res.status(400).json({ error: 'Invalid webhook payload' });
      }

      const eventType = event.type;
      const paymentId = event.data.id;

      if (eventType === 'payment.paid' || eventType === 'payment.succeeded') {
        console.log('Payment successful:', paymentId);

        // Get the checkout session to find the transaction
        try {
          // Find transaction by payment ID
          const transaction = await paymentModel.getTransactionByPaymentId(paymentId);

          if (!transaction) {
            console.warn('No transaction found for payment:', paymentId);
            return res.status(404).json({ error: 'Transaction not found' });
          }

          // Mark transaction as paid
          await paymentModel.markTransactionAsPaid(paymentId);

          // Update booking status to paid (optional)
          if (transaction.booking_id) {
            // You can update booking status here if needed
            console.log('Transaction paid, booking:', transaction.booking_id);
          }

          console.log('Transaction marked as paid:', transaction.id);
          res.status(200).json({ message: 'Webhook processed successfully' });
        } catch (error) {
          console.error('Error processing payment.paid event:', error.message);
          res.status(500).json({ error: 'Failed to process payment' });
        }
      } else if (eventType === 'payment.failed' || eventType === 'payment.expired') {
        console.log('Payment failed/expired:', paymentId);

        const transaction = await paymentModel.getTransactionByPaymentId(paymentId);
        if (transaction) {
          await paymentModel.markTransactionAsFailed(paymentId);
          console.log('Transaction marked as failed:', transaction.id);
        }

        res.status(200).json({ message: 'Webhook processed successfully' });
      } else {
        console.log('Unknown event type:', eventType);
        res.status(200).json({ message: 'Event received' });
      }
    } catch (error) {
      console.error('Webhook error:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  // Get payment status
  getPaymentStatus: async (req, res) => {
    try {
      const { transactionId } = req.query;

      if (!transactionId) {
        return res.status(400).json({ error: 'Transaction ID is required' });
      }

      const transaction = await paymentModel.getTransactionById(transactionId);

      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      res.status(200).json({
        message: 'Payment status retrieved',
        data: transaction
      });
    } catch (error) {
      console.error('Get payment status error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get transaction history for passenger
  getTransactionHistory: async (req, res) => {
    try {
      const { passengerEmail } = req.query;

      if (!passengerEmail) {
        return res.status(400).json({ error: 'Passenger email is required' });
      }

      console.log('Fetching transactions for passenger:', passengerEmail);
      const transactions = await paymentModel.getPassengerTransactions(passengerEmail);

      console.log('Found transactions:', transactions.length);

      res.status(200).json({
        message: 'Transaction history retrieved',
        data: transactions
      });
    } catch (error) {
      console.error('Get transaction history error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get transactions for a booking
  getBookingPayments: async (req, res) => {
    try {
      const { bookingId } = req.query;

      if (!bookingId) {
        return res.status(400).json({ error: 'Booking ID is required' });
      }

      console.log('Fetching transactions for booking:', bookingId);
      const transactions = await paymentModel.getBookingTransactions(bookingId);

      res.status(200).json({
        message: 'Booking payments retrieved',
        data: transactions
      });
    } catch (error) {
      console.error('Get booking payments error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Confirm payment after successful redirect from PayMongo
  // Called by frontend when user returns from checkout with payment_success=true
  confirmPayment: async (req, res) => {
    try {
      const { transactionId } = req.body;

      console.log('='.repeat(50));
      console.log('CONFIRM PAYMENT ENDPOINT CALLED');
      console.log('Transaction ID:', transactionId);

      if (!transactionId) {
        console.log('❌ No transaction ID provided');
        return res.status(400).json({ error: 'Transaction ID is required' });
      }

      // Get transaction
      console.log('Fetching transaction from database...');
      const transaction = await paymentModel.getTransactionById(transactionId);

      console.log('Transaction found:', transaction);

      if (!transaction) {
        console.log('❌ Transaction not found:', transactionId);
        return res.status(404).json({ error: 'Transaction not found' });
      }

      // Mark as paid immediately (user was redirected to success page)
      console.log('Marking transaction as paid...');
      const updated = await paymentModel.markTransactionAsPaid(transactionId);

      console.log('Update result:', updated);

      if (updated) {
        console.log('✅ Transaction marked as paid successfully');
        console.log('='.repeat(50));
        return res.status(200).json({
          message: 'Payment confirmed and marked as paid',
          data: {
            transaction_id: transactionId,
            status: 'paid'
          }
        });
      } else {
        console.log('❌ Failed to update transaction');
        console.log('='.repeat(50));
        return res.status(500).json({
          error: 'Failed to confirm payment'
        });
      }
    } catch (error) {
      console.error('Confirm payment error:', error);
      console.log('='.repeat(50));
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = paymentController;
