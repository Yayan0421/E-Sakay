import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

/**
 * Fetch passenger profile by email
 * @param {string} email - Passenger email
 * @returns {Promise<Object>} Passenger data
 */
export const getPassengerByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('passengers')
      .select('*')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data || null
  } catch (err) {
    console.error('Error fetching passenger by email:', err)
    throw err
  }
}

/**
 * Fetch passenger profile by ID
 * @param {number} id - Passenger ID
 * @returns {Promise<Object>} Passenger data
 */
export const getPassengerById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('passengers')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data || null
  } catch (err) {
    console.error('Error fetching passenger by ID:', err)
    throw err
  }
}

/**
 * Search passengers by name or email
 * @param {string} searchTerm - Search term (name or email)
 * @returns {Promise<Array>} Array of matching passengers
 */
export const searchPassengers = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('passengers')
      .select('id, name, email, phone, address, avatar_url, created_at')
      .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)

    if (error) throw error
    return data || []
  } catch (err) {
    console.error('Error searching passengers:', err)
    throw err
  }
}

/**
 * Get all passengers (paginated)
 * @param {number} page - Page number (default 1)
 * @param {number} limit - Items per page (default 10)
 * @returns {Promise<Object>} Passengers data and count
 */
export const getAllPassengers = async (page = 1, limit = 10) => {
  try {
    const start = (page - 1) * limit
    const end = start + limit - 1

    const { data, error, count } = await supabase
      .from('passengers')
      .select('id, name, email, phone, address, avatar_url, created_at, updated_at', { count: 'exact' })
      .range(start, end)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data: data || [], count: count || 0, page, limit }
  } catch (err) {
    console.error('Error fetching passengers:', err)
    throw err
  }
}

/**
 * Update or create passenger profile
 * @param {Object} passengerData - Passenger data to save
 * @returns {Promise<Object>} Updated passenger data
 */
export const savePassengerProfile = async (passengerData) => {
  try {
    const { data, error } = await supabase
      .from('passengers')
      .upsert({
        ...passengerData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'email' })
      .select()

    if (error) throw error
    console.log('Profile saved successfully:', data)
    return data[0] || null
  } catch (err) {
    console.error('Error saving passenger profile:', err)
    throw err
  }
}

/**
 * Delete passenger profile (requires admin or own profile)
 * @param {number} id - Passenger ID
 * @returns {Promise<boolean>} Success status
 */
export const deletePassenger = async (id) => {
  try {
    const { error } = await supabase
      .from('passengers')
      .delete()
      .eq('id', id)

    if (error) throw error
    console.log('Passenger deleted successfully')
    return true
  } catch (err) {
    console.error('Error deleting passenger:', err)
    throw err
  }
}

/**
 * Get passenger statistics
 * @returns {Promise<Object>} Statistics data
 */
export const getPassengerStats = async () => {
  try {
    const { error, count } = await supabase
      .from('passengers')
      .select('id', { count: 'exact' })

    if (error) throw error

    const { data: weeklyData } = await supabase
      .from('passengers')
      .select('created_at')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

    return {
      totalPassengers: count || 0,
      newThisWeek: weeklyData?.length || 0
    }
  } catch (err) {
    console.error('Error fetching stats:', err)
    throw err
  }
}

export default {
  getPassengerByEmail,
  getPassengerById,
  searchPassengers,
  getAllPassengers,
  savePassengerProfile,
  deletePassenger,
  getPassengerStats
}
