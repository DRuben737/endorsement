import React from 'react';
import '../css/Privacy.css';

function Privacy() {
  return (
    <div className="privacy-container">
      <div className="privacy-card">
        <h2>Privacy Policy</h2>

        <p>
          Pilot Seal is a client-side tool designed for flight instructors and pilots. 
          We respect your privacy and minimize the amount of information collected.
        </p>

        <h3>1. Information We Collect</h3>
        <p>
          Pilot Seal does not collect any personal information such as names, emails, 
          passwords, flight entries, or aircraft data you type into the app.
        </p>
        <p>However, we use Google Analytics (GA4) to collect:</p>
        <ul>
          <li>General device and browser information</li>
          <li>Approximate location (country/region)</li>
          <li>Pages visited and time on page</li>
          <li>Anonymous usage patterns</li>
        </ul>
        <p>Google Analytics does <strong>not</strong> give us access to your identity or any personally identifiable information.</p>

        <h3>2. How Data Is Used</h3>
        <p>Analytics data is used only for:</p>
        <ul>
          <li>Improving website performance</li>
          <li>Understanding which features users interact with</li>
          <li>Fixing bugs and enhancing user experience</li>
        </ul>

        <h3>3. What We Do NOT Collect</h3>
        <ul>
          <li>No name, email, or account information</li>
          <li>No flight logs you enter into the app</li>
          <li>No payment or financial information</li>
          <li>No cookies for advertising or user tracking outside GA4</li>
          <li>No server-side storage — the app has no backend</li>
        </ul>

        <h3>4. Google Analytics</h3>
        <p>
          Google Analytics uses cookies and anonymized identifiers. 
          You may disable cookies in your browser if you prefer  
          or use Google’s “Opt-Out” browser add-on.
        </p>

        <h3>5. Data Storage</h3>
        <p>
          Pilot Seal does not store any user-submitted data. 
          All Weight & Balance calculations and text fields are processed 
          locally in your browser.
        </p>

        <h3>6. Changes to This Policy</h3>
        <p>
          We may update this policy in the future if new features are added. 
          Changes will be posted on this page.
        </p>

        <h3>7. Contact</h3>
        <p>If you have questions about privacy, reach us at:</p>
        <p>Email: support@pilotseal.com</p>

        <p style={{ fontStyle: 'italic' }}>Last Updated: October 2025</p>
      </div>
    </div>
  );
}

export default Privacy;