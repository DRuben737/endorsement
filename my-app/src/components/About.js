import React, { useEffect } from 'react';
import '../css/Privacy.css';

function About() {
  useEffect(() => {
    document.title = 'About - Pilot Seal';
  }, []);

  return (
    <div className="privacy-container">
      <h2>About Pilot Seal</h2>

      <section>
        <h3>Who We Are</h3>
        <p>
          Pilot Seal is an aviation education platform focused on streamlining documentation and enhancing safety through user-friendly tools.
        </p>
      </section>

      <section>
        <h3>What We Offer</h3>
        <ul>
          <li>Digital Logbook</li>
          <li>Endorsement Generator</li>
          <li>Weight & Balance Tool(Tesing)</li>
          <li>Flight Briefing Module</li>
        </ul>
      </section>

      <section>
        <h3>Founder</h3>
        <p>
          Deshuai “Ruben” Ren is a dual-rated Gold Seal CFII and aviation safety advocate currently pursuing an M.S. at ERAU.
        </p>
      </section>

      <section>
        <h3>Contact</h3>
        <p>
          📧 <a href="mailto:aviation.ruben@gmail.com">aviation.ruben@gmail.com</a>
        </p>
      </section>
    </div>
  );
}

export default About;