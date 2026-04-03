import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { MapPin, Bike, CheckCircle } from 'lucide-react'
import '../../styles/maindashboard2.css'

export default function MainDashboard2() {
  const { collapsed } = useOutletContext() || { collapsed: false }
  
  const steps = [
    {
      number: 1,
      title: 'Set Your Location',
      description: 'Enter your pickup and drop-off points',
      icon: MapPin,
    },
    {
      number: 2,
      title: 'Choose a Vehicle',
      description: 'Pick a motorcycle or tricycle for your trip',
      icon: Bike,
    },
    {
      number: 3,
      title: 'Enjoy Your Ride',
      description: 'Sit back and get to your destination safely',
      icon: CheckCircle,
    },
  ]

  return (
    <div className="w-full px-3 sm:px-6 lg:px-10 py-8 sm:py-12 md:py-16 bg-gray-50 text-center" style={{ margin: 0 }}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3" style={{ marginBottom: '12px' }}>
        How It Works
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-12 px-2" style={{ marginBottom: '48px' }}>
        Three simple steps to your ride
      </p>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto w-full px-2 sm:px-0"
      >
        {steps.map((step) => {
          const IconComponent = step.icon
          return (
            <div
              key={step.number}
              className="flex flex-col items-center relative px-2 sm:px-0"
            >
              {/* Icon Circle */}
              <div
                className="relative mb-4 sm:mb-6 md:mb-8 flex items-center justify-center"
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-emerald-100 rounded-full flex items-center justify-center"
                >
                  <IconComponent size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12" color="#10b981" strokeWidth={1.5} />
                </div>
                {/* Number Badge */}
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base"
                >
                  {step.number}
                </div>
              </div>

              {/* Text Content */}
              <h3
                className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2"
              >
                {step.title}
              </h3>
              <p
                className="text-xs sm:text-sm md:text-base text-gray-600 leading-snug"
              >
                {step.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
