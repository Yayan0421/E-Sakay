// Global styles are loaded from src/main.jsx (App.css is imported there)
import Home from '../components/frontpage/home';
import About from '../components/frontpage/about';
import About1 from '../components/frontpage/about1';
import About2 from '../components/frontpage/about2';
import logo from '../assets/logo.png.jpg'
import '../styles/frontpage.css';

function Frontpage() {
  return (
    <div className="App">
      <Home />
      <About />
      <About1 />
      <About2 />
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
              <img src={logo} alt="E-Sakay" style={{height: '40px', width: 'auto', objectFit: 'contain'}} />
              <h4 style={{margin: 0}}>E-Sakay</h4>
            </div>
            <p>Your eco-friendly transportation solution</p>
          </div>
          <div className="footer-section">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h5>Company</h5>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Frontpage;