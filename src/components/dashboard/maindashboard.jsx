import React, { useState } from 'react';
import { MapPin, Navigation, FileText, User } from 'lucide-react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PaymentModal from './PaymentModal';
import { apiUrl } from '../../lib/api';
import '../../styles/homedashboard.css';

export default function MainDashboard() {
  const navigate = useNavigate();
  const { collapsed } = useOutletContext() || { collapsed: false };
  const [vehicleType, setVehicleType] = useState('motorcycle');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupCoords, setPickupCoords] = useState({ lat: 0, lng: 0 });
  const [dropoffCoords, setDropoffCoords] = useState({ lat: 0, lng: 0 });
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rideData, setRideData] = useState(null);
  const [showPaymentCheckout, setShowPaymentCheckout] = useState(false);
  const [bookingForPayment, setBookingForPayment] = useState(null);
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const locations = ['Essu', 'Tabunan', 'Maypangdan'];
  
  const locationCoords = {
    'Essu': { lat: 14.5995, lng: 120.9842 },
    'Tabunan': { lat: 14.6091, lng: 120.9842 },
    'Maypangdan': { lat: 14.5899, lng: 120.9842 }
  };

  const estimatedFare = '₱15';
  const username = userData.name || 'User';

  const handlePickupChange = (e) => {
    const location = e.target.value;
    setPickupLocation(location);
    if (location && locationCoords[location]) {
      setPickupCoords(locationCoords[location]);
    }
  };

  const handleDropoffChange = (e) => {
    const location = e.target.value;
    setDropoffLocation(location);
    if (location && locationCoords[location]) {
      setDropoffCoords(locationCoords[location]);
    }
  };

  const handleBookingClick = () => {
    if (!pickupLocation || !dropoffLocation) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Details',
        text: 'Please enter pickup and dropoff locations',
        confirmButtonColor: '#f6bc0d'
      });
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setShowPaymentModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmRide = async () => {
    try {
      const response = await fetch(apiUrl('/api/bookings/create'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passengerName: userData.name,
          passengerEmail: userData.email,
          passengerPhone: userData.phone || '',
          pickupAddress: pickupLocation,
          pickupLatitude: pickupCoords.lat,
          pickupLongitude: pickupCoords.lng,
          dropoffAddress: dropoffLocation,
          dropoffLatitude: dropoffCoords.lat,
          dropoffLongitude: dropoffCoords.lng,
          rideType: vehicleType,
          notes,
          paymentMethod
        })
      });

      const data = await response.json();

      if (response.ok) {
        const confirmationData = {
          rideId: data.data.id,
          vehicleType,
          pickupLocation,
          dropoffLocation,
          paymentMethod,
          notes,
          estimatedFare,
          driverName: vehicleType === 'motorcycle' ? 'Matching drivers...' : 'Matching drivers...',
          driverRating: 4.9,
          estimatedArrival: 'Finding driver...'
        };
        
        setRideData(confirmationData);
        setShowConfirmationModal(false);
        
        // If GCash payment, show payment modal instead of success
        if (paymentMethod === 'gcash') {
          const fareAmount = 15;
          
          const bookingPayment = {
            id: data.data.id,
            fare: fareAmount,
            pickup_address: pickupLocation,
            dropoff_address: dropoffLocation,
            ride_type: vehicleType
          };
          setBookingForPayment(bookingPayment);
          setShowPaymentCheckout(true);
          Swal.fire({
            icon: 'success',
            title: 'Booking Confirmed!',
            text: 'Proceed to payment to complete your booking',
            confirmButtonText: 'OK',
            confirmButtonColor: '#0ea5a4',
            allowOutsideClick: false
          });
        } else {
          // Cash or other methods - show normal success modal
          setShowSuccessModal(true);
          Swal.fire({
            icon: 'success',
            title: 'Booking Confirmed!',
            text: 'Your ride has been booked. Waiting for driver acceptance...',
            confirmButtonText: 'View Booking',
            confirmButtonColor: '#f6bc0d',
            allowOutsideClick: false
          }).then(() => {
            setPickupLocation('');
            setDropoffLocation('');
            setNotes('');
            setShowSuccessModal(false);
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: data.error || 'Failed to create booking',
          confirmButtonColor: '#f6bc0d'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Network error: ' + error.message,
        confirmButtonColor: '#f6bc0d'
      });
    }
  };

  return (
    <>
      {/* Welcome Header */}
      <div className={`dashboard-header ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="header-left">
          <h2 className="welcome-text">Welcome, <span className="username">{username}</span></h2>
        </div>
        <div className="header-right">
          <Link to="/dashboard/profile" className="profile-section">
            <div className="profile-image">
              <User size={32} color="#fff" />
            </div>
            <span className="profile-text">Profile</span>
          </Link>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className={`main-dashboard ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="dashboard-container">
          <div className="dashboard-grid">
          {/* Left Section - Hero & Description */}
          <div>
            {/* Trust Badge */}
            <div className="trust-badge">
              <span>⭐</span>
              <span>Trusted by 10,000+ riders</span>
            </div>

            {/* Main Heading */}
            <div className="heading-section">
              <h1 className="main-title">
                Your Ride, <span className="accent">Your Way</span>
              </h1>
              <p className="subtitle">
                Book a motorcycle or tricycle in seconds. Fast, safe, and affordable rides at your fingertips.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                onClick={() => navigate('/dashboard/booking')}
                className="btn-primary"
              >
                <MapPin className="w-5 h-5" />
                Book a Ride
              </button>
              <button 
                onClick={() => navigate('/dashboard/rides')}
                className="btn-secondary"
              >
                My Rides →
              </button>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Rides Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4.9★</div>
                <div className="stat-label">Rating</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2min</div>
                <div className="stat-label">Avg. Pickup</div>
              </div>
            </div>
          </div>

          {/* Right Content - Booking Form */}
          <div className="booking-form">
            {/* Vehicle Type Selection */}
            <div className="form-section">
              <label className="form-label">Vehicle Type</label>
              <div className="vehicle-grid">
                <button
                  onClick={() => setVehicleType('motorcycle')}
                  className={`vehicle-option ${vehicleType === 'motorcycle' ? 'active' : ''}`}
                >
                  <span className="vehicle-emoji">🏍️</span>
                  <div className="vehicle-name">Motorcycle</div>
                  <div className="vehicle-price">₱15</div>
                </button>
                <button
                  onClick={() => setVehicleType('tricycle')}
                  className={`vehicle-option ${vehicleType === 'tricycle' ? 'active' : ''}`}
                >
                  <span className="vehicle-emoji">🚲</span>
                  <div className="vehicle-name">Tricycle</div>
                  <div className="vehicle-price">₱15</div>
                </button>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="input-group">
              <label className="input-label">Pickup Location</label>
              <div className="input-wrapper">
                <MapPin className="input-icon location" />
                <select
                  value={pickupLocation}
                  onChange={handlePickupChange}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                >
                  <option value="">Select pickup location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropoff Location */}
            <div className="input-group">
              <label className="input-label">Drop-off Location</label>
              <div className="input-wrapper">
                <Navigation className="input-icon destination" />
                <select
                  value={dropoffLocation}
                  onChange={handleDropoffChange}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                >
                  <option value="">Select drop-off location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="input-group">
              <label className="input-label">Notes (optional)</label>
              <div className="input-wrapper">
                <FileText className="input-icon notes" />
                <textarea
                  placeholder="Any special instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="form-textarea"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            {/* Estimated Fare */}
            <div className="fare-section">
              <div className="fare-label">Estimated Fare</div>
              <div className="fare-amount">{estimatedFare}</div>
              <div className="fare-note">Fixed rate for all rides</div>
            </div>

            {/* Confirm Button */}
            <button className="btn-confirm" onClick={handleBookingClick}>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="payment-modal-header">
              <h2>Select Payment Method</h2>
              <button className="close-btn" onClick={() => setShowPaymentModal(false)}>✕</button>
            </div>

            <div className="payment-modal-content">
              <div className="payment-options">
                {/* Cash Option */}
                <div
                  className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('cash')}
                >
                  <div className="payment-option-icon">💵</div>
                  <div className="payment-option-content">
                    <h3>Cash</h3>
                    <p>Pay to driver upon arrival</p>
                  </div>
                  <div className="payment-check">
                    {paymentMethod === 'cash' && '✓'}
                  </div>
                </div>

                {/* GCash Option */}
                <div
                  className={`payment-option ${paymentMethod === 'gcash' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('gcash')}
                >
                  <div className="payment-option-icon">📱</div>
                  <div className="payment-option-content">
                    <h3>GCash</h3>
                    <p>Fast and secure mobile payment</p>
                  </div>
                  <div className="payment-check">
                    {paymentMethod === 'gcash' && '✓'}
                  </div>
                </div>

                {/* PayMaya Option */}
                <div
                  className={`payment-option ${paymentMethod === 'paymaya' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('paymaya')}
                >
                  <div className="payment-option-icon">💳</div>
                  <div className="payment-option-content">
                    <h3>PayMaya</h3>
                    <p>Digital wallet and online payment</p>
                  </div>
                  <div className="payment-check">
                    {paymentMethod === 'paymaya' && '✓'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-modal-header">
              <h2>Confirm Your Ride</h2>
              <button className="close-btn" onClick={() => setShowConfirmationModal(false)}>✕</button>
            </div>

            <div className="confirmation-modal-content">
              {/* Ride Details */}
              <div className="ride-details-box">
                <div className="detail-row">
                  <span className="detail-label">Vehicle Type</span>
                  <span className="detail-value">
                    {vehicleType === 'motorcycle' ? '🏍️ Motorcycle' : '🚲 Tricycle'}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Pickup</span>
                  <span className="detail-value">{pickupLocation}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Dropoff</span>
                  <span className="detail-value">{dropoffLocation}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Payment Method</span>
                  <span className="detail-value">
                    {paymentMethod === 'cash' && '💵 Cash'}
                    {paymentMethod === 'gcash' && '📱 GCash'}
                    {paymentMethod === 'paymaya' && '💳 PayMaya'}
                  </span>
                </div>

                {notes && (
                  <div className="detail-row">
                    <span className="detail-label">Special Requests</span>
                    <span className="detail-value">{notes}</span>
                  </div>
                )}
              </div>

              {/* Fare Section */}
              <div className="confirmation-fare-box">
                <div className="fare-breakdown">
                  <div className="fare-item">
                    <span>Estimated Fare</span>
                    <span>{estimatedFare}</span>
                  </div>
                    <div className="fare-note">Fixed rate for all rides</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="confirmation-actions">
                <button
                  className="btn-cancel"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  Back
                </button>
                <button
                  className="btn-confirm-ride"
                  onClick={handleConfirmRide}
                >
                  Confirm & Book Ride
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal for GCash */}
      {showPaymentCheckout && bookingForPayment && (
        <PaymentModal
          booking={bookingForPayment}
          onClose={() => {
            setShowPaymentCheckout(false);
            setPickupLocation('');
            setDropoffLocation('');
            setNotes('');
            setPaymentMethod('cash');
          }}
          onPaymentSuccess={() => {
            setShowPaymentCheckout(false);
            setPickupLocation('');
            setDropoffLocation('');
            setNotes('');
            setPaymentMethod('cash');
            Swal.fire({
              icon: 'success',
              title: 'Ready to Ride!',
              text: 'Payment processed. Waiting for driver...',
              confirmButtonColor: '#0ea5a4'
            });
          }}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && rideData && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>
            
            <h2>Ride Confirmed!</h2>
            <p className="success-subtitle">Your ride has been booked successfully</p>

            {/* Ride ID */}
            <div className="ride-id-box">
              <span className="ride-id-label">Ride ID</span>
              <span className="ride-id-value">{rideData.rideId}</span>
            </div>

            {/* Driver Assignment */}
            <div className="driver-assignment-box">
              <div className="driver-avatar-large">
                {rideData.vehicleType === 'motorcycle' ? '🏍️' : '🚗'}
              </div>
              <div className="driver-info-section">
                <div className="driver-name">{rideData.driverName}</div>
                <div className="driver-rating">⭐ {rideData.driverRating}</div>
                <div className="estimated-arrival">{rideData.estimatedArrival}</div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="trip-details-box">
              <div className="trip-detail">
                <span className="trip-label">From</span>
                <span className="trip-value">{rideData.pickupLocation}</span>
              </div>
              <div className="trip-detail">
                <span className="trip-label">To</span>
                <span className="trip-value">{rideData.dropoffLocation}</span>
              </div>
              <div className="trip-detail">
                <span className="trip-label">Payment</span>
                <span className="trip-value">
                  {rideData.paymentMethod === 'cash' && '💵 Cash'}
                  {rideData.paymentMethod === 'gcash' && '📱 GCash'}
                  {rideData.paymentMethod === 'paymaya' && '💳 PayMaya'}
                </span>
              </div>
              <div className="trip-detail fare-row">
                <span className="trip-label">Estimated Fare</span>
                <span className="trip-value fare-value">{rideData.estimatedFare}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="success-actions">
              <button
                className="btn-track-ride"
                onClick={() => {
                  setShowSuccessModal(false);
                  setPickupLocation('');
                  setDropoffLocation('');
                  setNotes('');
                  setPaymentMethod('cash');
                }}
              >
                Track My Ride
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
