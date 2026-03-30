# PayMongo Payment Integration Guide

## Setup Complete ✅

Your backend payment system is now running! Here's how to integrate it into your React frontend.

---

## 1. **Add Payment Button to Active Bookings**

Your passengers need a way to pay for bookings. Add a "Pay Now" button in your active rides/bookings display.

### Option A: Add to Ride Confirmation Modal (Current)

In your booking confirmation modal, add this button:

```jsx
{paymentMethod === 'online' && rideData && (
  <button 
    onClick={() => setShowPaymentModal(true)}
    style={{
      width: '100%',
      padding: '12px',
      marginTop: '12px',
      background: '#0ea5a4',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer'
    }}
  >
    Pay with GCash
  </button>
)}
```

### Option B: Add to Rides History Page

In **RidesHistory.jsx**, add a payment button for pending/unpaid rides:

```jsx
{ride.status === 'completed' && !ride.is_paid && (
  <button 
    onClick={() => handlePaymentClick(ride)}
    style={{ background: '#0ea5a4', color: '#fff', padding: '8px 16px' }}
  >
    Pay Now
  </button>
)}
```

---

## 2. **Use the Payment Modal Component**

Import and display the PaymentModal:

```jsx
import PaymentModal from '../components/dashboard/PaymentModal'

// In your component:
const [showPaymentModal, setShowPaymentModal] = useState(false)
const [selectedBooking, setSelectedBooking] = useState(null)

// Handler
const handlePaymentClick = (booking) => {
  setSelectedBooking(booking)
  setShowPaymentModal(true)
}

// JSX
{showPaymentModal && selectedBooking && (
  <PaymentModal
    booking={selectedBooking}
    onClose={() => setShowPaymentModal(false)}
    onPaymentSuccess={() => {
      setShowPaymentModal(false)
      // Refresh bookings list
    }}
  />
)}
```

---

## 3. **Handle Payment Callbacks**

When user completes/fails payment on PayMongo, they're redirected back with URL params. Use the hook:

```jsx
import usePaymentCallback from '../hooks/use-payment-callback'

export default function DashboardHome() {
  const { paymentStatus, isChecking, clearPaymentStatus } = usePaymentCallback()

  useEffect(() => {
    if (paymentStatus) {
      Swal.fire({
        icon: paymentStatus.type === 'success' ? 'success' : 'error',
        title: paymentStatus.type === 'success' ? 'Payment Successful!' : 'Payment Failed',
        text: paymentStatus.message,
        confirmButtonColor: '#0ea5a4'
      }).then(() => {
        clearPaymentStatus()
        // Refresh data
      })
    }
  }, [paymentStatus])

  if (isChecking) return <div>Verifying payment...</div>

  return (
    // Your dashboard component
  )
}
```

---

## 4. **Backend Endpoints Ready**

All payment endpoints are now active:

### Create Payment
```bash
POST http://localhost:4001/api/payments/create-payment

Body:
{
  "bookingId": "uuid",
  "amount": 150,
  "passengerEmail": "user@example.com",
  "passengerName": "John Doe"
}

Response:
{
  "transaction_id": "uuid",
  "payment_id": "pay_xxxxx",
  "checkout_url": "https://checkout.paymongo.com/xxx"
}
```

### Check Payment Status
```bash
GET http://localhost:4001/api/payments/status?transactionId=uuid

Response:
{
  "id": "uuid",
  "status": "paid|pending|failed",
  "amount": 150,
  "paymongo_payment_id": "pay_xxxxx",
  ...
}
```

### Get Transaction History
```bash
GET http://localhost:4001/api/payments/history?passengerEmail=user@example.com

Response: Array of all transactions for passenger
```

---

## 5. **Important: Create Transactions Table in Supabase**

Run this SQL in your Supabase SQL Editor to create the transactions table:

