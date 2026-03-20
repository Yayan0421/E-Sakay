import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../styles/sidenavbar.css'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', key: 'dashboard', icon: 'home' },
  { to: '/dashboard/messages', label: 'Messages', key: 'messages', icon: 'chat' },
  { to: '/dashboard/rides', label: 'Rides History', key: 'rides', icon: 'calendar' },
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
    default:
      return null
  }
}

export default function Sidenavbar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={"sidenav" + (collapsed ? ' collapsed' : '')}>
      <div className="sidenav-top">
        <div className="brand">
          <div className="brand-logo">C</div>
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
      </div>

      <div className="sidenav-bottom">
        <div className="profile">
          <div className="avatar">KR</div>
          <div className="profile-info">
            <div className="name">Kim Ryan</div>
            <div className="role">Passenger</div>
          </div>
        </div>
        <Link to="/logout" className="logout">
          <div className="logout-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 17l5-5-5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logout-text">Log Out</span>
        </Link>
      </div>
    </aside>
  )
}
