import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import '../../styles/livemap.css'

// Custom marker icons (created once)
const carIcon = L.icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%2300c66a" d="M8 8h8c1 0 2 1 2 2v6c0 1-1 2-2 2H8c-1 0-2-1-2-2v-6c0-1 1-2 2-2m0 8h8v-6H8v6z"/></svg>',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

const motorcycleIcon = L.icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%2300c66a" d="M7 4c-1.5 0-2 1-2 2s.5 2 2 2 2-1 2-2-.5-2-2-2m10 0c-1.5 0-2 1-2 2s.5 2 2 2 2-1 2-2-.5-2-2-2m-7 8c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z"/></svg>',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

const userLocationIcon = L.icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="%23146f05" opacity="0.3"/><circle cx="12" cy="12" r="5" fill="%23146f05"/></svg>',
  iconSize: [35, 35],
  iconAnchor: [17.5, 35],
  popupAnchor: [0, -35],
})

// Simulate driver data
const mockDrivers = [
  { id: 1, name: 'John Smith', latitude: 14.5994, longitude: 120.9842, status: 'available', vehicle_type: 'car' },
  { id: 2, name: 'Maria Cruz', latitude: 14.5995, longitude: 120.9843, status: 'busy', vehicle_type: 'motorcycle' },
  { id: 3, name: 'Carlos Santos', latitude: 14.5996, longitude: 120.9844, status: 'available', vehicle_type: 'car' },
  { id: 4, name: 'Ana Rodriguez', latitude: 14.5997, longitude: 120.9845, status: 'available', vehicle_type: 'motorcycle' },
]

// Memoized Driver Marker Component
const DriverMarker = memo(({ driver, icon, onClick }) => (
  <Marker position={[driver.latitude, driver.longitude]} icon={icon} onClick={() => onClick(driver)}>
    <Popup>
      <div className="popup-content">
        <h3>{driver.name}</h3>
        <p><strong>Status:</strong> {driver.status}</p>
        <p><strong>Vehicle:</strong> {driver.vehicle_type}</p>
      </div>
    </Popup>
  </Marker>
))
DriverMarker.displayName = 'DriverMarker'

