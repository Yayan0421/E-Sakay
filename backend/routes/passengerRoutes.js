const express = require('express')
const supabase = require('../config/supabaseClient')

const router = express.Router()

/**
 * Save passenger profile
 * POST /api/passengers/save
 * Body: { email, name, phone, address, avatar_url }
 */
router.post('/save', async (req, res) => {
  try {
    const { email, name, phone, address, avatar_url } = req.body

    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' })
    }

    console.log('Backend: Saving passenger:', { email, name, phone, address, avatar_url })

    // Check if exists
    const { data: existing, error: checkError } = await supabase
      .from('passengers')
      .select('id')
      .eq('email', email)
      .single()

    console.log('Backend: Existing check result:', existing, checkError)

    let result

    if (existing?.id) {
      // Update
      console.log('Backend: Updating passenger:', existing.id)
      result = await supabase
        .from('passengers')
        .update({
          name,
          phone: phone || null,
          address: address || null,
          avatar_url: avatar_url || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
    } else {
      // Insert
      console.log('Backend: Inserting new passenger')
      result = await supabase
        .from('passengers')
        .insert({
          email,
          name,
          phone: phone || null,
          address: address || null,
          avatar_url: avatar_url || null,
          password: 'temp_' + Date.now(), // Temporary password
          updated_at: new Date().toISOString()
        })
        .select()
    }

    const { data, error } = result

    if (error) {
      console.error('Backend: Supabase error:', error)
      return res.status(400).json({ error: error.message })
    }

    console.log('Backend: Passenger saved successfully:', data)
    res.json({ success: true, data: data?.[0] || null })
  } catch (err) {
    console.error('Backend: Save passenger error:', err)
    res.status(500).json({ error: err.message })
  }
})

/**
 * Get passenger by email
 * GET /api/passengers/by-email/:email
 */
router.get('/by-email/:email', async (req, res) => {
  try {
    const { email } = req.params

    console.log('Backend: Fetching passenger by email:', email)

    const { data, error } = await supabase
      .from('passengers')
      .select('*')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Backend: Fetch error:', error)
      return res.status(400).json({ error: error.message })
    }

    console.log('Backend: Passenger data:', data)
    res.json({ data: data || null })
  } catch (err) {
    console.error('Backend: Fetch passenger error:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
