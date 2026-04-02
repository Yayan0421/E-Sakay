import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Swal from 'sweetalert2'
import ResponsiveNav from '../components/dashboard/ResponsiveNav'
import { usePaymentCallback } from '../hooks/use-payment-callback'

export default function Dashboard(){
	const { paymentStatus, isChecking, clearPaymentStatus } = usePaymentCallback()

	// Show payment status alerts
	useEffect(() => {
		if (paymentStatus) {
			console.log('Showing payment status alert:', paymentStatus)
			Swal.fire({
				icon: paymentStatus.type === 'success' ? 'success' : 'error',
				title: paymentStatus.type === 'success' ? '✅ Payment Successful!' : '❌ Payment Failed',
				text: paymentStatus.message,
				confirmButtonColor: '#0ea5a4',
				timer: 5000
			}).then(() => {
				clearPaymentStatus()
			})
		}
	}, [paymentStatus, clearPaymentStatus])

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 md:bg-white">
			{/* Payment Verification Loading */}
			{isChecking && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl">
						<div className="text-4xl sm:text-5xl mb-4">⏳</div>
						<p className="text-base sm:text-lg text-gray-700 font-medium">Verifying payment...</p>
					</div>
				</div>
			)}

			{/* Desktop Sidebar Navigation */}
			<div className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200">
				<ResponsiveNav mode="desktop" />
			</div>

			{/* Main Content */}
			<div className="flex-1 md:ml-64 flex flex-col">
				{/* Mobile Top Header */}
				<header className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 shadow-sm">
					<div className="flex items-center justify-between">
						<h1 className="text-lg font-bold text-gray-900">E-Sakay</h1>
						<div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
							P
						</div>
					</div>
				</header>

				{/* Page Content */}
				<main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
					<Outlet />
				</main>

				{/* Mobile Bottom Navigation */}
				<nav className="md:hidden sticky bottom-0 bg-white border-t border-gray-100 px-4 py-2">
					<ResponsiveNav mode="mobile" />
				</nav>
			</div>
		</div>
	)
}
