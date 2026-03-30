const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

// Create a new booking
router.post('/create', bookingsController.createBooking);

// Get bookings for a passenger
router.get('/passenger', bookingsController.getPassengerBookings);

// Get completed bookings for a passenger
router.get('/completed', bookingsController.getCompletedBookings);

// Get available bookings (for drivers)
router.get('/available', bookingsController.getAvailableBookings);

// Accept booking (driver accepts)
router.post('/accept', bookingsController.acceptBooking);

// Start ride
router.post('/start', bookingsController.startRide);

// Complete ride
router.post('/complete', bookingsController.completeRide);

// Cancel booking
router.post('/cancel', bookingsController.cancelBooking);

// Test endpoint - complete a booking by ID (for testing)
router.post('/test/complete/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    console.log('TEST: Manually completing booking:', bookingId);
    const bookingsModel = require('../models/bookingsModel');
    const booking = await bookingsModel.completeBooking(bookingId);
    console.log('TEST: Booking completed:', booking);
    res.status(200).json({
      message: 'Booking completed (TEST)',
      data: booking
    });
  } catch (error) {
    console.error('TEST: Error completing booking:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