```sql
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES public.bookings(id),
  passenger_email VARCHAR(255) NOT NULL,
  passenger_name VARCHAR(255),
  amount BIGINT NOT NULL, -- in cents (e.g., 15000 = ₱150)
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_method VARCHAR(50) DEFAULT 'GCash',
  paymongo_payment_id VARCHAR(255),
  paymongo_checkout_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_transactions_passenger_email ON public.transactions(passenger_email);
CREATE INDEX IF NOT EXISTS idx_transactions_booking_id ON public.transactions(booking_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_paymongo_payment_id ON public.transactions(paymongo_payment_id);
```

---

## 6. **Testing Payment Flow**

### Test Steps:
1. ✅ Create a new booking
2. ✅ Click "Pay with GCash" button
3. ✅ Review payment details in modal
4. ✅ Click "Pay with GCash" button
5. ✅ You'll be redirected to PayMongo checkout (test mode)
6. ✅ Use test GCash number: `09171234567`
7. ✅ Any OTP works in test mode (e.g., `123456`)
8. ✅ After payment, you're redirected back with success params
9. ✅ Transaction saved in database with `status: 'paid'`

### Webhook Testing:
PayMongo sends webhooks to confirm payments. For local testing:
- Use ngrok: `ngrok http 4001`
- Register webhook: `https://your-ngrok-url/api/payments/webhook`
- PayMongo will call this when payment is confirmed

---

## 7. **Frontend Files Created**

### New Components:
- **`src/components/dashboard/PaymentModal.jsx`**
  - Beautiful payment modal with booking details
  - Shows amount, addresses, booking ID
  - Calls backend to create payment
  - Redirects to PayMongo checkout

### New Hooks:
- **`src/hooks/use-payment-callback.jsx`**
  - Detects payment_success/payment_failed URL params
  - Checks transaction status from backend
  - Provides payment status to components

---

## 8. **Environment Variables (Already Set)**

Your `.env` now has:
```
PAYMONGO_PUBLIC_KEY=pk_test_mwPRVQKMfsmkAsu33Lvwbg2u
PAYMONGO_SECRET_KEY=sk_test_XpAedV4RiJ8UpQvpGKMS6FAM
```

---

## 9. **Common Issues & Solutions**

### Issue: "Cannot read property 'passengerEmail' of null"
**Solution:** Make sure `passengerEmail` is stored in localStorage during login:
```jsx
localStorage.setItem('passengerEmail', data.user.email)
```

### Issue: Payment modal not showing
**Solution:** Import PaymentModal correctly:
```jsx
import PaymentModal from '../components/dashboard/PaymentModal'
```

### Issue: "Cannot GET /api/payments/create-payment"
**Solution:** Backend might be down. Check terminal:
```bash
cd backend
npm start
```

### Issue: PayMongo returns error
**Solution:** Check console logs. Ensure:
- ✅ Amount is in cents (multiply by 100)
- ✅ Email and name are not empty
- ✅ BookingId exists in database
- ✅ Credentials are correct

---

## 10. **Next Steps**

1. ✅ **[REQUIRED - DO THIS NOW]** Execute the SQL in Supabase
2. ✅ **Integrate PaymentModal** into your booking flow
3. ✅ **Test payment flow** with test credentials
4. ✅ **Create Transaction History page** to show all payments
5. ✅ **Set up webhooks** for production (requires public URL)
6. ✅ **Update booking status** to mark as paid when payment succeeds

---

## Status Summary

|Component|Status|
|---------|------|
|Backend Payment System|✅ Running|
|PayMongo Credentials|✅ Configured|
|Payment Routes|✅ Mounted at /api/payments|
|Payment Modal Component|✅ Created|
|Payment Callback Hook|✅ Created|
|Transactions Table|🔴 Need to Create (SQL Provided)|
|Frontend Integration|🟡 Ready for Integration|
|Testing|🟡 Ready (table needed first)|

---

## Questions?

Check your backend logs:
```
cd backend
npm start
```

Check browser console for frontend errors (F12)

Review the Payment Modal component docs inline for customization.
