const bookingsModel = require('../models/bookingsModel');

const bookingsController = {
  // Create a new booking
  createBooking: async (req, res) => {
    try {
      console.log('Booking request received:', req.body);
      const { 
        passengerName,
        passengerEmail, 
        passengerPhone,
        pickupAddress,
        pickupLatitude,
        pickupLongitude,
        dropoffAddress,
        dropoffLatitude,
        dropoffLongitude,
        rideType, 
        notes, 
        paymentMethod 
      } = req.body;

      // Validation
      if (!passengerEmail || !pickupAddress || !dropoffAddress) {
        console.log('Validation failed - missing fields');
        return res.status(400).json({ error: 'Passenger email, pickup and dropoff addresses are required' });
      }

      console.log('Creating booking for passenger:', passengerEmail);
      const booking = await bookingsModel.create({
        passengerName,
        passengerEmail,
        passengerPhone,
        pickupAddress,
        pickupLatitude: pickupLatitude || 0,
        pickupLongitude: pickupLongitude || 0,
        dropoffAddress,
        dropoffLatitude: dropoffLatitude || 0,
        dropoffLongitude: dropoffLongitude || 0,
        rideType,
        notes,
        paymentMethod
      });

      console.log('Booking created successfully:', booking);
      res.status(201).json({
        message: 'Booking created successfully',
        data: booking
      });
    } catch (error) {
      console.error('Create booking error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get bookings for a passenger
  getPassengerBookings: async (req, res) => {
    try {
      const { passengerEmail } = req.query;

      if (!passengerEmail) {
        return res.status(400).json({ error: 'Passenger email is required' });
      }

      console.log('Fetching bookings for passenger:', passengerEmail);
      const bookings = await bookingsModel.getBookingsByPassenger(passengerEmail);
      console.log('Found bookings:', bookings);

      res.status(200).json({
        message: 'Bookings retrieved successfully',
        data: bookings
      });
    } catch (error) {
      console.error('Get bookings error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get completed bookings for a passenger
  getCompletedBookings: async (req, res) => {
    try {
      const { passengerEmail } = req.query;

      if (!passengerEmail) {
        return res.status(400).json({ error: 'Passenger email is required' });
      }

      console.log('API: Fetching completed bookings for passenger:', passengerEmail);
      const completedBookings = await bookingsModel.getAllCompletedRidesByPassenger(passengerEmail);
      console.log('API: Found completed bookings:', completedBookings.length, 'rides');
      console.log('API: Rides data:', completedBookings);

      res.status(200).json({
        message: 'Completed bookings retrieved successfully',
        data: completedBookings
      });
    } catch (error) {
      console.error('Get completed bookings error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get available bookings (for drivers)
  getAvailableBookings: async (req, res) => {
    try {
      const bookings = await bookingsModel.getAvailableBookings();

      res.status(200).json({
        message: 'Available bookings retrieved successfully',
        data: bookings
      });
    } catch (error) {
      console.error('Get available bookings error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Accept booking (driver accepts)
  acceptBooking: async (req, res) => {
    try {
      const { bookingId, driverId } = req.body;

      if (!bookingId || !driverId) {
        return res.status(400).json({ error: 'Booking ID and Driver ID are required' });
      }

      const booking = await bookingsModel.updateStatus(bookingId, 'accepted', driverId);

      res.status(200).json({
        message: 'Booking accepted successfully',
        data: booking
      });
    } catch (error) {
      console.error('Accept booking error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Start ride (driver starts the ride)
  startRide: async (req, res) => {
    try {
      const { bookingId } = req.body;

      if (!bookingId) {
        return res.status(400).json({ error: 'Booking ID is required' });
      }

      const booking = await bookingsModel.updateStatus(bookingId, 'ongoing');

      res.status(200).json({
        message: 'Ride started successfully',
        data: booking
      });
    } catch (error) {
      console.error('Start ride error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Complete ride
  completeRide: async (req, res) => {
    try {
      const { bookingId } = req.body;

      if (!bookingId) {
        return res.status(400).json({ error: 'Booking ID is required' });
      }

      console.log('API: Complete ride called for booking:', bookingId);
      const booking = await bookingsModel.completeBooking(bookingId);
      console.log('API: Ride completed successfully:', booking);

      res.status(200).json({
        message: 'Ride completed successfully',
        data: booking
      });
    } catch (error) {
      console.error('Complete ride error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // Cancel booking
  cancelBooking: async (req, res) => {
    try {
      const { bookingId } = req.body;

      if (!bookingId) {
        return res.status(400).json({ error: 'Booking ID is required' });
      }

      const booking = await bookingsModel.cancelBooking(bookingId);

      res.status(200).json({
        message: 'Booking cancelled successfully',
        data: booking
      });
    } catch (error) {
      console.error('Cancel booking error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = bookingsController;
