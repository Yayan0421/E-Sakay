import React, { useState, useEffect, useCallback } from 'react'
import { useOutletContext } from 'react-router-dom'
import { apiUrl } from '../../lib/api'
import { MapPin, Calendar, Clock, DollarSign, CheckCircle, XCircle, Bike, Phone, Navigation, Star } from 'lucide-react'
import '../../styles/rideshistory.css'
import '../../styles/homedashboard.css'

export default function RidesHistory(){
  const { collapsed } = useOutletContext() || { collapsed: false }
  const [rides, setRides] = useState([])
  const [filteredRides, setFilteredRides] = useState([])
  const [filter, setFilter] = useState('completed') // all, completed, cancelled
  const [loading, setLoading] = useState(true)

  const fetchRides = useCallback(async () => {
    try {
      setLoading(true)
      let passengerEmail = localStorage.getItem('passengerEmail')
      
      // Fallback: if passengerEmail not found, try to get it from user object
      if (!passengerEmail) {
        const userStr = localStorage.getItem('user')
        if (userStr) {
          try {
            const user = JSON.parse(userStr)
            passengerEmail = user.email
            // Store it for future use
            localStorage.setItem('passengerEmail', passengerEmail)
          } catch (e) {
            console.error('Error parsing user from localStorage:', e)
          }
        }
      }
      
      console.log('Fetching rides for passenger:', passengerEmail)
      if (!passengerEmail) {
        console.error('Passenger email not found in localStorage')
        setRides([])
        return
      }

      // Fetch from rides_complete table instead
      const response = await fetch(apiUrl(`/api/bookings/completed?passengerEmail=${encodeURIComponent(passengerEmail)}`))
      console.log('API Response status:', response.status)
      const result = await response.json()
      
      console.log('API Response:', result)
      
      if (result.data) {
        console.log('Rides received:', result.data.length, 'rides')
        setRides(result.data)
        filterRides(result.data, 'completed')
      } else {
        console.warn('No data in response:', result)
        setRides([])
      }
    } catch (error) {
      console.error('Error fetching rides:', error)
      setRides([])
    } finally {
      setLoading(false)
    }
  }, [])

  const filterRides = (ridesData, filterType) => {
    console.log('Filtering rides with type:', filterType)
    console.log('Total rides before filter:', ridesData.length)
    
    let filtered = [];
    if (filterType === 'all') {
      filtered = ridesData
    } else if (filterType === 'completed') {
      filtered = ridesData.filter(ride => ride.status === 'completed')
    } else if (filterType === 'cancelled') {
      filtered = ridesData.filter(ride => ride.status === 'cancelled')
    }
    
    console.log('Rides after filter:', filtered.length)
    console.log('Filtered rides data:', filtered)
    setFilteredRides(filtered)
  }

  useEffect(() => {
    fetchRides()
  }, [fetchRides])

  const handleFilterChange = (filterType) => {
    setFilter(filterType)
    filterRides(rides, filterType)
  }

  if (loading) {
    return (
      <div className="rides-loading">
        <div className="loading-spinner"></div>
        <p>Loading your rides...</p>
      </div>
    )
  }
  
  return (
    <>
      {/* Rides History Header */}
      <div className={`rides-page-header ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="rides-header-content">
          <div className="rides-header-top">
            <div>
              <h1 className="rides-main-title">Your Ride History</h1>
              <p className="rides-tagline">Track and manage all your completed and past rides</p>
            </div>
            <div className="rides-stats">
              <div className="stat-box">
                <Bike size={24} />
                <div>
                  <div className="stat-label">Total Rides</div>
                  <div className="stat-value">{rides.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rides History Content */}
      <div className={`rides-page-wrapper ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="rides-page">
          <div className="rides-filters-section">
            <div className="rides-filter-header">
              <h2 className="rides-filter-title">All Rides</h2>
              <span className="rides-filter-count">Showing {filteredRides.length} rides</span>
            </div>
            <div className="rides-filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                <Bike size={16} />
                All Rides
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => handleFilterChange('completed')}
              >
                <CheckCircle size={16} />
                Completed
              </button>
              <button 
                className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
                onClick={() => handleFilterChange('cancelled')}
              >
                <XCircle size={16} />
                Cancelled
              </button>
            </div>
          </div>

          <div className="rides-list">
            {filteredRides.length > 0 ? filteredRides.map((ride, idx) => (
              <div key={idx} className="ride-card">
                {/* Status Badge */}
                <div className={`ride-status-badge status-${ride.status}`}>
                  {ride.status === 'completed' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  <span>{ride.status?.charAt(0).toUpperCase() + ride.status?.slice(1)}</span>
                </div>

                {/* Ride Header */}
                <div className="ride-card-header">
                  <div className="driver-section">
                    <div className="driver-avatar-lg">
                      {ride.driver_email ? ride.driver_email.substring(0, 2).toUpperCase() : 'D'}
                    </div>
                    <div className="driver-details">
                      <div className="driver-name">{ride.driver_email || 'Unassigned'}</div>
                      <div className="driver-role">Driver</div>
                      <div className="booking-id">Booking #{ride.booking_id?.substring(0, 8)}</div>
                    </div>
                  </div>
                  <div className="ride-date-time">
                    <Calendar size={16} className="ride-icon" />
                    <div>
                      <div className="date-label">Completed on</div>
                      <div className="date-value">{new Date(ride.completed_at).toLocaleDateString()}</div>
                      <div className="time-value">{new Date(ride.completed_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="ride-locations">
                  <div className="location-item">
                    <MapPin size={18} className="location-icon pickup" />
                    <div className="location-details">
                      <div className="location-label">Pickup</div>
                      <div className="location-address">{ride.pickup_address}</div>
                      <div className="location-coords">{ride.pickup_latitude?.toFixed(4)}, {ride.pickup_longitude?.toFixed(4)}</div>
                    </div>
                  </div>
                  <div className="location-divider"></div>
                  <div className="location-item">
                    <Navigation size={18} className="location-icon dropoff" />
                    <div className="location-details">
                      <div className="location-label">Drop-off</div>
                      <div className="location-address">{ride.dropoff_address}</div>
                      <div className="location-coords">{ride.dropoff_latitude?.toFixed(4)}, {ride.dropoff_longitude?.toFixed(4)}</div>
                    </div>
                  </div>
                </div>

                {/* Passenger Info */}
                <div className="ride-passenger-info">
                  <div className="info-row">
                    <div className="info-item">
                      <div className="info-label">Passenger</div>
                      <div className="info-value">{ride.passenger_name || 'N/A'}</div>
                    </div>
                    <div className="info-item">
                      <Phone size={14} className="info-icon" />
                      <div>
                        <div className="info-label">Phone</div>
                        <div className="info-value">{ride.passenger_phone || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="rides-empty-state">
                <Bike size={64} />
                <h3>No {filter === 'all' ? 'rides' : filter + ' rides'} found</h3>
                <p>Start a new ride to see it here!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
