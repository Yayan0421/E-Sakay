import { useOutletContext } from "react-router-dom";
import { Bike, Shield, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: Bike,
    title: "Variety of Rides",
    description: "Choose motorcycle or tricycle based on your needs",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Verified drivers and real-time ride tracking",
  },
  {
    icon: Clock,
    title: "Quick Pickups",
    description: "Average pickup time under 2 minutes",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here to help anytime you need us",
  },
];

export default function MainDashboard3() {
  const { collapsed } = useOutletContext();

  return (
    <div className={`why-ride-section ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="why-ride-container">
        <h2 className="why-ride-title">Why Ride With Us</h2>
        <p className="why-ride-subtitle">
          Built for your comfort and safety
        </p>

        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <Icon size={32} color="#000000" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
