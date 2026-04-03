import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
)

// Get API base URL - configurable via environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

console.log('API Base URL:', API_BASE_URL)

/**
 * Fetch passenger profile by email
 * @param {string} email - Passenger email
 * @returns {Promise<Object>} Passenger data
 */
export const getPassengerByEmail = async (email) => {
  try {
    if (!email) {
      console.warn('No email provided to getPassengerByEmail')
      return null
    }

    console.log('🔍 DEBUG: Fetching passenger by email:', email)

    // Use backend API instead of direct Supabase call
    const response = await fetch(`${API_BASE_URL}/passengers/by-email/${encodeURIComponent(email)}`)

    if (!response.ok) {
      console.warn('Backend fetch failed:', response.status)
      return null
    }

    const result = await response.json()
    console.log('✅ Fetched passenger data:', result.data)
    return result.data || null
  } catch (err) {
    console.error('Unexpected error fetching passenger by email:', err)
    return null
  }
}

/**
 * Fetch passenger profile by ID
 * @param {number} id - Passenger ID
 * @returns {Promise<Object>} Passenger data
 */
export const getPassengerById = async (id) => {
  try {
    if (!id) {
      console.warn('No ID provided to getPassengerById')
      return null
    }

    const { data, error } = await supabase
      .from('passengers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      // PGRST116 = no rows found, which is ok
      if (error.code === 'PGRST116') {
        console.log('No passenger found for ID:', id)
        return null
      }
      console.warn('Error querying passenger by ID:', error)
      return null
    }

    return data || null
  } catch (err) {
    console.error('Unexpected error fetching passenger by ID:', err)
    return null
  }
}

/**
 * Search passengers by name or email
 * @param {string} searchTerm - Search term (name or email)
 * @returns {Promise<Array>} Array of matching passengers
 */
export const searchPassengers = async (searchTerm) => {
  try {
    if (!searchTerm || searchTerm.trim() === '') {
      return []
    }

    const { data, error } = await supabase
      .from('passengers')
      .select('id, name, email, phone, address, avatar_url, created_at, updated_at')
      .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)

    if (error) {
      console.warn('Error searching passengers:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Unexpected error searching passengers:', err)
    return []
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

    const { data: passengers, error, count } = await supabase
      .from('passengers')
      .select('id, name, email, phone, address, avatar_url, created_at, updated_at', { count: 'exact' })
      .range(start, end)
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Error fetching passengers:', error)
      return { data: [], count: 0, page, limit }
    }

    return { data: passengers || [], count: count || 0, page, limit }
  } catch (err) {
    console.error('Unexpected error fetching passengers:', err)
    return { data: [], count: 0, page, limit }
  }
}

/**
 * Update or create passenger profile
 * @param {Object} passengerData - Passenger data to save
 * @returns {Promise<Object>} Updated passenger data
 */
/**
 * Save passenger profile via backend API
 * @param {Object} passengerData - Passenger data to save
 * @returns {Promise<Object>} Saved passenger object
 */
export const savePassengerProfile = async (passengerData) => {
  try {
    if (!passengerData || !passengerData.email) {
      throw new Error('Email is required to save profile')
    }

    console.log('🔍 DEBUG: Attempting to save passenger:', passengerData)

    // Use backend API instead of direct Supabase call
    const response = await fetch(`${API_BASE_URL}/passengers/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(passengerData)
    })

    console.log('🔍 DEBUG: Backend response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ Backend error:', errorData)
      throw new Error(`Failed to save profile: ${errorData.error || 'Unknown error'}`)
    }

    const result = await response.json()
    console.log('✅ Profile saved successfully via backend:', result.data)
    return result.data || null
  } catch (err) {
    console.error('❌ Error in savePassengerProfile:', err)
    console.error('❌ Error stack:', err.stack)
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
    if (!id) {
      throw new Error('Passenger ID is required to delete')
    }

    const { error } = await supabase
      .from('passengers')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting passenger:', error)
      throw new Error(`Failed to delete passenger: ${error.message}`)
    }

    console.log('Passenger deleted successfully')
    return true
  } catch (err) {
    console.error('Error in deletePassenger:', err)
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

    if (error) {
      console.warn('Error fetching total passengers count:', error)
    }

    const { data: weeklyData, error: weeklyError } = await supabase
      .from('passengers')
      .select('created_at')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

    if (weeklyError) {
      console.warn('Error fetching weekly stats:', weeklyError)
    }

    return {
      totalPassengers: count || 0,
      newThisWeek: weeklyData?.length || 0
    }
  } catch (err) {
    console.error('Unexpected error in getPassengerStats:', err)
    return {
      totalPassengers: 0,
      newThisWeek: 0
    }
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
