import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/home">Home</a>
            <span className="divider">|</span>
            <a href="https://ruben.pilotseal.com" target="_blank" rel="noopener noreferrer">Blog</a>
            <span className="divider">|</span>
            <a href="/about">About</a>
            <span className="divider">|</span>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div className="footer-meta">
            <p>© 2025 Pilot Seal. All rights reserved.</p>
            <p>Copyright © Deshuai Ren. Built with <span className="heart">❤️</span> and React.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;