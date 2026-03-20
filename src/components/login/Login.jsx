import React from 'react'
import '../../styles/login.css'
import logo from '../../assets/logo.png'

function Login() {
  return (
    <div className="login-page">
      <div className="login-card card-shadow">
        <img src={logo} alt="E-Sakay" className="login-logo" />
        <h1 className="login-title">E-Sakay Login</h1>
        <p className="login-sub">Hey, Enter your details to get sign in to your account</p>

        <form className="login-form" onSubmit={(e)=>e.preventDefault()}>
          <label className="field email-field">
            <input type="text" placeholder="Enter Email / Phone No" required />
          </label>

          <label className="field pass-field">
            <input type="password" placeholder="Password" required />
            <button type="button" className="hide-toggle"></button>
          </label>

          <div className="help-text">Having trouble in sign in?</div>

          <div className="actions">
            <button className="btn-primary large" type="submit">Sign in</button>
          </div>
        </form>

        <div className="divider"><span>Or Sign in with</span></div>

        <div className="socials">
          <button className="social-btn">G&nbsp; Google</button>
          <button className="social-btn">&nbsp; Apple ID</button>
          <button className="social-btn">f&nbsp; Facebook</button>
        </div>

        <p className="signup-cta">Don't have an account? <a href="#">Sign in?</a></p>
      </div>
    </div>
  )
}

export default Login
