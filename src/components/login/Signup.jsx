import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Swal from 'sweetalert2'
import '../../styles/signup.css'
import tri2 from '../../assets/Tri2.jpg'

export default function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    password: '',
    passwordConfirm: ''
  })
  const [error, setError] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    const prev = document.body.style.background;
    document.body.style.background = '#00c66a';
    return ()=>{ document.body.style.background = prev }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (!formData.fullname || !formData.email || !formData.mobile || !formData.password || !formData.passwordConfirm) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (!agree) {
      setError('You must agree to the Terms of Service and Privacy Policy')
      setLoading(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      // Call backend to register
      const response = await fetch('http://localhost:4001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullname,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Show success alert with SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'You\'re Now Registered!',
          text: 'Your account has been created successfully.',
          confirmButtonText: 'Go to Login',
          confirmButtonColor: '#f6bc0d',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(() => {
          navigate('/login')
        })
        
        // Reset form
        setFormData({
          fullname: '',
          email: '',
          mobile: '',
          password: '',
          passwordConfirm: ''
        })
        setAgree(false)
      } else {
        setError(data.error || 'Signup failed')
      }
    } catch (err) {
      setError('Network error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
      <div>
        <button type="button" className="signup-back" onClick={()=>navigate(-1)} aria-label="Go back">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div className="signup-inner">
        <div className="signup-box">
          <div className="signup-left">
            <div className="illustration" aria-hidden>
              <div className="illustration-container">
                <img src={tri2} alt="illustration" className="signup-illustration" />
              </div>
            </div>
          </div>

          <div className="signup-card">
            <div className="signup-card-inner">
            <div className="brand">E_Sakay</div>
            <h1 className="signup-title">Create account</h1>

            <form className="signup-form" onSubmit={handleSignup}>
              <label className="field">
                <input name="fullname" type="text" placeholder="Full name" value={formData.fullname} onChange={handleChange} required />
              </label>

              <label className="field">
                <input name="email" type="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
              </label>

              <label className="field">
                <input name="mobile" type="tel" placeholder="Mobile number" value={formData.mobile} onChange={handleChange} required />
              </label>

              <label className="field">
                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="button" className="password-toggle" onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword) }} aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </label>

              <label className="field">
                <input name="passwordConfirm" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" value={formData.passwordConfirm} onChange={handleChange} required />
                <button type="button" className="password-toggle" onClick={(e) => { e.preventDefault(); setShowConfirmPassword(!showConfirmPassword) }} aria-label="Toggle password visibility">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </label>

              {error && <div className="error-message">{error}</div>}

              <button className="btn-primary full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <label className="signup-terms">
              <input type="checkbox" name="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} required />
              <span>By creating an account you agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.</span>
            </label>
            <p className="signup-login">Have an account?<Link to="/login">Log in </Link></p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
