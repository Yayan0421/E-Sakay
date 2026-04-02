import React, { useState, useEffect, useCallback } from 'react'
import { apiUrl } from '../../lib/api'
import { MapPin, Clock, Phone, FileText, History } from 'lucide-react'

export default function RidesHistory(){
  const [rides, setRides] = useState([])
  const [filteredRides, setFilteredRides] = useState([])
  const [filter, setFilter] = useState('completed')
  const [loading, setLoading] = useState(true)

  const fetchRides = useCallback(async () => {
    try {
      setLoading(true)
      let passengerEmail = localStorage.getItem('passengerEmail')
      
      if (!passengerEmail) {
        const userStr = localStorage.getItem('user')
        if (userStr) {
          try {
            const user = JSON.parse(userStr)
            passengerEmail = user.email
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
    
    let filtered = []
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
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-teal-500 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-4">Loading rides...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ride History</h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage your rides</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: 'all', label: 'All Rides' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' }
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => handleFilterChange(btn.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
              filter === btn.value
                ? 'bg-teal-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Rides List */}
      {filteredRides.length > 0 ? (
        <div className="space-y-4">
          {filteredRides.map((ride, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200">
              {/* Ride Card Header */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-200 rounded-full flex items-center justify-center text-teal-700 font-bold">
                    {ride.driver_email ? ride.driver_email.substring(0, 1).toUpperCase() : 'D'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{ride.driver_email || 'Unassigned'}</p>
                    <p className="text-xs text-gray-500">Driver</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  ride.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : ride.status === 'cancelled'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {ride.status?.charAt(0).toUpperCase() + ride.status?.slice(1)}
                </div>
              </div>

              {/* Ride Card Content */}
              <div className="p-4 space-y-4">
                {/* Locations */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <MapPin size={16} className="text-teal-600 mt-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-semibold">PICKUP</p>
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{ride.pickup_address}</p>
                    </div>
                  </div>

                  {/* Line */}
                  <div className="flex">
                    <div className="flex-shrink-0 w-4 flex justify-center">
                      <div className="w-0.5 h-4 bg-gray-300"></div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <MapPin size={16} className="text-red-600 mt-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-semibold">DROPOFF</p>
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{ride.dropoff_address}</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Date & Time</p>
                    <p className="text-sm font-medium text-gray-900">{new Date(ride.completed_at).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-600">{new Date(ride.completed_at).toLocaleTimeString()}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Booking ID</p>
                    <p className="text-sm font-mono font-bold text-teal-600">{ride.booking_id?.substring(0, 12)}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Passenger</p>
                    <p className="text-sm font-medium text-gray-900">{ride.passenger_name || 'N/A'}</p>
                  </div>

                  {ride.passenger_phone && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{ride.passenger_phone}</p>
                    </div>
                  )}
                </div>

                {/* Coordinates */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-900 font-semibold mb-2">📍 Route Coordinates</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-blue-700 font-semibold">Pickup:</span>
                      <p className="text-blue-600">{ride.pickup_latitude?.toFixed(4)}, {ride.pickup_longitude?.toFixed(4)}</p>
                    </div>
                    <div>
                      <span className="text-blue-700 font-semibold">Dropoff:</span>
                      <p className="text-blue-600">{ride.dropoff_latitude?.toFixed(4)}, {ride.dropoff_longitude?.toFixed(4)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <History size={48} className="text-gray-400 mx-auto mb-3" />
          <p className="text-gray-700 font-medium mb-1">No {filter === 'all' ? 'rides' : filter + ' rides'} found</p>
          <p className="text-gray-500 text-sm">Start a new ride to see it here!</p>
        </div>
      )}
    </div>
  )
}
