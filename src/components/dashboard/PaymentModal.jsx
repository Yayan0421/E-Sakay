import React, { useState } from 'react'
import Swal from 'sweetalert2'
import receivedQR from '../../assets/received_33839938735653102.webp'
import { apiUrl } from '../../lib/api'

export default function PaymentModal({ booking, onClose, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [amount] = useState(booking?.fare || 100) // Default to 100 pesos

  const handlePayment = async () => {
    if (!booking) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Booking not found',
        confirmButtonColor: '#0ea5a4'
      })
      return
    }

    setLoading(true)

    try {
      const passengerEmail = localStorage.getItem('passengerEmail')
      const userStr = localStorage.getItem('user')
      const user = JSON.parse(userStr || '{}')
      const passengerName = user.name || 'Passenger'

      console.log('Creating payment:', {
        bookingId: booking.id,
        amount,
        passengerEmail,
        passengerName
      })

      // Call backend to create payment
      const response = await fetch(apiUrl('/api/payments/create-payment'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          amount,
          passengerEmail,
          passengerName
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Payment creation failed')
      }

      console.log('Payment created:', data)

      // Show QR code instead of redirecting
      setShowQR(true)
      setLoading(false)

    } catch (error) {
      console.error('Payment error:', error)
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.message,
        confirmButtonColor: '#0ea5a4'
      })
      setLoading(false)
    }
  }

  const handleQRConfirm = () => {
    Swal.fire({
      icon: 'success',
      title: 'Payment Received!',
      text: 'Thank you! Your payment has been processed.',
      confirmButtonColor: '#0ea5a4',
      allowOutsideClick: false
    }).then(() => {
      if (onPaymentSuccess) onPaymentSuccess()
      onClose()
    })
  }

  if (!booking) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: 24,
        maxWidth: 400,
        width: '90%',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
      }}>
        
        {!showQR ? (
          <>
            <h2 style={{ margin: '0 0 16px 0', fontSize: 20, fontWeight: 700 }}>
              Payment Confirmation
            </h2>

            <div style={{
              background: '#f7fafc',
              padding: 16,
              borderRadius: 8,
              marginBottom: 16
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#6b7280' }}>Booking ID</span>
                <span style={{ fontWeight: 600 }}>{booking.id?.substring(0, 8)}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#6b7280' }}>Pickup</span>
                <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '50%' }}>
                  {booking.pickup_address}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Dropoff</span>
                <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '50%' }}>
                  {booking.dropoff_address}
                </span>
              </div>
            </div>

            <div style={{
              background: '#fff5f0',
              padding: 16,
              borderRadius: 8,
              marginBottom: 20,
              borderLeft: '4px solid #0ea5a4'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#6b7280' }}>Total Amount</span>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#0ea5a4' }}>
                  ₱{amount.toFixed(2)}
                </span>
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>
                Payment Method: <strong>GCash / PayMaya</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={onClose}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: 10,
                  border: '1px solid #e5e7eb',
                  background: '#fff',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#6b7280',
                  opacity: loading ? 0.6 : 1
                }}
              >
                Back
              </button>

              <button
                onClick={handlePayment}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: 10,
                  background: '#0ea5a4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Processing...' : 'Show QR Code'}
              </button>
            </div>

            <div style={{
              marginTop: 16,
              padding: 12,
              background: '#f0fdf4',
              borderRadius: 8,
              fontSize: 12,
              color: '#15803d',
              textAlign: 'center'
            }}>
              💚 Fast & Secure Payment
            </div>
          </>
        ) : (
          <>
            <h2 style={{ margin: '0 0 16px 0', fontSize: 20, fontWeight: 700, textAlign: 'center' }}>
              Scan QR Code to Pay
            </h2>

            <div style={{
              background: '#f7fafc',
              padding: 16,
              borderRadius: 8,
              marginBottom: 16,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 12 }}>
                Amount to Pay
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#0ea5a4' }}>
                ₱{amount.toFixed(2)}
              </div>
            </div>

            {/* QR Code Image */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 20,
              padding: 16,
              background: '#f9fafb',
              borderRadius: 8,
              border: '2px solid #e5e7eb'
            }}>
              <img 
                src={receivedQR}
                alt="QR Code" 
                style={{ 
                  maxWidth: 250,
                  height: 'auto',
                  borderRadius: 4
                }} 
              />
            </div>

            <div style={{
              background: '#fef3c7',
              padding: 12,
              borderRadius: 8,
              marginBottom: 16,
              fontSize: 12,
              color: '#92400e',
              textAlign: 'center'
            }}>
              📱 Scan this QR code with your GCash or PayMaya app
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowQR(false)}
                style={{
                  flex: 1,
                  padding: 10,
                  border: '1px solid #e5e7eb',
                  background: '#fff',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: '#6b7280'
                }}
              >
                Back
              </button>

              <button
                onClick={handleQRConfirm}
                style={{
                  flex: 1,
                  padding: 10,
                  background: '#0ea5a4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                ✓ Paid
              </button>
            </div>

            <div style={{
              marginTop: 16,
              padding: 12,
              background: '#eff6ff',
              borderRadius: 8,
              fontSize: 12,
              color: '#1e40af',
              textAlign: 'center'
            }}>
              Click "Paid" after scanning and completing the payment
            </div>
          </>
        )}
      </div>
    </div>
  )
}
