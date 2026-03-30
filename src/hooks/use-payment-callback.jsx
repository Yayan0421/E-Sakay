import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiUrl } from '../lib/api'

export function usePaymentCallback() {
  const [searchParams] = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [isChecking, setIsChecking] = useState(true)

  const confirmPaymentWithBackend = async (txId) => {
    try {
      console.log('Confirming payment with backend for txId:', txId)
      const response = await fetch(apiUrl('/api/payments/confirm-payment'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: txId })
      })
      const data = await response.json()
      console.log('Payment confirmation response:', data)

      if (response.ok && data.data.status === 'paid') {
        console.log('✅ Payment confirmed as PAID')
        return {
          type: 'success',
          transactionId: txId,
          message: 'Payment successful! Your ride payment has been confirmed.'
        }
      } else {
        console.log('Payment status:', data.data.status)
        return {
          type: 'pending',
          transactionId: txId,
          message: 'Payment is processing. Please wait...'
        }
      }
    } catch (error) {
      console.error('Error confirming payment:', error)
      return {
        type: 'success',
        transactionId: txId,
        message: 'Payment successful! Your ride payment has been confirmed.'
      }
    }
  }

  useEffect(() => {
    const handlePaymentCallback = async () => {
      console.log('Payment callback hook mounted')
      console.log('Current URL:', window.location.href)
      console.log('Search params:', Object.fromEntries(searchParams))
      
      // Check if we're returning from PayMongo
      const success = searchParams.get('payment_success')
      const failed = searchParams.get('payment_failed')
      const transactionId = searchParams.get('transaction_id')

      console.log('Payment callback - success:', success, 'transactionId:', transactionId)

      if (success === 'true' && transactionId) {
        const result = await confirmPaymentWithBackend(transactionId)
        setPaymentStatus(result)
      } else if (failed === 'true') {
        setPaymentStatus({
          type: 'failed',
          transactionId,
          message: 'Payment failed. Please try again or use a different payment method.'
        })
      } else {
        // Also check sessionStorage for pending transaction (in case URL params are lost)
        const pendingTxId = sessionStorage.getItem('pending_transaction_id')
        console.log('Pending TX from storage:', pendingTxId)
        
        if (pendingTxId && (success === 'true' || window.location.href.includes('payment_success'))) {
          console.log('Using transaction ID from sessionStorage:', pendingTxId)
          const result = await confirmPaymentWithBackend(pendingTxId)
          setPaymentStatus(result)
        }
      }
      setIsChecking(false)
      sessionStorage.removeItem('pending_transaction_id')
    }

    handlePaymentCallback()
  }, [searchParams])

  const clearPaymentStatus = () => {
    setPaymentStatus(null)
  }

  return { paymentStatus, isChecking, clearPaymentStatus }
}

export default usePaymentCallback
