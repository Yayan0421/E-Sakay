import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { Heart, Zap, Shield, Users } from 'lucide-react'

export default function AboutUs(){
  const { collapsed } = useOutletContext() || { collapsed: false }

  const values = [
    {
      icon: Heart,
      title: "Reliability",
      description: "We ensure safe, on-time rides every single time. Your trust is our priority."
    },
    {
      icon: Zap,
      title: "Speed",
      description: "Get a ride in minutes, not hours. Our smart matching gets you moving fast."
    },
    {
      icon: Shield,
      title: "Safety",
      description: "Verified drivers, real-time tracking, and 24/7 support for your peace of mind."
    },
    {
      icon: Users,
      title: "Community",
      description: "We're building a connected community of riders and drivers we trust."
    }
  ]

  return (
    <>
      {/* About Header */}
      <div className={`about-page-header ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="about-header-content">
          <h1 className="about-main-title">About E-Sakay</h1>
          <p className="about-tagline">Your Smart and Reliable Ride Companion</p>
        </div>
      </div>

      {/* Main About Content */}
      <div className={`about-page-container ${collapsed ? 'sidebar-collapsed' : ''}`}>
        
        {/* Who We Are Section */}
        <section className="about-section">
          <div className="section-header">
            <h2>Who We Are</h2>
          </div>
          <div className="section-content">
            <p>
              E-Sakay is a modern ride-sharing platform designed to revolutionize urban transportation in the Philippines. 
              We connect riders with verified drivers offering motorcycle and tricycle services, making commuting faster, 
              safer, and more affordable for everyone.
            </p>
            <p>
              Founded with a vision to solve the daily commuting challenges faced by millions, E-Sakay combines cutting-edge 
              technology with local expertise to deliver a world-class ride experience.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="about-section">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <h3>Our Mission</h3>
              <p>
                To provide safe, affordable, and reliable ride-sharing services that empower people to move around their 
                cities with confidence and ease.
              </p>
            </div>
            <div className="vision-card">
              <h3>Our Vision</h3>
              <p>
                To become the most trusted and preferred ride-sharing platform in Southeast Asia, setting new standards for 
                safety, quality, and customer service.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="about-section">
          <div className="section-header">
            <h2>Our Core Values</h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="value-card">
                  <div className="value-icon">
                    <Icon size={32} color="#146f05" />
                  </div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* By The Numbers Section */}
        <section className="about-section stats-section">
          <div className="section-header">
            <h2>By The Numbers</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100K+</div>
              <div className="stat-label">Rides Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Customer Support</div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="about-section contact-section">
          <div className="section-header">
            <h2>Get In Touch</h2>
          </div>
          <div className="contact-content">
            <p>Have questions? We'd love to hear from you!</p>
            <div className="contact-grid">
              <div className="contact-item">
                <h4>Email</h4>
                <a href="mailto:support@esakay.com">support@esakay.com</a>
              </div>
              <div className="contact-item">
                <h4>Help Center</h4>
                <a href="#help">Visit our Help Center</a>
              </div>
              <div className="contact-item">
                <h4>Report an Issue</h4>
                <a href="#report">Report a Problem</a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
