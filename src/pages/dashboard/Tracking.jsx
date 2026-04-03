import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { Phone, MessageCircle, X, MapPin, Clock, Navigation2 } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'

// Custom marker icons
const pickupIcon = L.icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23146f05" opacity="0.2"/><circle cx="12" cy="12" r="6" fill="%23146f05"/></svg>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
})

const dropoffIcon = L.icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23dc2626" d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const driverIcon = L.icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" fill="%2300c66a" rx="2"/><circle cx="8" cy="15" r="1.5" fill="%23fff"/><circle cx="16" cy="15" r="1.5" fill="%23fff"/><path d="M4 8h16" stroke="%23fff" stroke-width="1"/></svg>',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})

const userLocationIcon = L.icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="%23146f05" opacity="0.3"/><circle cx="12" cy="12" r="5" fill="%23146f05"/></svg>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})

// Mock ride data
const createMockRideData = (pickupLat, pickupLng) => ({
  rideId: 'RIDE-ABC123XYZ',
  status: 'ongoing',
  driverName: 'John Smith',
  driverRating: 4.9,
  vehicleType: 'car',
  vehicleModel: 'Toyota Vios',
  plateNumber: 'ABC 1234',
  pickupAddress: 'Your Current Location',
  dropoffAddress: 'Bonifacio Global City',
  pickupLat: pickupLat,
  pickupLng: pickupLng,
  dropoffLat: 14.5591,
  dropoffLng: 121.0393,
  estimatedFare: '₱180-220',
  distanceRemaining: 2.4,
  timeRemaining: 8,
})

// Simulate driver movement along route
const generateSimulatedRoute = (pickup, dropoff, steps = 50) => {
  const route = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const lat = pickup.lat + (dropoff.lat - pickup.lat) * t
    const lng = pickup.lng + (dropoff.lng - pickup.lng) * t
    route.push([lat, lng])
  }
  return route
}

