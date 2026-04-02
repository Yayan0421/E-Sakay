import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import cp from '../../assets/cp.png'

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <main className="bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-600 relative overflow-hidden min-h-screen flex items-center">
        {/* Background decorative circle */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-400 rounded-full opacity-40 blur-3xl"></div>
        
        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col justify-center py-8 lg:py-0">
              {/* Badge */}
              <div className="inline-flex items-center w-fit bg-white/15 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
                <span className="text-white text-sm font-semibold">🚀 Your Transportation Solution</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                Ride the <span className="text-yellow-300">Future</span> with <span className="text-yellow-300">E-Sakay</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-xl font-medium">
                Your reliable transportation solution. Book motorcycles and tricycles, track your driver in real-time, and get where you need to go safely.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  to="/signup" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 active:scale-95"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold text-lg rounded-2xl border border-white/30 shadow-md hover:bg-white/30 hover:border-white/40 transform transition-all duration-300 active:scale-95"
                >
                  Log In
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/15">
                <div className="py-4">
                  <div className="text-3xl sm:text-4xl font-black text-white mb-1">50K+</div>
                  <div className="text-sm text-white/75 font-medium">Active Users</div>
                </div>
                <div className="py-4">
                  <div className="text-3xl sm:text-4xl font-black text-white mb-1">100K+</div>
                  <div className="text-sm text-white/75 font-medium">Rides Completed</div>
                </div>
                <div className="py-4">
                  <div className="text-3xl sm:text-4xl font-black text-white mb-1">4.8★</div>
                  <div className="text-sm text-white/75 font-medium">Rating</div>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl shadow-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={cp} 
                    alt="E-Sakay App" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white" id="why-us">
        <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Why Choose <span className="text-emerald-600">E-Sakay?</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Experience the future of <span className="text-emerald-600 font-semibold">urban transportation</span> with confidence and ease
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-emerald-300 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600 text-white rounded-2xl mb-6 text-2xl group-hover:scale-110 transition-transform duration-300">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed font-medium">Book a ride in seconds with our intelligent matching algorithm</p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-emerald-300 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600 text-white rounded-2xl mb-6 text-2xl group-hover:scale-110 transition-transform duration-300">
                🏍
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted Vehicles</h3>
              <p className="text-gray-600 leading-relaxed font-medium">Well-maintained motorcycles and tricycles for your comfort</p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-emerald-300 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600 text-white rounded-2xl mb-6 text-2xl group-hover:scale-110 transition-transform duration-300">
                💰
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Affordable</h3>
              <p className="text-gray-600 leading-relaxed font-medium">Competitive pricing with transparent, no-hidden-fee pricing</p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-emerald-300 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600 text-white rounded-2xl mb-6 text-2xl group-hover:scale-110 transition-transform duration-300">
                🔒
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safe & Secure</h3>
              <p className="text-gray-600 leading-relaxed font-medium">Verified drivers and real-time tracking for your peace of mind</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
