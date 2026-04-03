import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Swal from 'sweetalert2'
import Sidenavbar from '../components/dashboard/Sidenavbar'
import DashboardFooter from '../components/dashboard/dashboardfooter'
import { usePaymentCallback } from '../hooks/use-payment-callback'

export default function Dashboard(){
	const [collapsed, setCollapsed] = useState(false)
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
		<div className="flex flex-col min-h-screen bg-gray-50">
			{/* Payment Verification Modal */}
			{isChecking && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl p-8 text-center shadow-xl">
						<div className="text-4xl mb-4">⏳</div>
						<p className="text-gray-700 font-medium">Verifying payment...</p>
					</div>
				</div>
			)}

			{/* Main Dashboard Layout */}
			<div className="flex flex-1 flex-col lg:flex-row">
				{/* Sidebar - Hidden on mobile, visible on desktop */}
				<div className="hidden lg:block">
					<Sidenavbar collapsed={collapsed} setCollapsed={setCollapsed} />
				</div>

				{/* Main Content */}
				<main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 overflow-auto transition-all duration-300 ease-in-out">
					<Outlet context={{collapsed}} />
				</main>
			</div>

			{/* Dashboard Footer */}
			<div className="mt-auto w-full bg-white border-t border-gray-200">
				<DashboardFooter />
			</div>
		</div>
	)
}
