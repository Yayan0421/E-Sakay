import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import cp from '../../assets/cp.png'

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-left">
          <h1 className="hero-title">Ride the <span className="accent">Future</span> with <span className="accent-green">E-Sakay</span></h1>
          <p className="hero-desc">Your reliable transportation solution. Book motorcycles and tricycles, track your driver in real-time, and get where you need to go safely.</p>

          <div className="hero-actions">
            <Link to="/login" className="btn-primary">Log In</Link>
            <Link to="/signup" className="btn-primary">Sign Up</Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">50K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">100K+</div>
              <div className="stat-label">Rides Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">4.8★</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="vehicle">
            <img src={cp} alt="E-Sakay App" className="vehicle-img" />
          </div>
        </div>
      </main>

      {/* Why Choose Us Section */}
      <section className="features-section" id="why-us">
        <div className="features-wrapper">
          <div className="section-header">
            <h2>Why Choose <span className="accent-green">E-Sakay?</span></h2>
            <p>Experience the future of <span className="text-green">urban transportation</span></p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Book a ride in seconds with our intelligent matching algorithm</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">�️</div>
              <h3>Trusted Vehicles</h3>
              <p>Well-maintained motorcycles and tricycles for your comfort</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Affordable</h3>
              <p>Competitive pricing with transparent, no-hidden-fee pricing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Safe & Secure</h3>
              <p>Verified drivers and real-time tracking for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
