import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import cp from '../../assets/cp.png'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section - Mobile First */}
      <main className="bg-gradient-to-b from-emerald-500 to-emerald-600 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-yellow-400 rounded-full opacity-30 blur-3xl"></div>
        
        <div className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            
            {/* Content Stack */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10 text-white">
              
              {/* Badge */}
              <div className="inline-block bg-white/15 backdrop-blur-md rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20 w-fit">
                <span className="text-xs sm:text-sm font-semibold">🚀 Your Transportation Solution</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                Ride the <span className="text-yellow-300">Future</span> with <span className="text-yellow-300">E-Sakay</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-medium">
                Your reliable transportation solution. Book motorcycles and tricycles, track your driver in real-time, and get where you need to go safely.
              </p>

              {/* CTA Buttons - Mobile First */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 pt-2">
                <Link 
                  to="/signup" 
                  className="w-full sm:w-auto px-6 py-3 sm:py-3 bg-yellow-400 text-gray-900 font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl hover:bg-yellow-300 transform transition-all active:scale-95 text-center"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login" 
                  className="w-full sm:w-auto px-6 py-3 sm:py-3 bg-white/15 backdrop-blur-md text-white font-bold text-sm sm:text-base rounded-xl border border-white/30 hover:bg-white/25 transform transition-all active:scale-95 text-center"
                >
                  Log In
                </Link>
              </div>

              {/* Stats - Mobile First Grid */}
              <div className="pt-6 sm:pt-8 border-t border-white/15">
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">50K+</div>
                    <div className="text-xs sm:text-sm text-white/75 font-medium">Active Users</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">100K+</div>
                    <div className="text-xs sm:text-sm text-white/75 font-medium">Rides Completed</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">4.8★</div>
                    <div className="text-xs sm:text-sm text-white/75 font-medium">Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image - Hidden on Mobile */}
            <div className="hidden md:block mt-12 lg:mt-16">
              <div className="relative max-w-sm mx-auto">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={cp} 
                    alt="E-Sakay App" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section - Mobile First */}
      <section className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
              Why Choose <span className="text-emerald-600">E-Sakay?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Experience the future of urban transportation
            </p>
          </div>

          {/* Features Grid - Mobile First */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Lightning Fast</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Book a ride in seconds with our intelligent matching algorithm</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏍</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Trusted Vehicles</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Well-maintained motorcycles and tricycles for your comfort</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💰</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Affordable</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Transparent pricing with no hidden fees</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔒</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Safe & Secure</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Verified drivers and real-time tracking</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
