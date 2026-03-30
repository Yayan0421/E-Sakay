const supabase = require('../config/supabaseClient');

const supportModel = {
  // Get all FAQs
  getAllFaqs: async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('order_number', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Failed to fetch FAQs: ${error.message}`);
    }
  },

  // Create support ticket
  createTicket: async (ticketData) => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .insert([{
          passenger_email: ticketData.passengerEmail,
          passenger_name: ticketData.passengerName,
          subject: ticketData.subject,
          category: ticketData.category,
          description: ticketData.description,
          status: 'open',
          priority: ticketData.priority || 'normal'
        }])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      throw new Error(`Failed to create support ticket: ${error.message}`);
    }
  },

  // Get all tickets for a passenger
  getPassengerTickets: async (passengerEmail) => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('passenger_email', passengerEmail)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Failed to fetch tickets: ${error.message}`);
    }
  },

  // Get ticket by ID
  getTicketById: async (ticketId) => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('id', ticketId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      throw new Error(`Failed to fetch ticket: ${error.message}`);
    }
  }
};

module.exports = supportModel;
