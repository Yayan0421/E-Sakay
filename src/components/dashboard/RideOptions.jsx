import React from 'react'
import { Users, Clock, Tag } from 'lucide-react'

const rideTypes = [
  {
    id: 'car',
    name: 'Car',
    description: 'Comfortable & Private',
    icon: '🚗',
    capacity: '4 passengers',
    basePrice: 50,
    timeEstimate: '2 min away',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'trike',
    name: 'Trike',
    description: 'Quick & Affordable',
    icon: '🛺',
    capacity: '3 passengers',
    basePrice: 30,
    timeEstimate: '1 min away',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'motorcycle',
    name: 'Motorcycle',
    description: 'Fast & Easy',
    icon: '🏍️',
    capacity: '1 passenger',
    basePrice: 20,
    timeEstimate: '3 min away',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'van',
    name: 'Van',
    description: 'Group Travel',
    icon: '🚐',
    capacity: '8 passengers',
    basePrice: 80,
    timeEstimate: '4 min away',
    color: 'from-purple-500 to-purple-600'
  }
]

export default function RideOptions({ selectedRide, onRideSelect }) {
  return (
    <div className="space-y-3">
      {rideTypes.map((ride) => (
        <div
          key={ride.id}
          onClick={() => onRideSelect(ride)}
          className={`
            p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${
              selectedRide?.id === ride.id
                ? 'border-teal-500 bg-teal-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-teal-300'
            }
          `}
        >
          <div className="flex gap-4 items-center md:items-start">
            {/* Ride Icon */}
            <div className={`
              text-4xl flex-shrink-0
            `}>
              {ride.icon}
            </div>

            {/* Ride Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{ride.name}</h3>
                  <p className="text-xs text-gray-500">{ride.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-lg text-teal-600">₱{ride.basePrice}</p>
                  <p className="text-xs text-gray-500">Base fare</p>
                </div>
              </div>

              {/* Ride Details */}
              <div className="flex flex-col md:flex-row gap-2 mt-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-teal-600" />
                  <span>{ride.capacity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-teal-600" />
                  <span>{ride.timeEstimate}</span>
                </div>
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedRide?.id === ride.id && (
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mt-4">
        <p className="text-xs text-blue-900">
          <span className="font-semibold">💡 Tip:</span> Prices vary with distance and traffic. Final fare shown upon confirmation.
        </p>
      </div>
    </div>
  )
}
