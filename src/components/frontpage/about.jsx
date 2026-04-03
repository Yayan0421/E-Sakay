import React from 'react'

const About = () => {
	return (
		<section className="w-full px-3 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 bg-white flex flex-col items-center overflow-hidden" id="why-us">
			<div className="w-full max-w-7xl">
				{/* Section Header */}
				<div className="text-center mb-12 sm:mb-16 md:mb-20">
					<div className="inline-block px-4 py-2 bg-emerald-100 rounded-full mb-4 sm:mb-6">
						<span className="text-emerald-700 font-bold text-sm sm:text-base">Why E-Sakay?</span>
					</div>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
						Everything you need in one <span className="text-emerald-600">ride</span>
					</h2>
					<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
						E-Sakay is built for Filipino commuters who want a faster, greener, and more affordable way to travel. We combine real-time tracking, friendly drivers, and eco-friendly vehicles.
					</p>
				</div>

				{/* Features Grid - Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full overflow-hidden">
				{/* Feature Card 1 */}
				<div className="group p-6 sm:p-8 bg-linear-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl hover:shadow-lg hover:border-emerald-300 transition-all duration-300 overflow-hidden">
						<div className="text-4xl sm:text-5xl mb-4">⚡</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">100% Electric Fleet</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
							All our vehicles are electric — e-bikes, e-trikes, and e-jeepneys — for a cleaner, quieter ride.
						</p>
					</div>

					{/* Feature Card 2 */}
				<div className="group p-6 sm:p-8 bg-linear-to-br from-blue-50 to-white border border-blue-100 rounded-2xl hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden">
						<div className="text-4xl sm:text-5xl mb-4">📍</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Real-Time Tracking</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
							Track your driver live on the map and know exactly when your ride arrives.
						</p>
					</div>

					{/* Feature Card 3 */}
				<div className="group p-6 sm:p-8 bg-linear-to-br from-purple-50 to-white border border-purple-100 rounded-2xl hover:shadow-lg hover:border-purple-300 transition-all duration-300 overflow-hidden">
						<div className="text-4xl sm:text-5xl mb-4">🔒</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Safe & Verified Drivers</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
							Every driver is background-checked and vehicle-inspected before hitting the road.
						</p>
					</div>

					{/* Feature Card 4 */}
				<div className="group p-6 sm:p-8 bg-linear-to-br from-yellow-50 to-white border border-yellow-100 rounded-2xl hover:shadow-lg hover:border-yellow-300 transition-all duration-300 overflow-hidden">
						<div className="text-4xl sm:text-5xl mb-4">💳</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Affordable Fares</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
							Transparent, low-cost pricing with no hidden fees.
						</p>
					</div>

					{/* Feature Card 5 */}
				<div className="group p-6 sm:p-8 bg-linear-to-br from-orange-50 to-white border border-orange-100 rounded-2xl hover:shadow-lg hover:border-orange-300 transition-all duration-300 overflow-hidden">
						<div className="text-4xl sm:text-5xl mb-4">⏰</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Available 24/7</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
							Need a ride early morning or late at night? E-Sakay's here when you are.
						</p>
					</div>

					{/* Feature Card 6 */}
				<div className="group p-6 sm:p-8 bg-linear-to-br from-green-50 to-white border border-green-100 rounded-2xl hover:shadow-lg hover:border-green-300 transition-all duration-300 overflow-hidden">
						<div className="text-4xl sm:text-5xl mb-4">🌿</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Eco-Friendly</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
							Every trip with E-Sakay reduces carbon emissions compared to traditional vehicles.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
