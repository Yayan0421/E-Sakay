import React from 'react'

const About1 = () => {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header - Mobile First */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block bg-blue-100 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wide">📚 Simple Steps</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Booking your eco-friendly ride takes less than a minute.
          </p>
        </div>

        {/* Steps Grid - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          
          {/* Step 1 */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-2xl sm:text-4xl">
              📱
            </div>
            <div className="inline-block bg-blue-100 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 mb-3 sm:mb-4">
              <span className="text-xs font-black text-blue-700 tracking-wider">STEP 01</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Open the App</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Launch E-Sakay and enter your pickup and drop-off location.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-2xl sm:text-4xl">
              🚲
            </div>
            <div className="inline-block bg-emerald-100 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 mb-3 sm:mb-4">
              <span className="text-xs font-black text-emerald-700 tracking-wider">STEP 02</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Choose Your Ride</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Pick from e-bike, e-trike, or e-jeep based on your group size and budget.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-2xl sm:text-4xl">
              📍
            </div>
            <div className="inline-block bg-purple-100 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 mb-3 sm:mb-4">
              <span className="text-xs font-black text-purple-700 tracking-wider">STEP 03</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Track in Real-Time</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Watch your driver head to you live on the map.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:shadow-md hover:border-yellow-300 transition-all">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-2xl sm:text-4xl">
              ✅
            </div>
            <div className="inline-block bg-yellow-100 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 mb-3 sm:mb-4">
              <span className="text-xs font-black text-yellow-700 tracking-wider">STEP 04</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Arrive & Pay</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Reach your destination and pay via cash or e-wallet. Simple!
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About1
