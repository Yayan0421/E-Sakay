import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  MessageSquare,
  History,
  CreditCard,
  User,
} from 'lucide-react'
import '../../styles/mobile-bottom-nav.css'

export default function MobileBottomNav() {
  const location = useLocation()

  const navItems = [
    { to: '/dashboard', label: 'Home', icon: Home, key: 'home' },
    { to: '/dashboard/messages', label: 'Messages', icon: MessageSquare, key: 'messages' },
    { to: '/dashboard/rides', label: 'Rides', icon: History, key: 'rides' },
    { to: '/dashboard/transactions', label: 'Transactions', icon: CreditCard, key: 'transactions' },
    { to: '/dashboard/profile', label: 'Profile', icon: User, key: 'profile' },
  ]

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/')

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-nav-container">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.to)
          return (
            <Link
              key={item.key}
              to={item.to}
              className={`mobile-nav-item ${active ? 'active' : ''}`}
            >
              <div className="mobile-nav-icon-wrapper">
                <Icon size={24} className="mobile-nav-icon" strokeWidth={1.5} />
              </div>
              <span className="mobile-nav-label">{item.label}</span>
              {active && <div className="mobile-nav-indicator"></div>}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
