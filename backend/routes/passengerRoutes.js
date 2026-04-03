const express = require('express')
const multer = require('multer')
const supabase = require('../config/supabaseClient')

const router = express.Router()

// Configure multer for in-memory file storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

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

    // Check if exists - use .maybeSingle() to avoid error on no rows
    const { data: existing, error: checkError } = await supabase
      .from('passengers')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Backend: Error checking passenger existence:', checkError)
      return res.status(400).json({ error: 'Failed to check passenger: ' + checkError.message })
    }

    console.log('Backend: Existing check result:', existing, checkError?.code)

    let result

    if (existing?.id) {
      // Update existing record - don't touch password
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
      // Insert new record - generate default password for new users
      console.log('Backend: Inserting new passenger with default password')
      result = await supabase
        .from('passengers')
        .insert({
          email,
          name,
          phone: phone || null,
          address: address || null,
          avatar_url: avatar_url || null,
          password: 'default_' + Date.now(), // Generate unique default password
          created_at: new Date().toISOString(),
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

/**
 * Upload passenger avatar
 * POST /api/passengers/upload-avatar
 * Body: FormData with 'file' and 'email'
 */
router.post('/upload-avatar', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    console.log('Backend: Uploading avatar for:', email)

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `avatars/${email}-${timestamp}.${req.file.mimetype.split('/')[1]}`

    // Upload to Supabase storage
    const { data, error: uploadError } = await supabase.storage
      .from('passenger-avatars')
      .upload(filename, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true
      })

    if (uploadError) {
      console.error('Backend: Storage upload error:', uploadError)
      return res.status(400).json({ error: 'Failed to upload file: ' + uploadError.message })
    }

    console.log('Backend: File uploaded successfully:', data)

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('passenger-avatars')
      .getPublicUrl(filename)

    console.log('Backend: Public URL:', publicUrl)

    // Update passenger record with avatar URL
    const { data: existing, error: checkError } = await supabase
      .from('passengers')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (checkError && checkError.code !== 'PGRST116') {
      return res.status(400).json({ error: 'Failed to check passenger: ' + checkError.message })
    }

    if (existing?.id) {
      const { data: updateData, error: updateError } = await supabase
        .from('passengers')
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()

      if (updateError) {
        console.error('Backend: Update error:', updateError)
        return res.status(400).json({ error: 'Failed to update avatar: ' + updateError.message })
      }

      console.log('Backend: Avatar URL saved to database successfully for passenger ID:', existing.id)
      console.log('Backend: Avatar URL saved:', publicUrl)
      res.json({ 
        success: true, 
        avatar_url: publicUrl, 
        data: updateData?.[0] || null,
        message: 'Avatar successfully uploaded and saved to database'
      })
    } else {
      // If passenger doesn't exist yet, just return the URL
      console.log('Backend: Passenger does not exist yet. Avatar will be saved when profile is created.')
      res.json({ 
        success: true, 
        avatar_url: publicUrl, 
        message: 'Avatar uploaded. Please save profile to persist to database.' 
      })
    }
  } catch (err) {
    console.error('Backend: Upload avatar error:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
