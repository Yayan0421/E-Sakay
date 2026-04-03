import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
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
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={logo} alt="E-Sakay" className="h-10 sm:h-12 w-auto" />
            <span className="hidden sm:inline font-bold text-lg sm:text-xl text-emerald-600">E-Sakay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#why-us" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              How It Works
            </a>
            <a href="#contact" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Contact
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/login"
              className="px-6 py-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/signup"
              className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 pt-4">
            <a 
              href="#why-us" 
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
            >
              How It Works
            </a>
            <a 
              href="#contact" 
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
            >
              Contact
            </a>
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
              <Link 
                to="/login"
                onClick={closeMenu}
                className="block text-center px-4 py-2 text-emerald-600 border-2 border-emerald-600 font-bold rounded-full hover:bg-emerald-50 transition-colors"
              >
                Log In
              </Link>
              <Link 
                to="/signup"
                onClick={closeMenu}
                className="block text-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar

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
