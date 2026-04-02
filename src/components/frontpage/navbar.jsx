import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png.jpg'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between max-w-full">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="E-Sakay" className="h-8 sm:h-10 w-auto" />
            <span className="text-lg sm:text-2xl font-black text-gray-900">E-Sakay</span>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#home" className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition">Home</a>
            <a href="#features" className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition">Features</a>
            <a href="#why-us" className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition">Why Us</a>
            <a href="#contact" className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition">Contact</a>
          </div>

          {/* Desktop CTA - Hidden on Mobile */}
          <div className="hidden md:block">
            <Link 
              to="/signup" 
              className="px-6 py-2 bg-emerald-600 text-white font-bold text-sm rounded-lg hover:bg-emerald-700 transition shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="space-y-3 pt-4">
              <a 
                href="#home" 
                onClick={closeMenu}
                className="block text-gray-700 font-semibold text-sm hover:text-emerald-600 transition"
              >
                Home
              </a>
              <a 
                href="#features" 
                onClick={closeMenu}
                className="block text-gray-700 font-semibold text-sm hover:text-emerald-600 transition"
              >
                Features
              </a>
              <a 
                href="#why-us" 
                onClick={closeMenu}
                className="block text-gray-700 font-semibold text-sm hover:text-emerald-600 transition"
              >
                Why Us
              </a>
              <a 
                href="#contact" 
                onClick={closeMenu}
                className="block text-gray-700 font-semibold text-sm hover:text-emerald-600 transition"
              >
                Contact
              </a>
              <Link 
                to="/signup"
                onClick={closeMenu}
                className="block w-full text-center px-4 py-2 bg-emerald-600 text-white font-semibold text-sm rounded-lg hover:bg-emerald-700 transition shadow-md mt-2"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
