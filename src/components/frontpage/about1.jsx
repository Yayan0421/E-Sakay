import React from 'react'

const About1 = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4 sm:mb-6">
            <span className="text-blue-700 font-bold text-sm sm:text-base">Simple Steps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            How It <span className="text-emerald-600">Works</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Booking your eco-friendly ride takes less than a minute.
          </p>
        </div>

        {/* Steps Grid - Responsive: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl mb-4 sm:mb-6 shadow-md">
              📱
            </div>
            <div className="inline-block px-3 py-1 bg-gray-200 rounded-full mb-3 text-xs sm:text-sm font-bold text-gray-700">
              STEP 01
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Open the App</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Launch E-Sakay and enter your pickup and drop-off location.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl mb-4 sm:mb-6 shadow-md">
              🚲
            </div>
            <div className="inline-block px-3 py-1 bg-gray-200 rounded-full mb-3 text-xs sm:text-sm font-bold text-gray-700">
              STEP 02
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Choose Your Ride</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Pick from e-bike, e-trike, or e-jeep based on your group size and budget.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl mb-4 sm:mb-6 shadow-md">
              📍
            </div>
            <div className="inline-block px-3 py-1 bg-gray-200 rounded-full mb-3 text-xs sm:text-sm font-bold text-gray-700">
              STEP 03
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Track in Real-Time</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Watch your driver head to you live on the map.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl mb-4 sm:mb-6 shadow-md">
              ✅
            </div>
            <div className="inline-block px-3 py-1 bg-gray-200 rounded-full mb-3 text-xs sm:text-sm font-bold text-gray-700">
              STEP 04
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Arrive & Pay</h3>
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
