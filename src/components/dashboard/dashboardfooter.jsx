import React from 'react';
import '../../styles/dashboardfooter.css';

export default function DashboardFooter() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-container">
        {/* App Info Section */}
        <div className="footer-section app-info">
          <h3>E-Sakay</h3>
          <p>"Your smart and reliable ride companion."</p>
        </div>

        {/* Navigation Section */}
        <div className="footer-section navigation">
          <h4>Navigation</h4>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/messages">Messages</a></li>
            <li><a href="/rides-history">Ride History</a></li>
            <li><a href="/profile">Profile / Settings</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section support">
          <h4>Support / Contact</h4>
          <p>Email: <a href="mailto:support@esakay.com">support@esakay.com</a></p>
          <ul>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="footer-section legal">
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; 2026 E-Sakay. All rights reserved.</p>
      </div>
    </footer>
  );
}
