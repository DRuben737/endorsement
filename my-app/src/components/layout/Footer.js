import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-links">
            <Link to="/home">Home</Link>
            <a href="https://ruben.pilotseal.com" target="_blank" rel="noopener noreferrer">Blog</a>
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <div className="footer-meta">
            <p>© {currentYear} PilotSeal Tools. Flight planning utilities for instructors and students.</p>
            <p>Verify all operational, regulatory, and endorsement content against current FAA references before use.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
