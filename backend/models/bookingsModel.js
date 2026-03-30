const supabase = require('../config/supabaseClient');

const bookingsModel = {
  // Create a new booking
  create: async (bookingData) => {
    try {
      console.log('Creating booking with data:', bookingData);
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          passenger_name: bookingData.passengerName,
          passenger_email: bookingData.passengerEmail,
          passenger_phone: bookingData.passengerPhone,
          pickup_address: bookingData.pickupAddress,
          pickup_latitude: bookingData.pickupLatitude,
          pickup_longitude: bookingData.pickupLongitude,
          dropoff_address: bookingData.dropoffAddress,
          dropoff_latitude: bookingData.dropoffLatitude,
          dropoff_longitude: bookingData.dropoffLongitude,
          status: 'pending',
          driver_email: null
        }])
        .select();

      if (error) {
        console.error('Supabase error inserting booking:', error);
        throw error;
      }
      console.log('Booking created successfully:', data);
      return data[0];
    } catch (error) {
      console.error('Failed to create booking:', error.message);
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  },

  // Get all completed bookings for a passenger (from rides_complete table)
  getCompletedByPassenger: async (passengerEmail) => {
    try {
      const { data, error } = await supabase
        .from('rides_complete')
        .select('*')
        .eq('passenger_email', passengerEmail)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Failed to get completed bookings: ${error.message}`);
    }
  },

  // Get all rides (completed and cancelled) for a passenger
  getAllCompletedRidesByPassenger: async (passengerEmail) => {
    try {
      const { data, error } = await supabase
        .from('rides_complete')
        .select('*')
        .eq('passenger_email', passengerEmail)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Failed to get rides: ${error.message}`);
    }
  },

  // Get all bookings for a passenger
  getBookingsByPassenger: async (passengerEmail) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('passenger_email', passengerEmail)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Failed to get bookings: ${error.message}`);
    }
  },

  // Get all available bookings for drivers (pending bookings)
  getAvailableBookings: async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Failed to get available bookings: ${error.message}`);
    }
  },

  // Get booking by ID
  getBookingById: async (bookingId) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      throw new Error(`Failed to get booking: ${error.message}`);
    }
  },

  // Update booking status
  updateStatus: async (bookingId, status, driverEmail = null) => {
    try {
      const updateData = { 
        status,
        updated_at: new Date()
      };
      if (driverEmail) {
        updateData.driver_email = driverEmail;
      }

      const { data, error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      throw new Error(`Failed to update booking: ${error.message}`);
    }
  },

  // Complete booking - move to rides_complete table
  completeBooking: async (bookingId) => {
    try {
      console.log('Completing booking:', bookingId);
      // Get the booking first
      const { data: booking, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (fetchError) throw fetchError;
      console.log('Found booking to complete:', booking);

      // Insert into rides_complete table
      const { data: completedRide, error: insertError } = await supabase
        .from('rides_complete')
        .insert([{
          booking_id: booking.id,
          driver_email: booking.driver_email,
          passenger_name: booking.passenger_name,
          passenger_email: booking.passenger_email,
          passenger_phone: booking.passenger_phone,
          pickup_address: booking.pickup_address,
          pickup_latitude: booking.pickup_latitude,
          pickup_longitude: booking.pickup_longitude,
          dropoff_address: booking.dropoff_address,
          dropoff_latitude: booking.dropoff_latitude,
          dropoff_longitude: booking.dropoff_longitude,
          status: 'completed',
          booking_created_at: booking.created_at,
          completed_at: new Date()
        }])
        .select();

      if (insertError) {
        console.error('Error inserting into rides_complete:', insertError);
        throw insertError;
      }
      console.log('Successfully inserted into rides_complete:', completedRide);

      // UPDATE booking status to 'completed' instead of deleting
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status: 'completed', updated_at: new Date() })
        .eq('id', bookingId);

      if (updateError) {
        console.error('Error updating booking status:', updateError);
        throw updateError;
      }
      console.log('Successfully updated booking to completed');

      return completedRide[0];
    } catch (error) {
      console.error('Complete booking error:', error);
      throw new Error(`Failed to complete booking: ${error.message}`);
    }
  },

  // Cancel booking - move to rides_complete table
  cancelBooking: async (bookingId) => {
    try {
      console.log('Cancelling booking:', bookingId);
      // Get the booking first
      const { data: booking, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (fetchError) throw fetchError;
      console.log('Found booking to cancel:', booking);

      // Insert into rides_complete table with 'cancelled' status
      const { data: cancelledRide, error: insertError } = await supabase
        .from('rides_complete')
        .insert([{
          booking_id: booking.id,
          driver_email: booking.driver_email,
          passenger_name: booking.passenger_name,
          passenger_email: booking.passenger_email,
          passenger_phone: booking.passenger_phone,
          pickup_address: booking.pickup_address,
          pickup_latitude: booking.pickup_latitude,
          pickup_longitude: booking.pickup_longitude,
          dropoff_address: booking.dropoff_address,
          dropoff_latitude: booking.dropoff_latitude,
          dropoff_longitude: booking.dropoff_longitude,
          status: 'cancelled',
          booking_created_at: booking.created_at,
          completed_at: new Date()
        }])
        .select();

      if (insertError) {
        console.error('Error inserting into rides_complete:', insertError);
        throw insertError;
      }
      console.log('Successfully inserted into rides_complete:', cancelledRide);

      // UPDATE booking status to 'cancelled' instead of deleting
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status: 'cancelled', updated_at: new Date() })
        .eq('id', bookingId);

      if (updateError) {
        console.error('Error updating booking status:', updateError);
        throw updateError;
      }
      console.log('Successfully updated booking to cancelled');

      return cancelledRide[0];
    } catch (error) {
      console.error('Cancel booking error:', error);
      throw new Error(`Failed to cancel booking: ${error.message}`);
    }
  }
};

module.exports = bookingsModel;
