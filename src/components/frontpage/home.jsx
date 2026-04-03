import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import cp from '../../assets/cp.png'

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-white">
      <Navbar />

      {/* Hero Section - Mobile First */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Grid - Stack on mobile, side-by-side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Hero Left Content */}
            <div className="flex flex-col justify-center">
              {/* Title - Responsive sizing */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4 sm:mb-6">
                Ride the <span className="text-emerald-600">Future</span> with <span className="text-emerald-600">E-Sakay</span>
              </h1>
              
              {/* Description - Responsive text size */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-xl">
                Your reliable transportation solution. Book motorcycles and tricycles, track your driver in real-time, and get where you need to go safely.
              </p>

              {/* CTA Buttons - Full width on mobile, auto on desktop */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
                <Link 
                  to="/login" 
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-center"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-center"
                >
                  Sign Up
                </Link>
              </div>

              {/* Stats - Responsive grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600">50K+</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Active Users</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600">100K+</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Rides Completed</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600">4.8★</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Avg Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Right - Image */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="w-full max-w-sm lg:max-w-none">
                <img 
                  src={cp} 
                  alt="E-Sakay App" 
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
            
            {/* Mobile Image - Show on mobile, hide on desktop */}
            <div className="lg:hidden flex justify-center items-center -mx-4 sm:-mx-6">
              <div className="w-full max-w-xs">
                <img 
                  src={cp} 
                  alt="E-Sakay App" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

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
