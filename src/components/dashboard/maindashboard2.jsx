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
    <div className={`dashboard-section ${collapsed ? 'sidebar-collapsed' : ''}`} style={{ padding: '60px 40px', textAlign: 'center', backgroundColor: '#f8fafb' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '12px' }}>
        How It Works
      </h2>
      <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '48px' }}>
        Three simple steps to your ride
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {steps.map((step) => {
          const IconComponent = step.icon
          return (
            <div
              key={step.number}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {/* Icon Circle */}
              <div
                style={{
                  position: 'relative',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#d1fae5',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent size={40} color="#10b981" strokeWidth={1.5} />
                </div>
                {/* Number Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                >
                  {step.number}
                </div>
              </div>

              {/* Text Content */}
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '8px',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.5',
                  margin: 0,
                }}
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
