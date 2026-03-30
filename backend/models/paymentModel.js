const supabase = require('../config/supabaseClient');

const paymentModel = {
  // Create a new transaction
  createTransaction: async (transactionData) => {
    try {
      console.log('Creating transaction:', transactionData);
      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          booking_id: transactionData.bookingId,
          passenger_email: transactionData.passengerEmail,
          passenger_name: transactionData.passengerName,
          pickup_address: transactionData.pickupAddress || null,
          dropoff_address: transactionData.dropoffAddress || null,
          amount: transactionData.amount,
          status: 'pending',
          payment_method: 'GCash',
          paymongo_payment_id: null,
          paymongo_checkout_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;
      console.log('Transaction created:', data[0]);
      return data[0];
    } catch (error) {
      console.error('Failed to create transaction:', error.message);
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  },

  // Update transaction with PayMongo details
  updateTransactionWithPayMongo: async (transactionId, paymongoData) => {
    try {
      console.log('Updating transaction with PayMongo data:', { transactionId, ...paymongoData });
      const { data, error } = await supabase
        .from('transactions')
        .update({
          paymongo_payment_id: paymongoData.paymentId,
          paymongo_checkout_url: paymongoData.checkoutUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', transactionId)
        .select();

      if (error) throw error;
      console.log('Transaction updated:', data[0]);
      return data[0];
    } catch (error) {
      console.error('Failed to update transaction:', error.message);
      throw new Error(`Failed to update transaction: ${error.message}`);
    }
  },

  // Mark transaction as paid
  markTransactionAsPaid: async (paymongoPaymentIdOrTxId) => {
    try {
      console.log('Marking transaction as paid:', paymongoPaymentIdOrTxId);
      
      // First try to find by paymongo_payment_id
      let query = supabase
        .from('transactions')
        .update({
          status: 'paid',
          updated_at: new Date().toISOString()
        });

      // Check if it's a UUID (transaction ID) or payment ID
      if (paymongoPaymentIdOrTxId.includes('-')) {
        // Likely a transaction ID (has dashes)
        query = query.eq('id', paymongoPaymentIdOrTxId);
      } else {
        // Likely a PayMongo payment ID
        query = query.eq('paymongo_payment_id', paymongoPaymentIdOrTxId);
      }

      const { data, error } = await query.select();

      if (error) throw error;
      
      if (data && data.length > 0) {
        console.log('Transaction marked as paid:', data[0]);
        return data[0];
      } else {
        console.warn('No transaction found to update:', paymongoPaymentIdOrTxId);
        return null;
      }
    } catch (error) {
      console.error('Failed to mark transaction as paid:', error.message);
      throw new Error(`Failed to mark transaction as paid: ${error.message}`);
    }
  },

  // Mark transaction as failed
  markTransactionAsFailed: async (paymongoPaymentId) => {
    try {
      console.log('Marking transaction as failed:', paymongoPaymentId);
      const { data, error } = await supabase
        .from('transactions')
        .update({
          status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('paymongo_payment_id', paymongoPaymentId)
        .select();

      if (error) throw error;
      console.log('Transaction marked as failed:', data[0]);
      return data[0];
    } catch (error) {
      console.error('Failed to mark transaction as failed:', error.message);
      throw new Error(`Failed to mark transaction as failed: ${error.message}`);
    }
  },

  // Get transaction by ID
  getTransactionById: async (transactionId) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', transactionId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      throw new Error(`Failed to get transaction: ${error.message}`);
    }
  },

  // Get transaction by PayMongo payment ID
  getTransactionByPaymentId: async (paymongoPaymentId) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('paymongo_payment_id', paymongoPaymentId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      throw new Error(`Failed to get transaction: ${error.message}`);
    }
  },

  // Get all transactions for a passenger
  getPassengerTransactions: async (passengerEmail) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('passenger_email', passengerEmail)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Failed to get transactions: ${error.message}`);
    }
  },

  // Get all transactions for a booking
  getBookingTransactions: async (bookingId) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('booking_id', bookingId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Failed to get booking transactions: ${error.message}`);
    }
  }
};

module.exports = paymentModel;
