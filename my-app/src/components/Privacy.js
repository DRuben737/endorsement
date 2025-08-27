import React from 'react';
import '../css/Privacy.css';

function Privacy() {
  return (
    <div className="privacy-container">
      <div className="privacy-card">
        <h2>Privacy Policy</h2>
        <p>At Pilot Seal, your privacy is important to us. This Privacy Policy explains what information we collect, how we use it, and your rights in relation to that information.</p>

        <h3>1. Information We Collect</h3>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>Personal identifiers such as name and email address (if voluntarily submitted)</li>
          <li>Device and browser data (e.g., IP address, user agent)</li>
          <li>Usage data such as page visits, session duration, and clicks, collected via Google Analytics</li>
        </ul>

        <h3>2. How We Use Your Information</h3>
        <p>The information collected is used to:</p>
        <ul>
          <li>Improve user experience and website performance</li>
          <li>Monitor usage trends and fix bugs</li>
          <li>Respond to user inquiries or feedback</li>
        </ul>

        <h3>3. Cookies & Tracking</h3>
        <p>We use cookies and similar tracking technologies to enhance your browsing experience. You can modify your browser settings to decline cookies if you prefer.</p>

        <h3>4. Data Sharing</h3>
        <p>We do not sell your personal information. We may share anonymized data with analytics providers like Google Analytics to help us improve the site.</p>

        <h3>5. Data Security</h3>
        <p>We use reasonable technical and administrative measures to protect your information from unauthorized access, loss, or misuse.</p>

        <h3>6. Your Rights</h3>
        <p>You may have rights under applicable laws to access, correct, or delete your personal information. You can contact us for assistance.</p>

        <h3>7. Changes to This Policy</h3>
        <p>This Privacy Policy may be updated periodically. Changes will be posted on this page with the “Last Updated” date.</p>

        <h3>8. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, you can contact us at:</p>
        <p>Email: support@pilotseal.com</p>

        <p style={{ fontStyle: 'italic' }}>Last Updated: August 25, 2025</p>
      </div>
    </div>
  );
}

export default Privacy;