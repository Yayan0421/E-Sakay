import React, { useState, useEffect, useCallback } from 'react'
import { useOutletContext } from 'react-router-dom'
import { apiUrl } from '../../lib/api'
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
      <div style={{padding: 20, textAlign: 'center', color: '#6b7280'}}>
        Loading rides...
      </div>
    )
  }
  
  return (
    <>
      {/* Rides History Header */}
      <div className={`rides-page-header ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="rides-header-content">
          <h1 className="rides-main-title">Your Ride History</h1>
          <p className="rides-tagline">Track and manage all your completed and past rides</p>
        </div>
      </div>

      {/* Rides History Content */}
      <div className={`rides-page-wrapper ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className={`rides-page ${collapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="rides-header">
            <div>
              <div className="rides-title">Your Rides</div>
              <div className="small">Showing {filteredRides.length} {filter === 'all' ? 'total' : filter} rides</div>
            </div>
            <div className="rides-filters">
              <button 
                className={`pill ${filter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
                style={{background: filter === 'all' ? '#0ea5a4' : '#f3f4f6', color: filter === 'all' ? '#fff' : '#6b7280'}}
              >
                All Rides
              </button>
              <button 
                className={`pill ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => handleFilterChange('completed')}
                style={{background: filter === 'completed' ? '#0ea5a4' : '#f3f4f6', color: filter === 'completed' ? '#fff' : '#6b7280'}}
              >
                Completed
              </button>
              <button 
                className={`pill ${filter === 'cancelled' ? 'active' : ''}`}
                onClick={() => handleFilterChange('cancelled')}
                style={{background: filter === 'cancelled' ? '#0ea5a4' : '#f3f4f6', color: filter === 'cancelled' ? '#fff' : '#6b7280'}}
              >
                Cancelled
              </button>
            </div>
          </div>

          {filteredRides.length > 0 ? filteredRides.map((ride, idx) => (
            <div key={idx} className="rides-card">
              <div className="left-col">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div className="driver-box">
                    <div className="driver-avatar">{ride.driver_email ? ride.driver_email.substring(0, 2).toUpperCase() : 'D'}</div>
                    <div className="driver-info">
                      <strong>{ride.driver_email || 'Unassigned'}</strong>
                      <div className="small">Driver</div>
                      <div style={{marginTop:8}}>
                        <div style={{fontSize:13, color:'#6b7280'}}>{ride.booking_id?.substring(0, 8)}</div>
                        <div style={{fontSize:13, color:'#6b7280'}}>Status: {ride.status}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div className="small">{new Date(ride.completed_at).toLocaleDateString()} • {new Date(ride.completed_at).toLocaleTimeString()}</div>
                    <div className="pill" style={{marginTop:8, background: ride.status === 'completed' ? '#d1fae5' : ride.status === 'cancelled' ? '#fee2e2' : '#fef3c7', color: ride.status === 'completed' ? '#047857' : ride.status === 'cancelled' ? '#991b1b' : '#92400e'}}>
                      {ride.status?.charAt(0).toUpperCase() + ride.status?.slice(1)}
                    </div>
                  </div>
                </div>

                <div style={{marginTop:16, background:'#fbfdff', padding:12, borderRadius:8}}>
                  <div style={{fontWeight:700}}>Pickup Point</div>
                  <div className="small">{ride.pickup_address}</div>
                  <div style={{marginTop:12, fontWeight:700}}>Drop-off Point</div>
                  <div className="small">{ride.dropoff_address}</div>
                </div>

                <div className="meta-row">
                  <div className="meta-item">
                    <div className="small">Passenger</div>
                    <div style={{fontWeight:700}}>{ride.passenger_name || 'N/A'}</div>
                  </div>
                  <div className="meta-item">
                    <div className="small">Phone</div>
                    <div style={{fontWeight:700}}>{ride.passenger_phone || 'N/A'}</div>
                  </div>
                  <div className="meta-item">
                    <div className="small">Status</div>
                    <div style={{fontWeight:700, textTransform: 'capitalize'}}>{ride.status}</div>
                  </div>
                </div>

                <div style={{marginTop:14}}>
                  <div style={{display:'grid', gridTemplateColumns:'1fr', gap:8, marginTop:12}}>
                    <div style={{background:'#fff', padding:12, borderRadius:8, border:'1px solid #eef2f7'}}>
                      <div className="small">PICKUP LAT/LON</div>
                      <div style={{fontWeight:700, fontSize: 12}}>{ride.pickup_latitude?.toFixed(4)}, {ride.pickup_longitude?.toFixed(4)}</div>
                    </div>
                    <div style={{background:'#fff', padding:12, borderRadius:8, border:'1px solid #eef2f7'}}>
                      <div className="small">DROPOFF LAT/LON</div>
                      <div style={{fontWeight:700, fontSize: 12}}>{ride.dropoff_latitude?.toFixed(4)}, {ride.dropoff_longitude?.toFixed(4)}</div>
                    </div>
                    <div style={{background:'#fff', padding:12, borderRadius:8, border:'1px solid #eef2f7'}}>
                      <div className="small">BOOKING ID</div>
                      <div style={{fontWeight:700, fontSize: 12}}>{ride.booking_id}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-col">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div className="small">COMPLETED</div>
                  <div style={{textAlign:'right'}}>
                    <div className="total-fare">{new Date(ride.completed_at).toLocaleDateString()}</div>
                    <div className="small">{new Date(ride.completed_at).toLocaleTimeString()}</div>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div style={{padding: 40, textAlign: 'center', color: '#9ca3af'}}>
              <div style={{fontSize: 16}}>No {filter === 'all' ? 'rides' : filter + ' rides'} found</div>
              <div style={{fontSize: 14, marginTop: 8}}>Start a new ride to see it here!</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