// Calculate distance between two points (Haversine formula)
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function Tracking() {
  const { collapsed } = useOutletContext() || { collapsed: false }
  const mapRef = useRef(null)
  const animationFrameRef = useRef(null)
  const startTimeRef = useRef(null)
  const routeRef = useRef([])

  const [userLocation, setUserLocation] = useState(null)
  const [rideData, setRideData] = useState(null)
  const [driverPosition, setDriverPosition] = useState(null)
  const [rideStatus, setRideStatus] = useState('ongoing')
  const [distanceRemaining, setDistanceRemaining] = useState(2.4)
  const [timeRemaining, setTimeRemaining] = useState(8)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [routePolylineData, setRoutePolylineData] = useState([])

  // Set pickup location to Eastern Samar State University, Maypandan, Tabunan
  useEffect(() => {
    const essUserLocation = [11.3167, 124.5000] // Eastern Samar State University coordinates
    const newRideData = createMockRideData(essUserLocation[0], essUserLocation[1])
    // Update pickup address to reflect the location
    newRideData.pickupAddress = 'Eastern Samar State University, Maypandan, Tabunan'
    setRideData(newRideData)
    setUserLocation(essUserLocation)
    setDriverPosition(essUserLocation)
    routeRef.current = generateSimulatedRoute(
      { lat: essUserLocation[0], lng: essUserLocation[1] },
      { lat: newRideData.dropoffLat, lng: newRideData.dropoffLng },
      100
    )
  }, [])

  // Simulate driver movement with smooth animation
  useEffect(() => {
    if (!rideData || !driverPosition) return

    // Initialize start time on first animation frame
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now()
    }

    const animate = () => {
      if (routeRef.current.length === 0) return

      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const totalDuration = 40 // 40 seconds for full route
      const progress = Math.min(elapsed / totalDuration, 1)
      const index = Math.floor(progress * (routeRef.current.length - 1))

      setRoutePolylineData(routeRef.current.slice(0, index + 1))

      if (index < routeRef.current.length) {
        const currentPos = routeRef.current[index]
        setDriverPosition(currentPos)

        // Update distance and time remaining
        const dropoff = { lat: rideData.dropoffLat, lng: rideData.dropoffLng }
        const distance = calculateDistance(currentPos[0], currentPos[1], dropoff.lat, dropoff.lng)
        const avgSpeed = 40 // km/h
        const time = Math.ceil((distance / avgSpeed) * 60) // minutes

        setDistanceRemaining(Math.max(distance, 0))
        setTimeRemaining(Math.max(time, 0))

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate)
        } else {
          // Trip completed
          setRideStatus('completed')
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rideData])

  // Auto-fit map to show all markers
  useEffect(() => {
    if (mapRef.current && rideData && driverPosition) {
      const bounds = L.latLngBounds([
        [rideData.pickupLat, rideData.pickupLng],
        [rideData.dropoffLat, rideData.dropoffLng],
        driverPosition,
      ])
      mapRef.current.fitBounds(bounds, { padding: [100, 100] })
    }
  }, [driverPosition, rideData])

  const handleCancelRide = () => {
    setRideStatus('cancelled')
    setShowCancelModal(false)
  }

  const handleCompleteRide = () => {
    setRideStatus('completed')
  }

  if (!userLocation) {
    return (
      <div className={`tracking-loading ${collapsed ? 'collapsed' : ''}`}>
        Loading your ride...
      </div>
    )
  }

  return (
    <div className={`tracking-container ${collapsed ? 'collapsed' : ''}`}>
      {/* Map */}
      <MapContainer
        center={rideData ? [rideData.pickupLat, rideData.pickupLng] : [14.5994, 120.9842]}
        zoom={14}
        ref={mapRef}
        className="tracking-map"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Pickup Location */}
        {rideData && (
          <Marker position={[rideData.pickupLat, rideData.pickupLng]} icon={pickupIcon}>
            <Popup>
              <div className="popup-container">
                <p className="popup-label">📍 Pickup</p>
                <p className="popup-text">{rideData.pickupAddress}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Dropoff Location */}
        {rideData && (
          <Marker position={[rideData.dropoffLat, rideData.dropoffLng]} icon={dropoffIcon}>
            <Popup>
              <div className="popup-container">
                <p className="popup-label">🎯 Dropoff</p>
                <p className="popup-text">{rideData.dropoffAddress}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Driver Position */}
        {rideData && (
          <Marker position={driverPosition} icon={driverIcon}>
            <Popup>
              <div className="popup-container">
                <p className="popup-label">🚗 {rideData.driverName}</p>
                <p className="popup-text">⭐ {rideData.driverRating}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* User Current Location */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>
              <div className="popup-content">
                <p className="popup-label">📍 You</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Route Polyline */}
        {routePolylineData.length > 0 && (
          <Polyline
            positions={routePolylineData}
            color="#00c66a"
            weight={3}
            opacity={0.7}
            dashArray="5, 5"
          />
        )}
      </MapContainer>

      {/* Ride Info Panel */}
      <div className="ride-info-panel">
        <div className="panel-header">
          <div className="driver-header">
            <div className="driver-avatar">
              {rideData && (rideData.vehicleType === 'car' ? '🚗' : '🏍️')}
            </div>
            <div className="driver-info">
              <h3>{rideData?.driverName}</h3>
              <p>⭐ {rideData?.driverRating} • {rideData?.vehicleModel}</p>
              <p className="plate-number">{rideData?.plateNumber}</p>
            </div>
          </div>
          <button className="close-btn" onClick={() => setShowCancelModal(true)}>
            <X size={20} />
          </button>
        </div>

        {/* Status Badge */}
        <div className={`status-badge ${rideStatus}`}>
          {rideStatus === 'ongoing' && '🚗 On the way'}
          {rideStatus === 'completed' && '✓ Arrived'}
          {rideStatus === 'cancelled' && '✕ Cancelled'}
        </div>

        {/* Trip Details */}
        <div className="trip-details">
          {/* Time Remaining */}
          <div className="detail-row">
            <div className="detail-item">
              <Clock size={18} />
              <div className="detail-info">
                <p className="detail-label">ETA</p>
                <p className="detail-value">{Math.max(timeRemaining, 0)} min</p>
              </div>
            </div>
          </div>

          {/* Distance Remaining */}
          <div className="detail-row">
            <div className="detail-item">
              <Navigation2 size={18} />
              <div className="detail-info">
                <p className="detail-label">Distance</p>
                <p className="detail-value">{distanceRemaining.toFixed(1)} km</p>
              </div>
            </div>
          </div>

          {/* Fare Estimate */}
          <div className="detail-row">
            <div className="detail-item">
              <span className="fare-icon">💵</span>
              <div className="detail-info">
                <p className="detail-label">Estimated Fare</p>
                <p className="detail-value">{rideData?.estimatedFare}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="locations-section">
          <div className="location-item pickup">
            <div className="location-dot"></div>
            <div>
              <p className="location-label">Pickup</p>
              <p className="location-address">{rideData?.pickupAddress}</p>
            </div>
          </div>
          <div className="location-connector"></div>
          <div className="location-item dropoff">
            <div className="location-dot"></div>
            <div>
              <p className="location-label">Dropoff</p>
              <p className="location-address">{rideData?.dropoffAddress}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="panel-actions">
          <button className="action-btn call">
            <Phone size={18} />
            Call
          </button>
          <button className="action-btn message">
            <MessageCircle size={18} />
            Message
          </button>
          {rideStatus === 'completed' && (
            <button className="action-btn complete" onClick={handleCompleteRide}>
              Complete Ride
            </button>
          )}
        </div>
      </div>

      {/* Cancel Ride Modal */}
      {showCancelModal && (
        <div className="tracking-modal-overlay">
          <div className="tracking-modal">
            <h2>Cancel Ride?</h2>
            <p>Are you sure you want to cancel this ride? A cancellation fee may apply.</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowCancelModal(false)}>
                Keep Ride
              </button>
              <button className="modal-btn confirm" onClick={handleCancelRide}>
                Cancel Ride
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
