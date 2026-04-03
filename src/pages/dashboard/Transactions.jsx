import React, { useState, useEffect, useCallback } from 'react'
import { useOutletContext } from 'react-router-dom'
import Swal from 'sweetalert2'
import { apiUrl } from '../../lib/api'

export default function Transactions() {
  const { collapsed } = useOutletContext() || { collapsed: false }
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirming, setConfirming] = useState(null)
  
  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  const passengerEmail = userData.email || localStorage.getItem('passengerEmail')

  const fetchTransactions = useCallback(async () => {
    try {
      if (!passengerEmail) {
        console.log('No email found')
        setLoading(false)
        return
      }

      console.log('Fetching transactions for email:', passengerEmail)
      const response = await fetch(apiUrl(`/api/payments/history?passengerEmail=${encodeURIComponent(passengerEmail)}`))
      const data = await response.json()
      
      console.log('Transaction response:', data)
      
      if (data.data && Array.isArray(data.data)) {
        const sortedTransactions = data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        console.log('Sorted transactions:', sortedTransactions)
        setTransactions(sortedTransactions)
      } else {
        console.warn('No transaction data returned:', data)
        setTransactions([])
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching transactions:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch transactions: ' + error.message,
        confirmButtonColor: '#0ea5a4'
      })
      setLoading(false)
    }
  }, [passengerEmail])

  useEffect(() => {
    fetchTransactions()
    const interval = setInterval(fetchTransactions, 5000)
    return () => clearInterval(interval)
  }, [fetchTransactions])

  const handleConfirmPayment = async (transactionId) => {
    setConfirming(transactionId)
    
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
          text: 'Your payment has been marked as paid.',
          confirmButtonColor: '#0ea5a4'
        })
        await fetchTransactions()
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Payment Status',
          text: `Status: ${data.data.status}`,
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
      setConfirming(null)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading transactions...</p>
      </div>
    )
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'paid':
        return '✓ Paid'
      case 'pending':
        return '⏳ Pending'
      case 'failed':
        return '✗ Failed'
      default:
        return status
    }
  }

  return (
    <div className={`transactions-wrapper ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      {/* Header */}
      <div className="transactions-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
              💳 Transactions
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              View and manage your ride payments {passengerEmail ? `(${passengerEmail})` : ''}
            </p>
          </div>
          <button
            onClick={fetchTransactions}
            disabled={loading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#0ea5a4',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? '⟳ Refreshing...' : '⟳ Refresh'}
          </button>
        </div>
      </div>

      {/* Content */}
      {transactions.length === 0 ? (
        <div className="transactions-empty">
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📋</div>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            No transactions yet. Make your first ride payment!
          </p>
        </div>
      ) : (
        <div className="transactions-grid">
          {transactions.map((tx) => (
            <div key={tx.id} className="transaction-card">
              <div className="card-header">
                <div className="card-title">
                  <div className="transaction-icon">💳</div>
                  <div>
                    <div className="card-amount">₱{(tx.amount / 100).toFixed(2)}</div>
                    <div className="card-id">ID: {tx.id?.substring(0, 12)}...</div>
                  </div>
                </div>
                <span className={`status-badge status-${tx.status}`}>
                  {getStatusLabel(tx.status)}
                </span>
              </div>

              <div className="card-body">
                <div className="card-row">
                  <span className="card-label">Status:</span>
                  <span className="card-value">{tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span>
                </div>
                {tx.pickup_address && (
                  <div className="card-row">
                    <span className="card-label">From:</span>
                    <span className="card-value">{tx.pickup_address}</span>
                  </div>
                )}
                {tx.dropoff_address && (
                  <div className="card-row">
                    <span className="card-label">To:</span>
                    <span className="card-value">{tx.dropoff_address}</span>
                  </div>
                )}
                <div className="card-row">
                  <span className="card-label">Date:</span>
                  <span className="card-value">{new Date(tx.created_at).toLocaleDateString()}</span>
                </div>
                <div className="card-row">
                  <span className="card-label">Time:</span>
                  <span className="card-value">{new Date(tx.created_at).toLocaleTimeString()}</span>
                </div>
                <div className="card-row">
                  <span className="card-label">Payment Method:</span>
                  <span className="card-value">{tx.payment_method || 'GCash'}</span>
                </div>
              </div>

              <div className="card-footer">
                {tx.status === 'pending' ? (
                  <button
                    onClick={() => handleConfirmPayment(tx.id)}
                    disabled={confirming === tx.id}
                    className="btn-confirm"
                  >
                    {confirming === tx.id ? 'Confirming...' : 'Confirm Payment'}
                  </button>
                ) : (
                  <button className="btn-confirmed" disabled>
                    {tx.status === 'paid' ? '✓ Confirmed' : '✗ Failed'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {transactions.length > 0 && (
        <div className="transactions-summary">
          <div className="summary-card">
            <div className="summary-label">Total Paid</div>
            <div className="summary-value paid">
              ₱{(transactions.filter(t => t.status === 'paid').reduce((sum, t) => sum + t.amount, 0) / 100).toFixed(2)}
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-label">Pending</div>
            <div className="summary-value pending">
              ₱{(transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0) / 100).toFixed(2)}
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-label">Total Transactions</div>
            <div className="summary-value total">
              {transactions.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
