import React from 'react'

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-inner container">
                <div className="footer-left">
                    <div className="brand">
                        <span className="brand-icon">⚡</span>
                        <span className="brand-text">E-Sakay</span>
                    </div>
                    <p className="footer-copy">© 2026 E-Sakay. Eco-friendly rides for every Filipino.</p>
                </div>

                <nav className="footer-nav">
                    <a href="#features">Features</a>
                    <a href="#how">How It Works</a>
                    <a href="#about">About</a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
