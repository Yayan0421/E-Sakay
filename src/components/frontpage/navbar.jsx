import React from 'react'

const Navbar = () => {
  return (
    <header className="esakay-nav">
      <div className="nav-inner">
        <div className="brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">E-Sakay</span>
        </div>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-cta">
          <button className="btn-primary">Go to Dashboard</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
