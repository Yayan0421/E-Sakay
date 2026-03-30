import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Swal from 'sweetalert2'
import '../../styles/login.css'
import logo from '../../assets/logo.png.jpg'

function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('http://localhost:4001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        localStorage.setItem('passengerEmail', data.user.email)
        
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome back to E-Sakay',
          confirmButtonText: 'Continue to Dashboard',
          confirmButtonColor: '#f6bc0d',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(() => {
          navigate('/dashboard')
        })
      } else {
        // Show error alerts based on error message
        const errorMessage = data.error || 'Login failed'
        
        if (errorMessage.toLowerCase().includes('not found') || errorMessage.toLowerCase().includes('doesn\'t exist')) {
          Swal.fire({
            icon: 'error',
            title: 'User Not Found',
            text: 'User doesn\'t exist. Please sign up first.',
            confirmButtonText: 'Go to Sign Up',
            confirmButtonColor: '#f6bc0d',
            allowOutsideClick: false
          }).then(() => {
            navigate('/signup')
          })
        } else if (errorMessage.toLowerCase().includes('invalid')) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Incorrect password and email',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#f6bc0d',
            allowOutsideClick: false
          })
          setEmail('')
          setPassword('')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: errorMessage,
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#f6bc0d',
            allowOutsideClick: false
          })
        }
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Network error: ' + err.message,
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#f6bc0d',
        allowOutsideClick: false
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <button className="back-button" onClick={() => navigate(-1)} title="Go back">
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>
      <div className="login-card card-shadow">
        <img src={logo} alt="E-Sakay" className="login-logo" />
        <h1 className="login-title">E-Sakay Login</h1>
        <p className="login-sub">Hey, Enter your details to get sign in to your account</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="field email-field">
            <input 
              type="text" 
              placeholder="Enter Email / Phone No" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </label>

          <label className="field pass-field">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button type="button" className="hide-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>



          <div className="help-text">Having trouble in sign in?</div>

          <div className="actions">
            <button className="btn-primary large" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="divider"><span>Or Sign in with</span></div>

        <div className="socials">
          <button className="social-btn">G&nbsp; Google</button>
          <button className="social-btn">&nbsp; Apple ID</button>
          <button className="social-btn">f&nbsp; Facebook</button>
        </div>

        <p className="signup-cta">Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login
