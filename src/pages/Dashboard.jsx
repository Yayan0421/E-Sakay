import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Swal from 'sweetalert2'
import Sidenavbar from '../components/dashboard/Sidenavbar'
import DashboardFooter from '../components/dashboard/dashboardfooter'
import { usePaymentCallback } from '../hooks/use-payment-callback'
import '../styles/homedashboard.css'
import '../styles/sidenavbar.css'
import '../styles/App.css'

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
		<div style={{display:'flex', minHeight:'100vh', flexDirection:'column'}}>
			{isChecking && (
				<div style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'rgba(0,0,0,0.5)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 9999
				}}>
					<div style={{
						background: '#fff',
						padding: '24px',
						borderRadius: '12px',
						textAlign: 'center'
					}}>
						<div style={{ fontSize: 24, marginBottom: 16 }}>⏳</div>
						<p>Verifying payment...</p>
					</div>
				</div>
			)}
			<div style={{display:'flex', flex:1}}>
				<Sidenavbar collapsed={collapsed} setCollapsed={setCollapsed} />
			<main style={{flex:1, padding:24, transition: 'all 0.3s ease-in-out', overflow: 'auto'}}>
					<Outlet context={{collapsed}} />
				</main>
			</div>
			<DashboardFooter />
		</div>
	)
}
