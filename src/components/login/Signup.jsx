import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/signup.css'
import tri2 from '../../assets/Tri2.jpg'

export default function Signup() {
  const navigate = useNavigate()
  useEffect(()=>{
    const prev = document.body.style.background;
    document.body.style.background = '#00c66a';
    return ()=>{ document.body.style.background = prev }
  },[])
  return (
      <div>
        <button type="button" className="signup-back" onClick={()=>navigate(-1)} aria-label="Go back">← Back</button>
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

            <form className="signup-form" onSubmit={(e)=>e.preventDefault()}>
              <label className="field">
                <input name="fullname" type="text" placeholder="Full name" required />
              </label>

              <label className="field">
                <input name="email" type="email" placeholder="Email address" required />
              </label>

              <label className="field">
                <input name="mobile" type="tel" placeholder="Mobile number" required />
              </label>

              <label className="field">
                <input name="password" type="password" placeholder="Password" required />
              </label>

              <label className="field">
                <input name="passwordConfirm" type="password" placeholder="Confirm password" required />
              </label>

              <button className="btn-primary full">Create account</button>
            </form>

            <label className="signup-terms">
              <input type="checkbox" name="agree" required />
              <span>By creating an account you agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</span>
            </label>
            <p className="signup-login">Have an account? <a href="/login">Log in</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
