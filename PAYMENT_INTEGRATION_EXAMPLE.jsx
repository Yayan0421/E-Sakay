/**
 * EXAMPLE: How to add PaymentModal to your booking flow
 * Add this to your MainDashboard.jsx or booking component
 */

import React, { useState } from 'react'
import PaymentModal from './PaymentModal'  // Import the modal
import Swal from 'sweetalert2'

export default function BookingExample() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [createdBooking, setCreatedBooking] = useState(null)

  // After booking is created successfully
  const _handleBookingCreated = (bookingData) => {
    // bookingData comes from your booking creation API
    setCreatedBooking({
      id: bookingData.id,
      fare: bookingData.fare || 15,
      pickup_address: bookingData.pickupAddress,
      dropoff_address: bookingData.dropoffAddress,
      ride_type: bookingData.rideType
    })
    
    // Show success and ask if they want to pay
    Swal.fire({
      icon: 'success',
      title: 'Booking Confirmed!',
      text: 'Would you like to pay now with GCash?',
      showCancelButton: true,
      confirmButtonText: 'Pay Now',
      cancelButtonText: 'Pay Later',
      confirmButtonColor: '#0ea5a4'
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedBooking(createdBooking)
        setShowPaymentModal(true)
      }
    })
  }

  // When payment is completed/cancelled
  const handlePaymentClose = () => {
    setShowPaymentModal(false)
    // Optional: clear booking
    setCreatedBooking(null)
    setSelectedBooking(null)
  }

  return (
    <div>
      {/* Your booking form here */}
      
      {/* Show Payment Modal when user wants to pay */}
      {showPaymentModal && selectedBooking && (
        <PaymentModal
          booking={selectedBooking}
          onClose={handlePaymentClose}
          onPaymentSuccess={() => {
            handlePaymentClose()
            // Refresh bookings or navigate to tracking page
          }}
        />
      )}
    </div>
  )
}

/**
 * QUICK INTEGRATION STEPS:
 * 
 * 1. Import PaymentModal:
 *    import PaymentModal from './PaymentModal'
 * 
 * 2. Add state for modal:
 *    const [showPaymentModal, setShowPaymentModal] = useState(false)
 *    const [selectedBooking, setSelectedBooking] = useState(null)
 * 
 * 3. When showing booking confirmation, add button:
 *    <button onClick={() => {
 *      setSelectedBooking(rideData)
 *      setShowPaymentModal(true)
 *    }}>
 *      Pay with GCash
 *    </button>
 * 
 * 4. Add PaymentModal to JSX:
 *    {showPaymentModal && selectedBooking && (
 *      <PaymentModal
 *        booking={selectedBooking}
 *        onClose={() => setShowPaymentModal(false)}
 *      />
 *    )}
 * 
 * That's it! The modal handles everything else.
 */
