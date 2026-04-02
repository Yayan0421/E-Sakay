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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-6 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center">
        
        {/* Icon */}
        <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">💳</div>
        
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 sm:mb-4">
          Payment Processing
        </h1>
        
        {/* Description */}
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          Did you complete your GCash payment on PayMongo?
        </p>
        
        {/* Transaction ID */}
        {transactionId && (
          <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:py-4 rounded-xl mb-6 sm:mb-8 break-all">
            <p className="text-xs sm:text-sm text-gray-600 font-mono">
              {transactionId}
            </p>
          </div>
        )}
        
        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <button
            onClick={handleManualConfirm}
            disabled={isConfirming}
            className="w-full px-6 py-3 sm:py-4 bg-teal-500 text-white font-bold text-sm sm:text-base rounded-xl hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            {isConfirming ? '⏳ Confirming...' : '✅ Confirm Payment'}
          </button>
          <a
            href="/dashboard"
            className="w-full px-6 py-3 sm:py-4 bg-gray-200 text-gray-900 font-bold text-sm sm:text-base rounded-xl hover:bg-gray-300 transition-colors"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
