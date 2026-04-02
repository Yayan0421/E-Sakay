import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Edit2, Save, X, LogOut, Shield, Eye, Bell, Camera, Star, AlertCircle } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import Swal from 'sweetalert2'

export default function Profile(){
  const supabase = useMemo(() => createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  ), [])

  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: 'P'
  })

  const [tempProfile, setTempProfile] = useState(profile)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError) throw authError
        if (!user) {
          setError('User not authenticated')
          return
        }

        const { data, error: fetchError } = await supabase
          .from('passengers')
          .select('*')
          .eq('id', user.id)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError

        if (data) {
          const profileData = {
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            avatar: (data.name || 'P').charAt(0).toUpperCase()
          }
          setProfile(profileData)
          setTempProfile(profileData)
        } else {
          const userData = localStorage.getItem('user')
          if (userData) {
            const user = JSON.parse(userData)
            setProfile(prev => ({
              ...prev,
              email: user.email,
              name: user.name || '',
              avatar: (user.name || user.email || 'P').charAt(0).toUpperCase()
            }))
          }
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

  const handleSave = async () => {
    try {
      setLoading(true)
      
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError) throw authError
      if (!user) throw new Error('User not authenticated')

      const { error: updateError } = await supabase
        .from('passengers')
        .upsert({
          id: user.id,
          name: tempProfile.name,
          email: tempProfile.email,
          phone: tempProfile.phone,
          address: tempProfile.address,
          updated_at: new Date()
        }, { onConflict: 'id' })

      if (updateError) throw updateError

      setProfile(tempProfile)
      setIsEditing(false)
      setError(null)

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been saved successfully',
        confirmButtonColor: '#0ea5a4'
      })
    } catch (err) {
      console.error('Error saving profile:', err)
      setError(err.message)

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
        confirmButtonColor: '#0ea5a4'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTempProfile(prev => ({
      ...prev,
      [name]: value,
      avatar: name === 'name' ? (value || 'P').charAt(0).toUpperCase() : prev.avatar
    }))
  }

  if (loading && !profile.email) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-teal-500 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-6">
        {/* Avatar Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-6 items-center md:items-start">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {tempProfile.avatar}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name || 'Not Set'}</h2>
            <p className="text-gray-600 mb-3">{profile.email}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <div className="bg-yellow-50 px-3 py-1 rounded-full flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-yellow-700">4.9 Rating</span>
              </div>
              <div className="bg-green-50 px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-green-700">✓ Verified</span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Edit2 size={18} />
              Edit
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex gap-2">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { id: 'personal', label: 'Personal', icon: User },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'preferences', label: 'Preferences', icon: Bell }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all text-sm md:text-base ${
                    activeTab === tab.id
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'personal' && (
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={tempProfile.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={tempProfile.email}
                  disabled
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={tempProfile.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={tempProfile.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`flex-1 py-2 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-teal-500 hover:bg-teal-600 active:scale-95'
                  }`}
                >
                  <Save size={18} />
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setTempProfile(profile)
                  }}
                  className="flex-1 py-2 rounded-lg font-semibold text-gray-700 border-2 border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 py-3 border-b border-gray-200">
                <User size={20} className="text-teal-600" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Full Name</p>
                  <p className="text-gray-900 font-medium">{profile.name || 'Not Set'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3 border-b border-gray-200">
                <Mail size={20} className="text-teal-600" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Email Address</p>
                  <p className="text-gray-900 font-medium">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3 border-b border-gray-200">
                <Phone size={20} className="text-teal-600" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Phone Number</p>
                  <p className="text-gray-900 font-medium">{profile.phone || 'Not Set'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3">
                <MapPin size={20} className="text-teal-600" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Address</p>
                  <p className="text-gray-900 font-medium">{profile.address || 'Not Set'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Account Security</h3>

          {[
            {
              icon: Shield,
              title: 'Password',
              description: 'Change your password regularly',
              action: 'Change Password'
            },
            {
              icon: Eye,
              title: 'Two-Factor Authentication',
              description: 'Add extra layer of security',
              action: 'Enable 2FA'
            },
            {
              icon: LogOut,
              title: 'Active Sessions',
              description: 'Manage connected devices',
              action: 'Manage Sessions'
            }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                <Icon size={24} className="text-teal-600 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <button className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded hover:bg-teal-200 transition-colors font-medium">
                    {item.action}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Preferences</h3>

          {[
            { icon: '📧', label: 'Email Notifications', checked: true },
            { icon: '📱', label: 'SMS Notifications', checked: false },
            { icon: '🔔', label: 'Push Notifications', checked: true },
            { icon: '🎉', label: 'Promotions', checked: true },
            { icon: '⚠️', label: 'Safety Alerts', checked: true }
          ].map((pref, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{pref.icon}</span>
                <span className="font-medium text-gray-900">{pref.label}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={pref.checked} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
