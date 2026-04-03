import React, { useState, useEffect, useRef, useCallback } from 'react'
import { apiUrl } from '../../lib/api'
import { MessageCircle, Send, Phone, Video, MoreVertical, Search, Clock, AlertCircle } from 'lucide-react'
import '../../styles/messages.css'

export default function Message(){
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
		<div className="messages-container-wrapper">
			{/* Left Sidebar - Bookings & Drivers */}
			<aside className="messages-sidebar">
				{/* Bookings List */}
				<div className="messages-section">
					<div className="messages-section-header">
						<MessageCircle size={18} className="messages-section-icon" />
						<h3 className="messages-section-title">Active Bookings</h3>
					</div>
					<div className="messages-bookings-list">
						{pendingBookings.length > 0 ? pendingBookings.map(booking => (
							<button
								key={booking.id}
								onClick={() => handleSelectBooking(booking)}
								className={`messages-booking-item ${selectedBooking?.id === booking.id ? 'active' : ''}`}
							>
								<div className="booking-item-header">
									<Clock size={14} className="booking-item-icon" />
									<span className="booking-item-status">{booking.status}</span>
								</div>
								<div className="booking-item-location">
									<div className="booking-item-from">📍 {booking.pickup_address?.substring(0, 20)}...</div>
									<div className="booking-item-arrow">→</div>
									<div className="booking-item-to">📍 {booking.dropoff_address?.substring(0, 20)}...</div>
								</div>
							</button>
						)) : (
							<div className="messages-empty-state">
								<AlertCircle size={24} />
								<p>No active bookings</p>
							</div>
						)}
					</div>
				</div>

				{/* Drivers List */}
				<div className="messages-section messages-drivers-section">
					<div className="messages-section-header">
						<Phone size={18} className="messages-section-icon" />
						<h3 className="messages-section-title">Available Drivers</h3>
					</div>
					<ul className="messages-drivers-list">
						{drivers.length > 0 ? drivers.slice(0, 5).map(d => (
							<li key={d.id} className="messages-driver-item">
								<div className="driver-avatar">
									{d.name?.split(' ').map(n=>n[0]).slice(0,2).join('') || 'D'}
								</div>
								<div className="driver-info">
									<div className="driver-name">{d.name}</div>
									<div className="driver-status">🟢 Online</div>
								</div>
							</li>
						)) : (
							<li className="messages-empty-state" style={{margin: '20px 0'}}>
								<p>No drivers available</p>
							</li>
						)}
					</ul>
				</div>
			</aside>

			{/* Right Section - Chat Area */}
			<section className="messages-chat-section">
				{selectedBooking ? (
					<>
						{/* Chat Header */}
						<header className="messages-chat-header">
							<div className="chat-header-content">
								<MessageCircle size={24} className="chat-header-icon" />
								<div>
									<div className="chat-header-title">Booking #{selectedBooking.id?.substring(0, 8)}</div>
									<div className="chat-header-subtitle">
										{selectedBooking.pickup_address} → {selectedBooking.dropoff_address}
									</div>
								</div>
							</div>
							<div className="chat-header-actions">
								<button className="chat-action-btn" title="Call driver">
									<Phone size={18} />
								</button>
								<button className="chat-action-btn" title="Video call">
									<Video size={18} />
								</button>
								<button className="chat-action-btn" title="More options">
									<MoreVertical size={18} />
								</button>
							</div>
						</header>

						{/* Messages Area */}
						<div className="messages-chat-body">
							{messages.length > 0 ? messages.map((msg, idx) => (
								<div 
									key={idx} 
									className={`chat-message ${msg.sender_type === 'passenger' ? 'sent' : 'received'}`}
								>
									<div className="chat-message-avatar">
										{msg.sender_name?.[0] || msg.sender_email?.[0] || 'D'}
									</div>
									<div className="chat-message-bubble">
										<div className="chat-message-sender">
											{msg.sender_name || msg.sender_email}
										</div>
										<div className="chat-message-text">
											{msg.message_text}
										</div>
										<div className="chat-message-time">
											{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
										</div>
									</div>
								</div>
							)) : (
								<div className="messages-chat-empty">
									<MessageCircle size={48} />
									<p>No messages yet</p>
									<span>Start the conversation with your driver!</span>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						{/* Message Input */}
						<footer className="messages-chat-footer">
							<form onSubmit={handleSendMessage} className="messages-chat-form">
								<input 
									type="text"
									placeholder="Type your message..." 
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									className="messages-chat-input"
									disabled={loading}
								/>
								<button 
									type="submit"
									className="messages-send-btn"
									disabled={loading || !newMessage.trim()}
									title="Send message"
								>
									<Send size={18} />
								</button>
							</form>
						</footer>
					</>
				) : (
					<div className="messages-chat-empty">
						<MessageCircle size={64} />
						<p>Select a booking to start messaging</p>
						<span>Choose an active booking from the left panel</span>
					</div>
				)}
			</section>
		</div>
	)
}
