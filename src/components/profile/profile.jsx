import React, { useState, useEffect, useMemo } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, LogOut, Shield, Eye, Bell, ArrowLeft, Camera } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import '../../styles/profile.css'

export default function Profile(){
  // Initialize Supabase inside component with useMemo to ensure env vars are loaded
  const supabase = useMemo(() => createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  ), [])
  const navigate = useNavigate()
  const { collapsed } = useOutletContext() || { collapsed: false }
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatarUrl: ''
  })

  const [tempProfile, setTempProfile] = useState(profile)
  const [, setProfileImage] = useState(null)

  // Fetch profile data from Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        
        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError) throw authError
        if (!user) {
          setError('User not authenticated')
          return
        }

        // Fetch profile from passengers table
        const { data, error: fetchError } = await supabase
          .from('passengers')
          .select('*')
          .eq('id', user.id)
          .single()

        if (fetchError) throw fetchError

        if (data) {
          const profileData = {
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            avatarUrl: data.avatar_url || data.name?.charAt(0) || 'P'
          }
          setProfile(profileData)
          setTempProfile(profileData)
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [supabase])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target.result)
        setTempProfile(prev => ({
          ...prev,
          profilePicture: event.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
    setTempProfile(profile)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError) throw authError
      if (!user) throw new Error('User not authenticated')

      // Update profile in Supabase passengers table
      const { error: updateError } = await supabase
        .from('passengers')
        .update({
          name: tempProfile.name,
          phone: tempProfile.phone,
          address: tempProfile.address,
          avatar_url: tempProfile.avatarUrl
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      setProfile(tempProfile)
      setIsEditing(false)
      setError(null)
    } catch (err) {
      console.error('Error saving profile:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempProfile(profile)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTempProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {/* Profile Header */}
      <div className={`profile-page-header ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="profile-header-content">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="profile-main-title">My Profile</h1>
          <p className="profile-tagline">Manage your account information and preferences</p>
        </div>
      </div>

      {/* Profile Main Content */}
      <div className={`profile-page-container ${collapsed ? 'sidebar-collapsed' : ''}`}>
        
        {/* Profile Card Section */}
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-container">
              <div className="profile-avatar">
                {typeof tempProfile.avatarUrl === 'string' && tempProfile.avatarUrl.startsWith('data:') ? (
                  <img src={tempProfile.avatarUrl} alt="Profile" className="profile-avatar-img" />
                ) : typeof tempProfile.avatarUrl === 'string' && tempProfile.avatarUrl.startsWith('http') ? (
                  <img src={tempProfile.avatarUrl} alt="Profile" className="profile-avatar-img" />
                ) : (
                  tempProfile.avatarUrl
                )}
              </div>
              {isEditing && (
                <label className="profile-pic-upload" title="Change Profile Photo">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="profile-pic-input"
                  />
                  <Camera size={20} color="white" />
                </label>
              )}
            </div>
            <div className="profile-basic-info">
              <h2 className="profile-name">{profile.name}</h2>
              <p className="profile-email">{profile.email}</p>
              <p className="profile-member">Member since March 2024</p>
              <div className="profile-rating">
                <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                <span className="rating-text">4.9 / 5.0</span>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            {!isEditing ? (
              <button className="btn-edit" onClick={handleEditClick}>
                <Edit2 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn-save" onClick={handleSave}>
                  <Save size={18} />
                  Save Changes
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  <X size={18} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <User size={18} />
            Personal Info
          </button>
          <button
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={18} />
            Security
          </button>
          <button
            className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <Bell size={18} />
            Preferences
          </button>
        </div>

        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="profile-section">
            <div className="section-header">
              <h3>Personal Information</h3>
            </div>

            {isEditing ? (
              <form className="profile-form">
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={tempProfile.name}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={tempProfile.email}
                      onChange={handleInputChange}
                      disabled
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={tempProfile.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={tempProfile.address}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <div className="profile-info-grid">
                <div className="info-item full-width">
                  <span className="info-label">
                    <User size={18} />
                    Full Name
                  </span>
                  <span className="info-value">{profile.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <Mail size={18} />
                    Email Address
                  </span>
                  <span className="info-value">{profile.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <Phone size={18} />
                    Phone Number
                  </span>
                  <span className="info-value">{profile.phone}</span>
                </div>
                <div className="info-item full-width">
                  <span className="info-label">
                    <MapPin size={18} />
                    Address
                  </span>
                  <span className="info-value">{profile.address}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="profile-section">
            <div className="section-header">
              <h3>Account Security</h3>
            </div>

            <div className="security-grid">
              <div className="security-card">
                <div className="security-header">
                  <Shield size={24} color="#146f05" />
                  <h4>Password</h4>
                </div>
                <p className="security-description">Change your password regularly to keep your account secure</p>
                <button className="btn-security">Change Password</button>
              </div>

              <div className="security-card">
                <div className="security-header">
                  <Eye size={24} color="#146f05" />
                  <h4>Two-Factor Authentication</h4>
                </div>
                <p className="security-description">Add an extra layer of security to your account</p>
                <button className="btn-security">Enable 2FA</button>
              </div>

              <div className="security-card">
                <div className="security-header">
                  <Shield size={24} color="#146f05" />
                  <h4>Active Sessions</h4>
                </div>
                <p className="security-description">Manage devices connected to your account</p>
                <button className="btn-security">Manage Sessions</button>
              </div>

              <div className="security-card">
                <div className="security-header">
                  <LogOut size={24} color="#146f05" />
                  <h4>Sign Out Everywhere</h4>
                </div>
                <p className="security-description">Sign out of all sessions on other devices</p>
                <button className="btn-security">Sign Out All</button>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="profile-section">
            <div className="section-header">
              <h3>Notification Preferences</h3>
            </div>

            <div className="preferences-grid">
              <div className="preference-item">
                <div className="preference-header">
                  <h4>Ride Updates</h4>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>Receive notifications about your rides</p>
              </div>

              <div className="preference-item">
                <div className="preference-header">
                  <h4>Promotions & Offers</h4>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>Get notified about special deals and promotions</p>
              </div>

              <div className="preference-item">
                <div className="preference-header">
                  <h4>Safety Alerts</h4>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>Receive important safety notifications</p>
              </div>

              <div className="preference-item">
                <div className="preference-header">
                  <h4>Email Notifications</h4>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>Receive updates via email</p>
              </div>

              <div className="preference-item">
                <div className="preference-header">
                  <h4>SMS Notifications</h4>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>Receive updates via SMS text messages</p>
              </div>

              <div className="preference-item">
                <div className="preference-header">
                  <h4>Marketing Emails</h4>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <p>Receive marketing and newsletter emails</p>
              </div>
            </div>
          </div>
        )}

        {/* Danger Zone Section */}
        <div className="profile-section danger-zone">
          <div className="section-header">
            <h3>Danger Zone</h3>
          </div>
          <div className="danger-actions">
            <div className="danger-action-item">
              <div>
                <h4>Delete Account</h4>
                <p>Permanently delete your account and all associated data</p>
              </div>
              <button className="btn-danger">Delete Account</button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
