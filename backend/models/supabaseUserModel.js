const supabase = require('../config/supabaseClient');

const userModel = {
  // Create a new passenger
  create: async (userData) => {
    try {
      const { data, error } = await supabase
        .from('passengers')
        .insert([{
          name: userData.name,
          email: userData.email,
          password: userData.password,
          created_at: new Date()
        }])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },

  // Find passenger by email
  findByEmail: async (email) => {
    try {
      const { data, error } = await supabase
        .from('passengers')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows found
      return data || null;
    } catch (error) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  },

  // Find passenger by ID
  findById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('passengers')
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  },

  // Get all passengers (without passwords)
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('passengers')
        .select('id, name, email, created_at');

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Failed to get users: ${error.message}`);
    }
  },

  // Check if email exists
  emailExists: async (email) => {
    try {
      const { data, error } = await supabase
        .from('passengers')
        .select('email')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data !== null;
    } catch (error) {
      throw new Error(`Failed to check email: ${error.message}`);
    }
  }
};

module.exports = userModel;
