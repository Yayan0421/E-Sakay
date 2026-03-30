import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { HelpCircle, Mail, MessageSquare, Phone, Clock, Search, ChevronDown } from 'lucide-react'
import Swal from 'sweetalert2'
import '../../styles/support.css'

export default function Support(){
  const { collapsed } = useOutletContext() || { collapsed: false }
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [faqs, setFaqs] = useState([])
  const [submittingTicket, setSubmittingTicket] = useState(false)
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    description: ''
  })

  // Fetch FAQs from Supabase
  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/support/faqs')
      const data = await response.json()
      
      if (response.ok) {
        setFaqs(data.data || [])
      } else {
        throw new Error(data.error || 'Failed to fetch FAQs')
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error)
      // Fallback to static FAQs if fetch fails
      setFaqs([
        {
          id: 1,
          question: "How do I book a ride?",
          answer: "Open the app, enter your pickup and destination locations, select your preferred vehicle (motorcycle or tricycle), and confirm the booking. A driver will be matched with you within minutes."
        },
        {
          id: 2,
          question: "How are drivers verified?",
          answer: "All E-Sakay drivers undergo a comprehensive verification process including background checks, license verification, and vehicle inspection. We prioritize your safety."
        },
        {
          id: 3,
          question: "What payment methods are accepted?",
          answer: "We accept cash payments to drivers and digital payments including credit/debit cards, e-wallets, and bank transfers. Choose your preferred method during booking."
        },
        {
          id: 4,
          question: "How do I track my ride?",
          answer: "Once a driver is assigned, you can see their real-time location on the map. You'll also receive updates about the driver's arrival and route."
        },
        {
          id: 5,
          question: "What is your cancellation policy?",
          answer: "You can cancel free of charge if you do so before the driver arrives. A cancellation fee of ₱50 applies if the driver has already started heading to your location."
        },
        {
          id: 6,
          question: "How can I report a safety concern?",
          answer: "If you experience any safety concern, contact our 24/7 support team immediately via the in-app SOS button or call our hotline. We take all reports seriously."
        }
      ])
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "support@esakay.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our support team",
      contact: "+63 2 1234 5678"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with us during business hours",
      contact: "Available 8 AM - 10 PM daily"
    },
    {
      icon: Clock,
      title: "24/7 Hotline",
      description: "For emergencies and urgent matters",
      contact: "+63 917 123 4567"
    }
  ]

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmitTicket = async (e) => {
    e.preventDefault()
    
    if (!formData.subject || !formData.category || !formData.description) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all required fields',
        confirmButtonColor: '#146f05'
      })
      return
    }

    setSubmittingTicket(true)

    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}')
      const passengerEmail = userData.email || localStorage.getItem('passengerEmail')
      const passengerName = userData.name || 'Passenger'

      const response = await fetch('http://localhost:4001/api/support/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passengerEmail,
          passengerName,
          subject: formData.subject,
          category: formData.category,
          description: formData.description,
          priority: 'normal'
        })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Failed to submit ticket')

      Swal.fire({
        icon: 'success',
        title: 'Ticket Submitted!',
        text: 'Your support ticket has been submitted. Our team will respond within 24 hours.',
        confirmButtonColor: '#146f05'
      })

      // Reset form
      setFormData({
        subject: '',
        category: '',
        description: ''
      })
    } catch (error) {
      console.error('Error submitting ticket:', error)
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.message || 'Failed to submit ticket. Please try again.',
        confirmButtonColor: '#146f05'
      })
    } finally {
      setSubmittingTicket(false)
    }
  }

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      {/* Support Header */}
      <div className={`support-page-header ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="support-header-content">
          <h1 className="support-main-title">Help & Support</h1>
          <p className="support-tagline">We're here to help you every step of the way</p>
        </div>
      </div>

      {/* Main Support Content */}
      <div className={`support-page-container ${collapsed ? 'sidebar-collapsed' : ''}`}>
        
        {/* Contact Methods Section */}
        <section className="support-section">
          <div className="section-header">
            <h2>Get In Touch With Us</h2>
          </div>
          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <div key={index} className="contact-method-card">
                  <div className="method-icon">
                    <Icon size={32} color="#146f05" />
                  </div>
                  <h3>{method.title}</h3>
                  <p className="method-description">{method.description}</p>
                  <p className="method-contact">{method.contact}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="support-section faq-section">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>

          {/* Search Bar */}
          <div className="faq-search">
            <Search size={20} color="#666" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* FAQ Items */}
          <div className="faq-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className={`faq-item ${expandedFaq === faq.id ? 'expanded' : ''}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <div className="question-text">
                      <HelpCircle size={20} color="#146f05" />
                      <span>{faq.question}</span>
                    </div>
                    <ChevronDown
                      size={20}
                      color="#146f05"
                      className={`chevron ${expandedFaq === faq.id ? 'rotated' : ''}`}
                    />
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No FAQs found matching your search. Try different keywords or contact us directly.</p>
              </div>
            )}
          </div>
        </section>

        {/* Submit Ticket Section */}
        <section className="support-section ticket-section">
          <div className="section-header">
            <h2>Submit a Support Ticket</h2>
          </div>
          <div className="ticket-content">
            <p>Couldn't find what you were looking for? Submit a ticket and our team will get back to you within 24 hours.</p>
            <form className="ticket-form" onSubmit={handleSubmitTicket}>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="What is your issue about?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select 
                  id="category" 
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="booking">Booking Issue</option>
                  <option value="payment">Payment Issue</option>
                  <option value="safety">Safety Concern</option>
                  <option value="driver">Driver Complaint</option>
                  <option value="lost-item">Lost Item</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="5"
                  placeholder="Please describe your issue in detail..."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={submittingTicket}
              >
                {submittingTicket ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </form>
          </div>
        </section>

      </div>
    </>
  )
}
