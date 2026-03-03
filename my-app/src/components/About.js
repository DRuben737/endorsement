import React from "react";
import { Helmet } from "react-helmet-async";
import "../css/Privacy.css";

function About() {
  return (
    <div className="privacy-container">
      <Helmet>
        <title>About | PilotSeal Tools</title>
        <meta
          name="description"
          content="About PilotSeal Tools — practical aviation tools for CFIs and student pilots, focused on endorsement workflows, briefing structure, and training consistency."
        />
      </Helmet>

      <h2>About PilotSeal Tools</h2>

      <p>
        PilotSeal Tools is a practical toolkit designed for CFIs and student pilots.
        The goal is to make common training workflows clearer and more consistent —
        especially around endorsements, briefing structure, and documentation habits.
      </p>

      <section>
        <h3>🧭 What this site is</h3>
        <p>
          This subdomain (tool.pilotseal.com) hosts the interactive tools.
          For guides, documentation, and structured endorsement references,
          visit the main site at{" "}
          <a
            href="https://pilotseal.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            pilotseal.com
          </a>.
        </p>
      </section>

      <section>
        <h3>🛠️ Core Tools</h3>

        <h4>✅ Endorsement Generator</h4>
        <p>
          Generate structured logbook endorsement wording drafts for common
          training scenarios. Designed to reduce omissions and formatting
          inconsistencies. Always verify applicability and currency against
          official FAA references before signing.
        </p>
        <p>
          <a href="/endorsement-generator">
            Open Endorsement Generator →
          </a>
        </p>

        <h4>📋 Flight Brief</h4>
        <p>
          A structured preflight briefing workflow for instructional scenarios.
          Use it to standardize lesson discussions, reinforce risk awareness,
          and improve training consistency.
        </p>
        <p>
          <a href="/flight-brief">
            Open Flight Brief →
          </a>
        </p>

        <h4>⚖️ Weight &amp; Balance</h4>
        <p>
          Quick weight and balance calculations intended for training aircraft.
          Helpful for reinforcing performance awareness and consistent planning
          habits during instruction.
        </p>
        <p>
          <a href="/wb">
            Open Weight &amp; Balance →
          </a>
        </p>
      </section>

      <section>
        <h3>⚠️ Compliance Note</h3>
        <p>
          PilotSeal Tools is provided for educational and workflow support
          purposes only. It does not replace FAA regulations, official guidance,
          or instructor judgment. Instructors remain responsible for verifying
          applicability, aircraft category/class, limitations, and current
          requirements.
        </p>
      </section>

      <section>
        <h3>👨‍✈️ Founder</h3>
        <p>
          Deshuai “Ruben” Ren is a dual-rated Gold Seal CFII and aviation safety
          advocate, currently pursuing an M.S. in Aviation Safety at
          Embry-Riddle Aeronautical University.
        </p>
      </section>

      <section>
        <h3>📫 Contact</h3>
        <p>
          For feedback, bug reports, or feature suggestions:
          <br />
          📧{" "}
          <a href="mailto:admin@pilotseal.com">
            admin@pilotseal.com
          </a>
        </p>
      </section>

      <section>
        <h3>🙏 Acknowledgments</h3>
        <p>
          Special thanks to{" "}
          <strong>
            Stephane Rebeix (
            <a
              href="https://usatsflighttraining.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              U.S. Aviation Training Solutions
            </a>
            )
          </strong>{" "}
          for mentorship and support. His dedication to aviation education and
          safety has been a guiding influence in the creation of PilotSeal.
        </p>
      </section>
    </div>
  );
}

export default About;