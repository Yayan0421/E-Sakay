import React, { useState, useEffect } from 'react'
import { AuthContext } from './authContext'

function initializeAuth() {
  const storedUser = localStorage.getItem('user')
  const storedToken = localStorage.getItem('token')
  if (storedUser && storedToken) {
    return { user: JSON.parse(storedUser), token: storedToken, isAuthenticated: true, loading: false }
  }
  return { user: null, token: null, isAuthenticated: false, loading: false }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(initializeAuth)

  // Listen for localStorage changes (for sync across tabs/windows and after logout)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'token') {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        
        if (storedUser && storedToken) {
          setAuth({ user: JSON.parse(storedUser), token: storedToken, isAuthenticated: true, loading: false })
        } else {
          setAuth({ user: null, token: null, isAuthenticated: false, loading: false })
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Also check localStorage changes within the same tab (when Login component updates localStorage)
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')
      
      const newAuthState = (storedUser && storedToken)
        ? { user: JSON.parse(storedUser), token: storedToken, isAuthenticated: true, loading: false }
        : { user: null, token: null, isAuthenticated: false, loading: false }
      
      // Only update if state actually changed
      if (JSON.stringify(newAuthState) !== JSON.stringify(auth)) {
        setAuth(newAuthState)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [auth])

  const login = (email, password) => {
    // This is kept for backwards compatibility but Login.jsx now handles API calls
    if (email && password && password.length >= 6) {
      const userData = { email, id: Date.now() }
      setAuth({ user: userData, isAuthenticated: true, loading: false })
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setAuth({ user: null, token: null, isAuthenticated: false, loading: false })
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: auth.isAuthenticated, user: auth.user, loading: auth.loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
