import React from 'react'
import Navbar from './navbar'
import tricycle from '../../assets/tricycle.png'

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      <main className="hero">
        <div className="hero-left">
          <h1 className="hero-title">Smart rides, <span className="accent">Simpler lives</span></h1>
          <p className="hero-desc">E-Sakay connects you to affordable, eco-friendly rides — tricycles and motorcycles — right at your fingertips.</p>

          <div className="hero-actions">
            <button className="btn-primary">LOG IN </button>
            <button className="btn-ghost">SIGN UP</button>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-num">5,000+</div>
              <div className="stat-label">Rides Completed</div>
            </div>
            <div className="stat">
              <div className="stat-num">200+</div>
              <div className="stat-label">Active Drivers</div>
            </div>
            <div className="stat">
              <div className="stat-num">4.9★</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="card">
            <div className="badge-top">⚡ 100% Electric<br/><span className="small">Zero emissions</span></div>
            <div className="vehicle">
              <img src={tricycle} alt="tricycle" className="vehicle-img" />
            </div>
            <div className="badge-bottom">📍 Live Tracking<br/><span className="small">Real-time GPS</span></div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
