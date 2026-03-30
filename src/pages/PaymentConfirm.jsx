import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { apiUrl } from '../lib/api'

export default function PaymentConfirm() {
  const [searchParams] = useSearchParams()
  const [isConfirming, setIsConfirming] = useState(false)
  
  const transactionId = searchParams.get('transaction_id')
  
  const handleManualConfirm = async () => {
    if (!transactionId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No transaction ID found',
        confirmButtonColor: '#0ea5a4'
      })
      return
    }
    
    setIsConfirming(true)
    
    try {
      const response = await fetch(apiUrl('/api/payments/confirm-payment'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId })
      })
      const data = await response.json()
      
      if (response.ok && data.data.status === 'paid') {
        Swal.fire({
          icon: 'success',
          title: '✅ Payment Confirmed!',
          text: 'Your payment has been successfully processed.',
          confirmButtonColor: '#0ea5a4'
        }).then(() => {
          // Redirect to dashboard home
          window.location.href = '/dashboard'
        })
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Payment Pending',
          text: data.data.status === 'pending' ? 'Payment is still being processed. Please try again in a moment.' : 'Unable to confirm payment. Please contact support.',
          confirmButtonColor: '#0ea5a4'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to confirm payment: ' + error.message,
        confirmButtonColor: '#0ea5a4'
      })
    } finally {
      setIsConfirming(false)
    }
  }
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#f9fafb',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>💳</div>
        
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
          Payment Processing
        </h1>
        
        <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
          Did you complete your GCash payment on PayMongo?
        </p>
        
        {transactionId && (
          <div style={{
            background: '#f3f4f6',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '12px',
            color: '#6b7280',
            wordBreak: 'break-all'
          }}>
            <strong>Transaction ID:</strong> {transactionId}
          </div>
        )}
        
        <button
          onClick={handleManualConfirm}
          disabled={isConfirming || !transactionId}
          style={{
            width: '100%',
            padding: '12px',
            background: '#0ea5a4',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            opacity: isConfirming || !transactionId ? 0.6 : 1,
            marginBottom: '12px'
          }}
        >
          {isConfirming ? 'Confirming...' : 'Confirm & Go to Dashboard'}
        </button>
        
        <button
          onClick={() => window.location.href = '/dashboard'}
          style={{
            width: '100%',
            padding: '12px',
            background: '#e5e7eb',
            color: '#6b7280',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}
