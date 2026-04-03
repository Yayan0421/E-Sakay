import React, { useState } from 'react'
import { ArrowLeft, MapPin, Phone, AlertCircle, Check } from 'lucide-react'
import Swal from 'sweetalert2'

export default function BookingConfirmation({
  pickupLocation,
  dropoffLocation,
  selectedRide,
  estimatedFare,
  onBack
}) {
  const [isBooking, setIsBooking] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingId, setBookingId] = useState(null)

  const handleConfirmBooking = async () => {
    setIsBooking(true)
    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newBookingId = 'BK' + Date.now()
      setBookingId(newBookingId)
      setBookingComplete(true)

      Swal.fire({
        icon: 'success',
        title: 'Booking Confirmed!',
        text: `Your ride has been booked. ID: ${newBookingId}`,
        confirmButtonColor: '#0ea5a4',
      }).then(() => {
        // Reset after confirmation shown
        setTimeout(() => {
          onBack()
        }, 500)
      })
    } catch (error) {
      console.error('Booking error:', error)
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: 'Please try again',
        confirmButtonColor: '#0ea5a4',
      })
    } finally {
      setIsBooking(false)
    }
  }

  if (bookingComplete) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Check size={40} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ride Booked!</h1>
          <p className="text-gray-600 mb-6">Your driver is on the way</p>
          <p className="text-sm text-gray-500 mb-8">Booking ID: <span className="font-mono font-bold text-teal-600">{bookingId}</span></p>
          
          <button
            onClick={onBack}
            className="w-full py-3 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Confirm Booking</h1>
      </div>

      {/* Ride Summary Card */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
        {/* Ride Type Banner */}
        <div className={`bg-linear-to-r ${selectedRide.color} rounded-xl p-4 mb-4 text-white`}>
          <div className="text-5xl mb-2">{selectedRide.icon}</div>
          <h2 className="text-2xl font-bold">{selectedRide.name}</h2>
          <p className="text-white text-opacity-90">{selectedRide.description}</p>
        </div>

        {/* Locations */}
        <div className="space-y-3 mb-4">
          {/* Pickup */}
          <div className="flex gap-3">
            <div className="shrink-0">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <MapPin size={16} className="text-teal-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Pickup Location</p>
              <p className="font-semibold text-gray-900 truncate">{pickupLocation}</p>
            </div>
          </div>

          {/* Line Connector */}
          <div className="flex">
            <div className="w-8 flex justify-center">
              <div className="w-0.5 h-6 bg-gray-300"></div>
            </div>
          </div>

          {/* Dropoff */}
          <div className="flex gap-3">
            <div className="shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <MapPin size={16} className="text-red-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Dropoff Location</p>
              <p className="font-semibold text-gray-900 truncate">{dropoffLocation}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Ride Details */}
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Vehicle</span>
            <span className="font-semibold text-gray-900">{selectedRide.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Capacity</span>
            <span className="font-semibold text-gray-900">{selectedRide.capacity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ETA</span>
            <span className="font-semibold text-gray-900">{selectedRide.timeEstimate}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Fare Section */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Base Fare</span>
            <span className="text-gray-900">₱{selectedRide.basePrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Distance</span>
            <span className="text-gray-900">Estimated</span>
          </div>
          <div className="bg-teal-50 px-3 py-2 rounded-lg flex justify-between border border-teal-200">
            <span className="font-semibold text-teal-900">Total Fare</span>
            <span className="font-bold text-lg text-teal-600">₱{estimatedFare}</span>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 text-xs">
          <AlertCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-blue-900">
            Final fare may vary based on actual distance and traffic conditions.
          </p>
        </div>
      </div>

      {/* Driver Info Placeholder */}
      <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl p-4 mb-4">
        <p className="text-xs text-gray-600 mb-3 font-semibold">Driver Will Be Assigned</p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xl">👨‍🦰</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Waiting for driver...</p>
            <p className="text-xs text-gray-600">You'll see driver details once assigned</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 sticky bottom-0 bg-white -mx-4 px-4 py-4">
        <button
          onClick={handleConfirmBooking}
          disabled={isBooking}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-200 ${
            isBooking
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-linear-to-r from-teal-500 to-cyan-500 hover:shadow-lg active:scale-95'
          }`}
        >
          {isBooking ? 'Booking...' : 'Confirm Booking'}
        </button>
        <button
          onClick={onBack}
          disabled={isBooking}
          className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Change Details
        </button>
      </div>
    </div>
  )
}
