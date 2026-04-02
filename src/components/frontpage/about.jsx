import React from 'react'

const About = () => {
	return (
		<section className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:py-20 bg-white" id="about">
			<div className="max-w-6xl mx-auto">
				
				{/* Section Header - Mobile First */}
				<div className="text-center mb-8 sm:mb-12 md:mb-16">
					<div className="inline-block bg-emerald-100 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
						<span className="text-xs sm:text-sm font-semibold text-emerald-700 uppercase tracking-wide">✨ Why E-Sakay?</span>
					</div>
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
						Everything you need in one ride
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
						E-Sakay is built for Filipino commuters who want a faster, greener, and more affordable way to travel.
					</p>
				</div>

				{/* Features Grid - Mobile First */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
					
					{/* Feature 1 */}
					<div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all">
						<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">100% Electric Fleet</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">All our vehicles are electric — e-bikes, e-trikes, and e-jeepneys.</p>
					</div>

					{/* Feature 2 */}
					<div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all">
						<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📍</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Real-Time Tracking</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">Track your driver live on the map and know exactly when your ride arrives.</p>
					</div>

					{/* Feature 3 */}
					<div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all">
						<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔒</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Safe & Verified Drivers</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">Every driver is background-checked and vehicle-inspected.</p>
					</div>

					{/* Feature 4 */}
					<div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all">
						<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💳</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Affordable Fares</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">Transparent, low-cost pricing with no hidden fees.</p>
					</div>

					{/* Feature 5 */}
					<div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all">
						<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⏰</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Available 24/7</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">Need a ride early morning or late at night? E-Sakay's here.</p>
					</div>

					{/* Feature 6 */}
					<div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all">
						<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌿</div>
						<h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Eco-Friendly</h4>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed">Every trip reduces carbon emissions compared to traditional vehicles.</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
