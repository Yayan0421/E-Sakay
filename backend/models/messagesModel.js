const supabase = require('../config/supabaseClient');

const messagesModel = {
  // Send a message
  sendMessage: async (bookingId, senderEmail, senderName, message, senderType = 'passenger') => {
    try {
      console.log('Model: Sending message for booking', bookingId, 'from', senderType, senderEmail);
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          booking_id: bookingId,
          sender_email: senderEmail,
          sender_name: senderName,
          sender_type: senderType,
          message_text: message,
          created_at: new Date()
        }])
        .select();

      if (error) {
        console.error('Supabase error sending message:', error);
        throw error;
      }
      console.log('Message sent successfully:', data);
      return data[0];
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  },

  // Get conversation for a booking
  getConversation: async (bookingId) => {
    try {
      console.log('Model: Fetching messages for booking:', bookingId);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('booking_id', bookingId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase error fetching conversation:', error);
        throw error;
      }
      console.log('Conversation retrieved:', data?.length, 'messages');
      return data || [];
    } catch (error) {
      throw new Error(`Failed to get conversation: ${error.message}`);
    }
  },

  // Get all drivers for passenger
  getDrivers: async () => {
    try {
      console.log('Model: Fetching all drivers');
      const { data, error } = await supabase
        .from('drivers')
        .select('id, name, email, vehicle_type, license_plate, rating, avatar_url, created_at');

      if (error) {
        console.error('Supabase error fetching drivers:', error);
        throw error;
      }
      console.log('Drivers retrieved:', data?.length, 'drivers');
      return data || [];
    } catch (error) {
      throw new Error(`Failed to get drivers: ${error.message}`);
    }
  },

  // Get all conversations for a passenger
  getConversations: async (passengerEmail) => {
    try {
      console.log('Model: Fetching conversations for passenger:', passengerEmail);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          messages:messages(id, sender_email, sender_name, message_text, created_at, sender_type)
        `)
        .eq('passenger_email', passengerEmail)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching conversations:', error);
        throw error;
      }
      
      console.log('Conversations retrieved:', data?.length, 'bookings with messages');
      return data || [];
    } catch (error) {
      throw new Error(`Failed to get conversations: ${error.message}`);
    }
  },

  // Mark messages as read
  markAsRead: async (bookingId) => {
    try {
      console.log('Model: Marking messages as read for booking:', bookingId);
      const { data, error } = await supabase
        .from('messages')
        .update({ updated_at: new Date() })
        .eq('booking_id', bookingId);

      if (error) {
        console.error('Supabase error marking as read:', error);
        throw error;
      }
      console.log('Messages marked as read');
      return data;
    } catch (error) {
      throw new Error(`Failed to mark messages as read: ${error.message}`);
    }
  }
};

module.exports = messagesModel;
