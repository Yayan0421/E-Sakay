import React from 'react'

const About2 = () => {
  return (
    <section className="cta-section">
      <div className="cta-card">
        <div className="cta-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" fill="#fff"/>
          </svg>
        </div>

        <h2 className="cta-title">Ready to Ride Green?</h2>
        <p className="cta-desc">Join thousands of commuters across the Philippines making the switch to cleaner, smarter transportation.</p>

        <div className="cta-actions">
          <button className="btn-primary">Open Dashboard →</button>
          <button className="btn-outline">Learn More</button>
        </div>
      </div>
    </section>
  )
}

export default About2
