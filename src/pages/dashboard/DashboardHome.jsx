import React from 'react'
import BookingPage from '../../components/dashboard/BookingPage'
import '../../styles/booking.css'
import '../../styles/homedashboard.css'

export default function DashboardHome(){
  return (
    <div className="max-w-4xl mx-auto">
      <BookingPage />
    </div>
  )
}
