import React from 'react'

const About1 = () => {
  return (
    <section className="how-section">
      <div className="how-inner">
        <div className="badge">Simple Steps</div>
        <h2 className="how-title">How It Works</h2>
        <p className="how-desc">Booking your eco-friendly ride takes less than a minute.</p>

        <div className="how-steps">
          <div className="step-card">
            <div className="step-icon">📱</div>
            <div className="step-number">STEP 01</div>
            <h3 className="step-title">Open the App</h3>
            <p className="step-desc">Launch E-Sakay and enter your pickup and drop-off location.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">🚲</div>
            <div className="step-number">STEP 02</div>
            <h3 className="step-title">Choose Your Ride</h3>
            <p className="step-desc">Pick from e-bike, e-trike, or e-jeep based on your group size and budget.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">📍</div>
            <div className="step-number">STEP 03</div>
            <h3 className="step-title">Track in Real-Time</h3>
            <p className="step-desc">Watch your driver head to you live on the map.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">✅</div>
            <div className="step-number">STEP 04</div>
            <h3 className="step-title">Arrive & Pay</h3>
            <p className="step-desc">Reach your destination and pay via cash or e-wallet. Simple!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About1
