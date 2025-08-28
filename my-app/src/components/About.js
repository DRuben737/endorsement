import React, { useEffect } from 'react';
import '../css/Privacy.css';

function About() {
  useEffect(() => {
    document.title = 'About - Pilot Seal';
  }, []);

  return (
    <div className="privacy-container">
      <h2>Welcome to Pilot Seal</h2>
      <p>
        Pilot Seal is an all-in-one aviation education platform designed for flight instructors and students. Our mission is to streamline the workflow, ensure FAA compliance, and promote safe, professional aviation training.
      </p>

      <section>
        <h3>🛠️ Tools and How to Use Them</h3>

        <h4>✅ Endorsement Generator</h4>
        <p>
          Easily generate FAA-compliant endorsements for student solo, cross-country, and checkride preparation. Just fill in your student and instructor information, and the tool provides pre-formatted entries ready for print or digital copy.
        </p>

        <h4>📋 Flight Brief Tool</h4>
        <p>
          Preflight planning made easy: enter flight details, weather info (METAR/TAF), W&amp;B estimates, and complete a standardized static/dynamic risk assessment. Export a report to review with your student or keep for records.
        </p>

        <h4>📁 Logbook Tools (Coming Soon)</h4>
        <p>
          A future module to let you organize, export, and analyze your training records.
        </p>
      </section>

      <section>
        <h3>👨‍✈️ Founder</h3>
        <p>
          Deshuai “Ruben” Ren is a dual-rated Gold Seal CFII and aviation safety advocate, currently pursuing his M.S. in Aviation Safety at Embry-Riddle Aeronautical University.
        </p>
      </section>

      <section>
        <h3>📫 Contact</h3>
        <p>
          For feedback, bug reports, or feature suggestions:<br />
          📧 <a href="mailto:aviation.ruben@gmail.com">aviation.ruben@gmail.com</a>
        </p>
      </section>
    </div>
  );
}

export default About;