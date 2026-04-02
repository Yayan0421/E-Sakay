import React, { useState, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { apiUrl } from '../../lib/api'
import {
  Home,
  MessageSquare,
  History,
  CreditCard,
  Map,
  HelpCircle,
  Info,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Home', key: 'home', icon: Home },
  { to: '/dashboard/messages', label: 'Messages', key: 'messages', icon: MessageSquare },
  { to: '/dashboard/rides', label: 'Rides', key: 'rides', icon: History },
  { to: '/dashboard/transactions', label: 'Transactions', key: 'transactions', icon: CreditCard },
  { to: '/dashboard/livemap', label: 'Map', key: 'livemap', icon: Map },
  { to: '/dashboard/support', label: 'Support', key: 'support', icon: HelpCircle },
]

export default function ResponsiveNav({ mode = 'desktop' }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const userData = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = () => {
    setShowLogoutModal(false)
    logout()
    navigate('/')
  }

  const isActive = (to) => location.pathname === to

  if (mode === 'mobile') {
    return (
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon
          const active = isActive(item.to)
          return (
            <Link
              key={item.key}
              to={item.to}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
                active
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-teal-600'
              }`}
              title={item.label}
            >
              <Icon size={24} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}

        {/* Mobile Profile/Menu */}
        <Link
          to="/dashboard/profile"
          className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
            isActive('/dashboard/profile')
              ? 'text-teal-600 bg-teal-50'
              : 'text-gray-600 hover:text-teal-600'
          }`}
          title="Profile"
        >
          <User size={24} className="mb-1" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    )
  }

  // Desktop Sidebar Mode
  return (
    <div className="flex flex-col h-full">
      {/* Desktop Sidebar Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            E
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">E-Sakay</h1>
            <p className="text-xs text-gray-500">Passenger</p>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.to)
          return (
            <Link
              key={item.key}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                active
                  ? 'bg-teal-50 text-teal-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Desktop Sidebar Footer */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        <Link
          to="/dashboard/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/dashboard/profile')
              ? 'bg-teal-50 text-teal-600 font-semibold'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <User size={20} />
          <span>Profile</span>
        </Link>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

        {/* User Info */}
        <div className="px-4 py-3 bg-gray-50 rounded-xl mt-4">
          <p className="text-xs text-gray-600">Logged in as</p>
          <p className="text-sm font-semibold text-gray-900 truncate">{userData.email}</p>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
