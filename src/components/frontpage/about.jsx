import React from 'react'

const About = () => {
	return (
		<section className="about-section" id="about">
			<div className="about-inner container">
				<div className="badge">Why E-Sakay?</div>
				<h2 className="about-title">Everything you need in one ride</h2>
				<p className="about-desc">E-Sakay is built for Filipino commuters who want a faster, greener, and more affordable way to travel. We combine real-time tracking, friendly drivers, and eco-friendly vehicles.</p>

				<div className="features-grid">
					<article className="feature-card">
						<div className="feature-icon">⚡</div>
						<h4 className="feature-title">100% Electric Fleet</h4>
						<p className="feature-desc">All our vehicles are electric — e-bikes, e-trikes, and e-jeepneys — for a cleaner, quieter ride.</p>
					</article>

					<article className="feature-card">
						<div className="feature-icon">📍</div>
						<h4 className="feature-title">Real-Time Tracking</h4>
						<p className="feature-desc">Track your driver live on the map and know exactly when your ride arrives.</p>
					</article>

					<article className="feature-card">
						<div className="feature-icon">🔒</div>
						<h4 className="feature-title">Safe & Verified Drivers</h4>
						<p className="feature-desc">Every driver is background-checked and vehicle-inspected before hitting the road.</p>
					</article>

					<article className="feature-card">
						<div className="feature-icon">💳</div>
						<h4 className="feature-title">Affordable Fares</h4>
						<p className="feature-desc">Transparent, low-cost pricing with no hidden fees.</p>
					</article>

					<article className="feature-card">
						<div className="feature-icon">⏰</div>
						<h4 className="feature-title">Available 24/7</h4>
						<p className="feature-desc">Need a ride early morning or late at night? E-Sakay's here when you are.</p>
					</article>

					<article className="feature-card">
						<div className="feature-icon">🌿</div>
						<h4 className="feature-title">Eco-Friendly</h4>
						<p className="feature-desc">Every trip with E-Sakay reduces carbon emissions compared to traditional vehicles.</p>
					</article>
				</div>
			</div>
		</section>
	)
}

export default About
