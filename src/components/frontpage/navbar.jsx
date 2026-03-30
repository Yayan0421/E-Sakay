import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png.jpg'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="esakay-nav">
      <div className="nav-inner">
        <div className="brand">
          <img src={logo} alt="E-Sakay" className="brand-logo" />
          <span className="brand-text">E-Sakay</span>
        </div>

        <button className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </nav>

        <div className="nav-cta">
          <Link to="/signup" className="btn-primary">Get Started</Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
