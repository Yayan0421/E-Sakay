import React from 'react'
import { Link } from 'react-router-dom'

const About2 = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center" id="contact">
      <div className="max-w-4xl mx-auto">
        {/* CTA Card - Responsive padding and layout */}
        <div className="relative overflow-hidden bg-linear-to-r from-emerald-500 to-emerald-600 rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-emerald-400 rounded-full opacity-10 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-emerald-700 rounded-full opacity-5 -ml-16 -mb-16"></div>

          {/* CTA Content */}
          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Icon */}
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 sm:mb-8">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" fill="currentColor"/>
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Ready to Ride Green?
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-white text-opacity-90 mb-8 sm:mb-10 max-w-2xl leading-relaxed">
              Join thousands of commuters across the Philippines making the switch to cleaner, smarter transportation.
            </p>

            {/* CTA Buttons - Stack on mobile, side-by-side on desktop */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto justify-center">
              <Link 
                to="/signup" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-600 hover:bg-gray-100 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-center"
              >
                Open Dashboard →
              </Link>
              <button 
                className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-bold rounded-full transition-all duration-200"
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
