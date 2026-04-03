import React, { useState } from 'react'
import { MapPin, Calendar, Clock, DollarSign, ArrowDown } from 'lucide-react'
import RideOptions from './RideOptions'
import BookingConfirmation from './BookingConfirmation'
import '../../styles/booking.css'

export default function BookingPage() {
  const [pickupLocation, setPickupLocation] = useState('')
  const [dropoffLocation, setDropoffLocation] = useState('')
  const [selectedRide, setSelectedRide] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [estimatedFare, setEstimatedFare] = useState(null)

  const handleSwapLocations = () => {
    const temp = pickupLocation
    setPickupLocation(dropoffLocation)
    setDropoffLocation(temp)
  }

  const handleRideSelect = (ride) => {
    setSelectedRide(ride)
    // Calculate estimated fare (mock)
    setEstimatedFare(Math.floor(Math.random() * 500) + 50)
  }

  const handleBooking = () => {
    if (pickupLocation && dropoffLocation && selectedRide) {
      setShowConfirmation(true)
    }
  }

  if (showConfirmation) {
    return (
      <BookingConfirmation
        pickupLocation={pickupLocation}
        dropoffLocation={dropoffLocation}
        selectedRide={selectedRide}
        estimatedFare={estimatedFare}
        onBack={() => setShowConfirmation(false)}
      />
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Booking Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Book a Ride</h1>
        <p className="text-sm text-gray-500 mt-1">Where are you going?</p>
      </div>

      {/* Location Input Card */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
        {/* Pickup Location */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            <MapPin size={14} className="inline mr-1" />
            Pickup Location
          </label>
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="Enter pickup location"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors text-sm"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center my-3">
          <button
            onClick={handleSwapLocations}
            disabled={!pickupLocation || !dropoffLocation}
            className="bg-gray-100 hover:bg-teal-100 disabled:opacity-50 p-2 rounded-full transition-colors"
            title="Swap locations"
          >
            <ArrowDown size={20} className="text-teal-600" />
          </button>
        </div>

        {/* Dropoff Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            <MapPin size={14} className="inline mr-1" />
            Dropoff Location
          </label>
          <input
            type="text"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            placeholder="Enter destination"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors text-sm"
          />
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-2xl h-48 md:h-64 mb-4 flex items-center justify-center border-2 border-dashed border-teal-200">
        <div className="text-center">
          <MapPin size={48} className="text-teal-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Map Integration</p>
          <p className="text-xs text-gray-400">Drag to select location</p>
        </div>
      </div>

      {/* Ride Options */}
      {(pickupLocation || dropoffLocation) && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Select Ride Type</h2>
          <RideOptions selectedRide={selectedRide} onRideSelect={handleRideSelect} />
        </div>
      )}

      {/* Estimated Fare */}
      {estimatedFare && (
        <div className="bg-teal-50 rounded-2xl p-4 mb-4 border border-teal-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Estimated Fare</p>
              <p className="text-2xl font-bold text-teal-600">₱{estimatedFare}</p>
            </div>
            <DollarSign size={32} className="text-teal-400" />
          </div>
          <p className="text-xs text-gray-500 mt-2">May vary based on traffic and distance</p>
        </div>
      )}

      {/* Book Button */}
      <div className="sticky bottom-0 bg-white pt-3 -mx-4 px-4 pbbookings-20">
        <button
          onClick={handleBooking}
          disabled={!pickupLocation || !dropoffLocation || !selectedRide}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-200 ${
            pickupLocation && dropoffLocation && selectedRide
              ? 'bg-linear-to-r from-teal-500 to-cyan-500 hover:shadow-lg active:scale-95'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Book Ride Now
        </button>
      </div>
    </div>
  )
}
