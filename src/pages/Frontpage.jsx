// Global styles are loaded from src/main.jsx (App.css is imported there)
import Home from '../components/frontpage/home';
import About from '../components/frontpage/about';
import About1 from '../components/frontpage/about1';
import About2 from '../components/frontpage/about2';
import logo from '../assets/logo.png.jpg'

function Frontpage() {
  return (
    <div className="App">
      <Home />
      <About />
      <About1 />
      <About2 />
      {/* Footer - Mobile First */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-8 sm:py-12 md:py-16 lg:py-20 border-t border-gray-800">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Footer Grid - Mobile First */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
              
              {/* Brand Section */}
              <div className="col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <img src={logo} alt="E-Sakay" className="h-8 sm:h-10 w-auto" />
                  <h3 className="text-lg sm:text-2xl font-black text-white">E-Sakay</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Your eco-friendly transportation solution for modern cities
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base mb-3 sm:mb-4 uppercase tracking-wide">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-xs sm:text-sm text-gray-400 hover:text-emerald-500 transition font-medium">Features</a></li>
                  <li><a href="#why-us" className="text-xs sm:text-sm text-gray-400 hover:text-emerald-500 transition font-medium">Why Us</a></li>
                  <li><a href="#contact" className="text-xs sm:text-sm text-gray-400 hover:text-emerald-500 transition font-medium">Contact</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base mb-3 sm:mb-4 uppercase tracking-wide">Company</h4>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-xs sm:text-sm text-gray-400 hover:text-emerald-500 transition font-medium">About Us</a></li>
                  <li><a href="/privacy" className="text-xs sm:text-sm text-gray-400 hover:text-emerald-500 transition font-medium">Privacy</a></li>
                  <li><a href="/terms" className="text-xs sm:text-sm text-gray-400 hover:text-emerald-500 transition font-medium">Terms</a></li>
                </ul>
              </div>

              {/* Community */}
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base mb-3 sm:mb-4 uppercase tracking-wide">Community</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-emerald-500 transition font-medium">Facebook</a></li>
                  <li><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-emerald-500 transition font-medium">Twitter</a></li>
                  <li><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-emerald-500 transition font-medium">Instagram</a></li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 pt-6 sm:pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-500">
                  © 2024 E-Sakay. All rights reserved.
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Made with ❤️ for modern mobility
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Frontpage;