function LiveMap({ collapsed }) {
  const [drivers, setDrivers] = useState(mockDrivers)
  const [userLocation, setUserLocation] = useState(null)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [rideData, setRideData] = useState(null)
  const [bookingDetails, setBookingDetails] = useState({
    pickupLocation: '',
    destination: '',
    paymentMethod: 'cash',
    specialRequests: ''
  })
  const [manualLat, setManualLat] = useState('')
  const [manualLng, setManualLng] = useState('')
  const [locationAttempt, setLocationAttempt] = useState(false)
  const mapRef = useRef(null)
  const updateIntervalRef = useRef(null)

  // Get user's current location once
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocationAttempt(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          console.log('📍 Geolocation success:', latitude, longitude)
          setUserLocation({ latitude, longitude })
          setLocationAttempt(false)
        },
        (error) => {
          console.warn('❌ Geolocation error:', error.message)
          // Default location (Manila) - fallback only if geolocation fails
          setUserLocation({ latitude: 14.5994, longitude: 120.9842 })
          setLocationAttempt(false)
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
      )
    } else {
      setUserLocation({ latitude: 14.5994, longitude: 120.9842 })
      setLocationAttempt(false)
    }
  }, [])

  // Handle manual location input
  const handleSetLocation = () => {
    const lat = parseFloat(manualLat)
    const lng = parseFloat(manualLng)
    if (!isNaN(lat) && !isNaN(lng)) {
      setUserLocation({ latitude: lat, longitude: lng })
      setManualLat('')
      setManualLng('')
    } else {
      alert('Please enter valid latitude and longitude')
    }
  }

  // Simulate real-time driver updates - optimized with batching
  useEffect(() => {
    updateIntervalRef.current = setInterval(() => {
      setDrivers((prevDrivers) =>
        prevDrivers.map((driver) => ({
          ...driver,
          latitude: driver.latitude + (Math.random() - 0.5) * 0.0003,
          longitude: driver.longitude + (Math.random() - 0.5) * 0.0003,
        }))
      )
    }, 5000) // Increased from 3000ms to 5000ms for better performance

    return () => {
      if (updateIntervalRef.current) clearInterval(updateIntervalRef.current)
    }
  }, [])

  // Memoized callback for driver selection
  const handleDriverSelect = useCallback((driver) => {
    setSelectedDriver(driver)
    if (driver.status === 'available') {
      setShowBookingModal(true)
    }
  }, [])

  // Memoized driver card click handler
  const handleDriverCardClick = useCallback((driver) => {
    setSelectedDriver(driver)
    if (driver.status === 'available') {
      setShowBookingModal(true)
    }
  }, [])

  // Handle booking submission
  const handleBookRide = () => {
    if (!bookingDetails.pickupLocation || !bookingDetails.destination) {
      alert('Please enter pickup location and destination')
      return
    }
    
    const confirmationData = {
      rideId: `RIDE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      driverName: selectedDriver.name,
      vehicleType: selectedDriver.vehicle_type,
      driverRating: 4.9,
      estimatedArrival: '3 mins away',
      pickupLocation: bookingDetails.pickupLocation,
      destination: bookingDetails.destination,
      paymentMethod: bookingDetails.paymentMethod,
      estimatedFare: selectedDriver.vehicle_type === 'motorcycle' ? '₱40-120' : '₱60-150'
    }
    
    setRideData(confirmationData)
    setShowBookingModal(false)
    setShowSuccessModal(true)
  }

  // Handle closing booking modal
  const closeBookingModal = () => {
    setShowBookingModal(false)
    setBookingDetails({
      pickupLocation: '',
      destination: '',
      paymentMethod: 'cash',
      specialRequests: ''
    })
  }

  // Render only if user location is available
  if (!userLocation) {
    return (
      <div className="livemap-loading">
        <div>Loading map...</div>
        {locationAttempt && (
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
            Requesting your location...
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`livemap-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="livemap-wrapper">
        <MapContainer
          center={[userLocation.latitude, userLocation.longitude]}
          zoom={15}
          ref={mapRef}
          className="livemap-map"
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />

          {/* User location marker */}
          <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userLocationIcon}>
            <Popup>
              <div className="popup-content">
                <h3>📍 You are here</h3>
              </div>
            </Popup>
          </Marker>

          {/* Driver markers */}
          {drivers.map((driver) => (
            <DriverMarker
              key={driver.id}
              driver={driver}
              icon={driver.vehicle_type === 'motorcycle' ? motorcycleIcon : carIcon}
              onClick={handleDriverSelect}
            />
          ))}
        </MapContainer>
      </div>

      {/* Driver list sidebar */}
      <div className="livemap-sidebar">
        <div className="sidebar-header">
          <h3>Active Drivers</h3>
          <span className="driver-count">{drivers.length}</span>
        </div>

        {/* Current Location Display */}
        <div style={{ padding: '12px', borderBottom: '1px solid #e0e0e0', fontSize: '12px' }}>
          <div style={{ marginBottom: '8px', color: '#666' }}>
            📍 Your Location:
          </div>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
          </div>
          <details style={{ fontSize: '11px' }}>
            <summary style={{ cursor: 'pointer', color: '#146f05' }}>Set manual location</summary>
            <div style={{ paddingTop: '8px' }}>
              <input
                type="number"
                step="0.0001"
                placeholder="Latitude"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
                style={{ width: '100%', padding: '6px', marginBottom: '6px', borderRadius: '4px', border: '1px solid #bbb' }}
              />
              <input
                type="number"
                step="0.0001"
                placeholder="Longitude"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
                style={{ width: '100%', padding: '6px', marginBottom: '6px', borderRadius: '4px', border: '1px solid #bbb' }}
              />
              <button
                onClick={handleSetLocation}
                style={{
                  width: '100%',
                  padding: '6px',
                  backgroundColor: '#146f05',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Set Location
              </button>
            </div>
          </details>
        </div>

        <div className="drivers-list">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className={`driver-card ${selectedDriver?.id === driver.id ? 'selected' : ''}`}
              onClick={() => handleDriverCardClick(driver)}
            >
              <div className="driver-avatar">
                {driver.vehicle_type === 'motorcycle' ? '🏍️' : '🚗'}
              </div>
              <div className="driver-info">
                <h4>{driver.name}</h4>
                <p className="driver-status">
                  <span className={`status-badge ${driver.status}`}>{driver.status}</span>
                </p>
              </div>
              <div className="driver-location">
                📍
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDriver && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <div className="booking-modal-header">
              <h2>Book Ride</h2>
              <button className="close-btn" onClick={closeBookingModal}>✕</button>
            </div>

            <div className="booking-modal-content">
              {/* Driver Info */}
              <div className="booking-driver-info">
                <div className="booking-driver-avatar">
                  {selectedDriver.vehicle_type === 'motorcycle' ? '🏍️' : '🚗'}
                </div>
                <div className="booking-driver-details">
                  <h3>{selectedDriver.name}</h3>
                  <p>{selectedDriver.vehicle_type === 'motorcycle' ? '🏍️ Motorcycle' : '🚗 Car'}</p>
                  <p className={`driver-status-badge ${selectedDriver.status}`}>
                    {selectedDriver.status}
                  </p>
                </div>
              </div>

              {/* Booking Form */}
              <div className="booking-form">
                <div className="form-group">
                  <label htmlFor="pickup">Pickup Location</label>
                  <input
                    id="pickup"
                    type="text"
                    placeholder="Where are you?"
                    value={bookingDetails.pickupLocation}
                    onChange={(e) => setBookingDetails({
                      ...bookingDetails,
                      pickupLocation: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="destination">Destination</label>
                  <input
                    id="destination"
                    type="text"
                    placeholder="Where are you going?"
                    value={bookingDetails.destination}
                    onChange={(e) => setBookingDetails({
                      ...bookingDetails,
                      destination: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Payment Method</label>
                  <button
                    type="button"
                    className="payment-method-btn"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    <span className="payment-icon">
                      {bookingDetails.paymentMethod === 'cash' && '💵'}
                      {bookingDetails.paymentMethod === 'gcash' && '📱'}
                      {bookingDetails.paymentMethod === 'paymaya' && '💳'}
                    </span>
                    <span className="payment-label">
                      {bookingDetails.paymentMethod === 'cash' && 'Cash'}
                      {bookingDetails.paymentMethod === 'gcash' && 'GCash'}
                      {bookingDetails.paymentMethod === 'paymaya' && 'PayMaya'}
                    </span>
                    <span className="payment-arrow">›</span>
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="requests">Special Requests (Optional)</label>
                  <textarea
                    id="requests"
                    placeholder="Any special requests? (e.g., cold AC, quiet ride)"
                    value={bookingDetails.specialRequests}
                    onChange={(e) => setBookingDetails({
                      ...bookingDetails,
                      specialRequests: e.target.value
                    })}
                    rows="3"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="booking-modal-actions">
                <button className="btn-cancel" onClick={closeBookingModal}>
                  Cancel
                </button>
                <button className="btn-book" onClick={handleBookRide}>
                  Book Ride
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="payment-modal-header">
              <h2>Select Payment Method</h2>
              <button className="close-btn" onClick={() => setShowPaymentModal(false)}>✕</button>
            </div>

            <div className="payment-modal-content">
              <div className="payment-options">
                {/* Cash Option */}
                <div
                  className={`payment-option ${bookingDetails.paymentMethod === 'cash' ? 'selected' : ''}`}
                  onClick={() => {
                    setBookingDetails({ ...bookingDetails, paymentMethod: 'cash' })
                    setShowPaymentModal(false)
                  }}
                >
                  <div className="payment-option-icon">💵</div>
                  <div className="payment-option-content">
                    <h3>Cash</h3>
                    <p>Pay to driver upon arrival</p>
                  </div>
                  <div className="payment-check">
                    {bookingDetails.paymentMethod === 'cash' && '✓'}
                  </div>
                </div>

                {/* GCash Option */}
                <div
                  className={`payment-option ${bookingDetails.paymentMethod === 'gcash' ? 'selected' : ''}`}
                  onClick={() => {
                    setBookingDetails({ ...bookingDetails, paymentMethod: 'gcash' })
                    setShowPaymentModal(false)
                  }}
                >
                  <div className="payment-option-icon">📱</div>
                  <div className="payment-option-content">
                    <h3>GCash</h3>
                    <p>Fast and secure mobile payment</p>
                  </div>
                  <div className="payment-check">
                    {bookingDetails.paymentMethod === 'gcash' && '✓'}
                  </div>
                </div>

                {/* PayMaya Option */}
                <div
                  className={`payment-option ${bookingDetails.paymentMethod === 'paymaya' ? 'selected' : ''}`}
                  onClick={() => {
                    setBookingDetails({ ...bookingDetails, paymentMethod: 'paymaya' })
                    setShowPaymentModal(false)
                  }}
                >
                  <div className="payment-option-icon">💳</div>
                  <div className="payment-option-content">
                    <h3>PayMaya</h3>
                    <p>Digital wallet and online payment</p>
                  </div>
                  <div className="payment-check">
                    {bookingDetails.paymentMethod === 'paymaya' && '✓'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && rideData && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>
            
            <h2>Ride Confirmed!</h2>
            <p className="success-subtitle">Your ride has been booked successfully</p>

            {/* Ride ID */}
            <div className="ride-id-box">
              <span className="ride-id-label">Ride ID</span>
              <span className="ride-id-value">{rideData.rideId}</span>
            </div>

            {/* Driver Assignment */}
            <div className="driver-assignment-box">
              <div className="driver-avatar-large">
                {rideData.vehicleType === 'motorcycle' ? '🏍️' : '🚗'}
              </div>
              <div className="driver-info-section">
                <div className="driver-name">{rideData.driverName}</div>
                <div className="driver-rating">⭐ {rideData.driverRating}</div>
                <div className="estimated-arrival">{rideData.estimatedArrival}</div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="trip-details-box">
              <div className="trip-detail">
                <span className="trip-label">From</span>
                <span className="trip-value">{rideData.pickupLocation}</span>
              </div>
              <div className="trip-detail">
                <span className="trip-label">To</span>
                <span className="trip-value">{rideData.destination}</span>
              </div>
              <div className="trip-detail">
                <span className="trip-label">Payment</span>
                <span className="trip-value">
                  {rideData.paymentMethod === 'cash' && '💵 Cash'}
                  {rideData.paymentMethod === 'gcash' && '📱 GCash'}
                  {rideData.paymentMethod === 'paymaya' && '💳 PayMaya'}
                </span>
              </div>
              <div className="trip-detail fare-row">
                <span className="trip-label">Estimated Fare</span>
                <span className="trip-value fare-value">{rideData.estimatedFare}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="success-actions">
              <button
                className="btn-track-ride"
                onClick={() => {
                  setShowSuccessModal(false)
                  setBookingDetails({
                    pickupLocation: '',
                    destination: '',
                    paymentMethod: 'cash',
                    specialRequests: ''
                  })
                  setSelectedDriver(null)
                }}
              >
                Track My Ride
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LiveMap
