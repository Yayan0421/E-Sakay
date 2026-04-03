import React, { useState, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { apiUrl } from '../../lib/api'
import logo from '../../assets/logo.png.jpg'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', key: 'dashboard', icon: 'home' },
  { to: '/dashboard/messages', label: 'Messages', key: 'messages', icon: 'chat' },
  { to: '/dashboard/rides', label: 'Rides History', key: 'rides', icon: 'calendar' },
  { to: '/dashboard/transactions', label: 'Transactions', key: 'transactions', icon: 'credit' },
  { to: '/dashboard/livemap', label: 'Live Map', key: 'livemap', icon: 'map' },
  { to: '/dashboard/support', label: 'Support', key: 'support', icon: 'sos' },
  { to: '/dashboard/about', label: 'About Us', key: 'about', icon: 'info' },
]

function Icon({ name }) {
  switch (name) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 11.5L12 4l9 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 21h14a1 1 0 0 0 1-1V11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 21V13h6v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'chat':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="white" strokeWidth="1.5"/>
          <path d="M16 3v4M8 3v4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'sos':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5"/>
          <path d="M12 7v6l3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'info':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5"/>
          <path d="M12 8h.01M11 12h1v4h1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'map':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l6-3h6l6 3M3 7l6 3m0 4v-3m6-3v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'tracking':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" stroke="white" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="4" fill="white"/>
          <path d="M12 6v2m0 8v2m-6-6h2m8 0h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'credit':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="1.5"/>
          <path d="M2 10h20" stroke="white" strokeWidth="1.5"/>
          <path d="M4 17h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    default:
      return null
  }
}

export default function Sidenavbar({ collapsed, setCollapsed }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [pendingBookings, setPendingBookings] = useState([])
  const userData = JSON.parse(localStorage.getItem('user') || '{}')

  const fetchPendingBookings = useCallback(async () => {
    try {
      if (!userData.email) {
        console.log('No email found in userData')
        return
      }
      console.log('Fetching pending bookings for:', userData.email)
      const response = await fetch(apiUrl(`/api/bookings/passenger?passengerEmail=${encodeURIComponent(userData.email)}`))
      const data = await response.json()
      console.log('API Response:', data)
      if (data.data) {
        const pending = data.data.filter(b => b.status === 'pending')
        console.log('Pending bookings:', pending)
        setPendingBookings(pending)
      } else {
        console.log('No data in response')
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }, [userData.email])

  // Fetch pending bookings
  React.useEffect(() => {
    fetchPendingBookings()
    // Refresh bookings every 5 seconds
    const interval = setInterval(fetchPendingBookings, 5000)
    return () => clearInterval(interval)
  }, [fetchPendingBookings])

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    setShowLogoutModal(false)
    logout()
    navigate('/')
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  return (
    <aside className={"sidenav" + (collapsed ? ' collapsed' : '')}>
      <div className="sidenav-top">
        <div className="brand">
          <div className="brand-logo">
            <img src={logo} alt="E-Sakay Logo" className="logo-img" />
          </div>
          <div className="brand-title">E-Sakay</div>
          <button
            className={"collapse-btn" + (collapsed ? ' collapsed' : '')}
            aria-label={collapsed ? 'expand' : 'collapse'}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
            return (
              <Link
                to={item.to}
                key={item.key}
                className={"nav-item" + (active ? ' active' : '')}
                title={item.label}
              >
                <div className="icon-wrap">
                  <Icon name={item.icon} />
                </div>
                <span className="label">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Pending Bookings Section */}
        {pendingBookings.length > 0 && (
          <div className="pending-bookings-section">
            <div className="pending-bookings-header">
              <span className="pending-title">Pending Bookings</span>
              <span className="pending-badge">{pendingBookings.length}</span>
            </div>
            <div className="pending-bookings-list">
              {pendingBookings.map((booking, index) => (
                <div key={booking.id || index} className="pending-booking-item">
                  <div className="booking-info">
                    <div className="booking-pickup">
                      <span className="booking-label">From:</span>
                      <span className="booking-address">{booking.pickup_address || 'Pickup Location'}</span>
                    </div>
                    <div className="booking-dropoff">
                      <span className="booking-label">To:</span>
                      <span className="booking-address">{booking.dropoff_address || 'Dropoff Location'}</span>
                    </div>
                  </div>
                  <div className="booking-status">
                    <span className="status-badge">Waiting for Driver</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="sidenav-bottom">
        <div className="profile">
          <div className="avatar">{user?.email?.charAt(0).toUpperCase() || 'U'}</div>
          <div className="profile-info">
            <div className="name">{user?.email || 'User'}</div>
            <div className="role">Passenger</div>
          </div>
        </div>
        <button onClick={handleLogoutClick} className="logout">
          <div className="logout-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 17l5-5-5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logout-text">Log Out</span>
        </button>
      </div>

      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3 className="logout-modal-title">Confirm Logout</h3>
            <p className="logout-modal-message">Are you sure you want to log out?</p>
            <div className="logout-modal-buttons">
              <button onClick={cancelLogout} className="logout-modal-cancel">Cancel</button>
              <button onClick={confirmLogout} className="logout-modal-yes">Yes, Log Out</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
