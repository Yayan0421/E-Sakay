import React from 'react'
import { Link } from 'react-router-dom'

const About2 = () => {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        
        {/* CTA Card - Mobile First */}
        <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
          
          {/* Background Decorative Elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 sm:w-64 sm:h-64 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-24 h-24 sm:w-48 sm:h-48 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 text-center flex flex-col items-center">
            
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl mb-4 sm:mb-6 border border-white/30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-8 sm:h-8">
                <path d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" fill="#fff"/>
              </svg>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight">
              Ready to Ride Green?
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mb-6 sm:mb-8 leading-relaxed font-medium">
              Join thousands of commuters across the Philippines making the switch to cleaner, smarter transportation.
            </p>

            {/* CTA Buttons - Mobile First */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full sm:w-auto sm:justify-center">
              <Link 
                to="/signup" 
                className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl hover:bg-yellow-300 transform transition-all active:scale-95 text-center"
              >
                Open Dashboard →
              </Link>
              <button 
                className="px-6 py-3 bg-white/15 backdrop-blur-md text-white font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl border-2 border-white/30 hover:bg-white/25 hover:border-white/50 transform transition-all active:scale-95"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About2
