import React, { useState, useEffect, useRef, useCallback } from 'react'
import { apiUrl } from '../../lib/api'
import '../../styles/messages.css'

export default function Message({ collapsed = false }){
	const [pendingBookings, setPendingBookings] = useState([])
	const [selectedBooking, setSelectedBooking] = useState(null)
	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const [drivers, setDrivers] = useState([])
	const messagesEndRef = useRef(null)
	const userData = JSON.parse(localStorage.getItem('user') || '{}')

	// Fetch pending bookings
	const fetchPendingBookings = useCallback(async () => {
		try {
			console.log('Fetching pending bookings for:', userData.email)
			const response = await fetch(apiUrl(`/api/bookings/passenger?passengerEmail=${encodeURIComponent(userData.email)}`))
			const data = await response.json()
			console.log('Bookings fetched:', data.data)
			if (data.data) {
				const pending = data.data.filter(b => b.status === 'pending' || b.status === 'accepted')
				setPendingBookings(pending)
			}
		} catch (error) {
			console.error('Error fetching bookings:', error)
		}
	}, [userData.email])

	// Fetch all drivers
	const fetchDrivers = useCallback(async () => {
		try {
			console.log('Fetching drivers...')
			const response = await fetch(apiUrl('/api/messages/drivers'))
			const data = await response.json()
			console.log('Drivers fetched:', data.data)
			setDrivers(data.data || [])
		} catch (error) {
			console.error('Error fetching drivers:', error)
		}
	}, [])

	// Fetch messages for selected booking
	const fetchMessages = useCallback(async () => {
		if (!selectedBooking || !userData.email) return
		try {
			console.log('Fetching messages for booking:', selectedBooking.id)
			const response = await fetch(apiUrl(`/api/messages/conversation?bookingId=${encodeURIComponent(selectedBooking.id)}`))
			const data = await response.json()
			console.log('Messages fetched:', data.data?.length, 'messages')
			setMessages(data.data || [])
		} catch (error) {
			console.error('Error fetching messages:', error)
		}
	}, [selectedBooking, userData.email])

	// Fetch on mount
	useEffect(() => {
		if (userData.email) {
			fetchPendingBookings()
			fetchDrivers()
		}
	}, [userData.email, fetchPendingBookings, fetchDrivers])

	// Auto-refresh messages every 3 seconds
	useEffect(() => {
		if (selectedBooking && userData.email) {
			fetchMessages()
			const interval = setInterval(fetchMessages, 3000)
			return () => clearInterval(interval)
		}
	}, [selectedBooking, userData.email, fetchMessages])

	// Scroll to bottom when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	// Select a booking
	const handleSelectBooking = async (booking) => {
		console.log('Selected booking:', booking)
		setSelectedBooking(booking)
	}

	// Send message
	const handleSendMessage = async (e) => {
		e.preventDefault()
		if (!newMessage.trim() || !selectedBooking || !userData.email) return

		setLoading(true)
		try {
			console.log('Sending message for booking', selectedBooking.id)
			const response = await fetch(apiUrl('/api/messages/send'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					bookingId: selectedBooking.id,
					senderEmail: userData.email,
					senderName: userData.name,
					message: newMessage
				})
			})

			if (response.ok) {
				console.log('Message sent successfully')
				setNewMessage('')
				// Refresh messages
				await fetchMessages()
			} else {
				const error = await response.json()
				console.error('Error sending message:', error)
			}
		} catch (error) {
			console.error('Error sending message:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div style={{display:'flex', height: '80vh', gap:24, transition: 'all 180ms ease'}} className={collapsed ? 'message-container-collapsed' : ''}>
			<aside style={{width:320, background:'#f7fafc', borderRadius:8, padding:12, boxShadow:'0 2px 6px rgba(12,30,60,0.04)', border:'1px solid #eef2f7'}}>
				<div style={{padding:'8px 6px', marginBottom: 12}}>
					<h3 style={{margin: '0 0 8px 0', fontSize: 14, fontWeight: 600}}>Your Bookings</h3>
					<div style={{maxHeight: 250, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4}}>
						{pendingBookings.length > 0 ? pendingBookings.map(booking => (
							<button
								key={booking.id}
								onClick={() => handleSelectBooking(booking)}
								style={{
									padding: '10px',
									borderRadius: 6,
									border: selectedBooking?.id === booking.id ? '2px solid #f6bc0d' : '1px solid #e6eef6',
									background: selectedBooking?.id === booking.id ? '#fffbf0' : '#fff',
									cursor: 'pointer',
									textAlign: 'left',
									fontSize: 12,
									fontWeight: 500,
									transition: 'all 200ms ease'
								}}
							>
								<div style={{fontWeight: 600, color: '#1f2937'}}>{booking.pickup_address?.substring(0, 20)}...</div>
								<div style={{fontSize: 11, color: '#9ca3af', marginTop: 2}}>To: {booking.dropoff_address?.substring(0, 20)}...</div>
								<div style={{fontSize: 10, color: '#6b7280', marginTop: 2}}>Status: {booking.status}</div>
							</button>
						)) : (
							<div style={{padding: 10, color: '#9ca3af', fontSize: 13}}>No active bookings</div>
						)}
					</div>
				</div>
				<div style={{padding:'8px 6px'}}>
					<h3 style={{margin: '0 0 8px 0', fontSize: 14, fontWeight: 600}}>Available Drivers</h3>
					<ul style={{listStyle:'none', margin:0, padding:0, maxHeight: 200, overflowY: 'auto'}}>
						{drivers.length > 0 ? drivers.slice(0, 5).map(d => (
							<li 
								key={d.id}
								style={{display:'flex', alignItems:'center', gap:8, padding:'8px', borderRadius:6, fontSize: 12, color: '#6b7280'}}
							>
								<div style={{width:28, height:28, borderRadius:'50%', background:'#e2edf8', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize: 10}}>
									{d.name?.split(' ').map(n=>n[0]).slice(0,2).join('') || 'D'}
								</div>
								<span>{d.name}</span>
							</li>
						)) : <li style={{padding: 10, color: '#9ca3af', fontSize: 13}}>No drivers available</li>}
					</ul>
				</div>
			</aside>

			<section style={{flex:1, display:'flex', flexDirection:'column', background:'#fff', borderRadius:8, boxShadow:'0 2px 8px rgba(12,30,60,0.04)', border:'1px solid #eef2f7'}}>
				{selectedBooking ? (
					<>
						<header style={{padding:16, borderBottom:'1px solid #eef2f7', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
							<div>
								<div style={{fontWeight:700, fontSize: 16}}>Booking #{selectedBooking.id?.substring(0, 8)}</div>
								<div style={{fontSize:13, color:'#6b7280', marginTop: 2}}>
									From: {selectedBooking.pickup_address}
								</div>
								<div style={{fontSize:13, color:'#6b7280', marginTop: 2}}>
									To: {selectedBooking.dropoff_address}
								</div>
							</div>
							<div style={{display:'flex', gap:12}}>
								<button style={{border:'none', background:'transparent', cursor:'pointer', fontSize: 18}}>🔍</button>
								<button style={{border:'none', background:'transparent', cursor:'pointer', fontSize: 18}}>⚙️</button>
							</div>
						</header>

						<div style={{flex:1, padding:20, overflowY:'auto', display: 'flex', flexDirection: 'column'}}>
							{messages.length > 0 ? messages.map((msg, idx) => (
								<div key={idx} style={{display:'flex', justifyContent: msg.sender_type === 'passenger' ? 'flex-end' : 'flex-start', marginBottom:12}}>
									<div style={{
										background: msg.sender_type === 'passenger' ? '#dbeafe' : '#f1f5f9',
										padding:12,
										borderRadius:12,
										maxWidth:'60%',
										border: msg.sender_type === 'passenger' ? '1px solid #dbefff' : '1px solid #e6eef6',
										wordBreak: 'break-word'
									}}>
										<div style={{fontSize: 12, fontWeight: 500, marginBottom: 4, color: '#6b7280'}}>
											{msg.sender_name || msg.sender_email}
										</div>
										{msg.message_text}
										<div style={{fontSize: 11, color: '#9ca3af', marginTop: 4}}>
											{new Date(msg.created_at).toLocaleTimeString()}
										</div>
									</div>
								</div>
							)) : (
								<div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af'}}>
									No messages yet. Start the conversation!
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						<footer style={{padding:12, borderTop:'1px solid #eef2f7', display:'flex', gap:8, alignItems:'center'}}>
							<form onSubmit={handleSendMessage} style={{display: 'flex', gap: 8, width: '100%'}}>
								<input 
									placeholder="Type a message" 
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									style={{flex:1, padding:10, borderRadius:8, border:'1px solid #e6eef6', outline:'none'}}
									disabled={loading}
								/>
								<button 
									type="submit"
									style={{background:'#0ea5a4', color:'#fff', border:'none', padding:'10px 14px', borderRadius:8, cursor:'pointer', opacity: loading ? 0.6 : 1}}
									disabled={loading}
								>
									{loading ? 'Sending...' : 'Send'}
								</button>
							</form>
						</footer>
					</>
				) : (
					<div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af'}}>
						Select a booking to start chatting
					</div>
				)}
			</section>
		</div>
	)
}
