import React from "react";
import { Helmet } from "react-helmet-async";
import "../css/Privacy.css";

function Privacy() {
  return (
    <div className="privacy-container">
      <Helmet>
        <title>Privacy Policy | PilotSeal Tools</title>
        <meta
          name="description"
          content="Privacy Policy for PilotSeal Tools. Learn what data we collect (including analytics), how we use it, and your choices."
        />
      </Helmet>

      <h2>Privacy Policy</h2>
      <p>
        <strong>Last updated:</strong> {new Date().toISOString().slice(0, 10)}
      </p>

      <section>
        <h3>1) Overview</h3>
        <p>
          PilotSeal Tools (the “Site”) is a browser-based set of aviation tools
          for CFIs and student pilots. This Privacy Policy explains what
          information we collect, how we use it, and the choices you may have.
        </p>
      </section>

      <section>
        <h3>2) Information we collect</h3>

        <h4>2.1 Analytics data</h4>
        <p>
          We use analytics (such as Google Analytics) to understand how the Site
          is used and to improve performance and usability. Analytics may
          collect information such as:
        </p>
        <ul>
          <li>pages viewed and features used</li>
          <li>approximate location (derived from IP address)</li>
          <li>device/browser information</li>
          <li>referring/exit pages and general usage patterns</li>
        </ul>
        <p>
          This data is generally aggregated and used to improve the Site. We do
          not intentionally use analytics to identify you personally.
        </p>

        <h4>2.2 Information you enter into tools</h4>
        <p>
          Inputs you type into tools (for example, endorsement details, briefing
          notes, or weight &amp; balance values) are processed to generate
          outputs. Unless explicitly stated otherwise on a tool page, we do not
          require you to create an account.
        </p>
        <p>
          <strong>Important:</strong> Avoid entering sensitive personal
          information. Use only what is needed for your workflow.
        </p>
      </section>

      <section>
        <h3>3) How we use information</h3>
        <p>We use collected information to:</p>
        <ul>
          <li>operate and maintain the Site</li>
          <li>improve usability, performance, and reliability</li>
          <li>understand which tools are useful and where users struggle</li>
          <li>monitor for abuse and keep the Site secure</li>
        </ul>
      </section>

      <section>
        <h3>4) Cookies and similar technologies</h3>
        <p>
          Analytics may use cookies or similar technologies to measure and
          understand usage. You can control cookies through your browser
          settings. Disabling cookies may affect parts of the Site experience.
        </p>
      </section>

      <section>
        <h3>5) Third-party services</h3>
        <p>
          We may rely on third-party services for hosting, analytics, and
          monitoring. These providers may process information on our behalf to
          provide their services.
        </p>
        <p>
          Google’s Privacy Policy:{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://policies.google.com/privacy
          </a>
        </p>
      </section>

      <section>
        <h3>6) Your choices</h3>
        <ul>
          <li>
            You can disable cookies in your browser settings (may reduce
            analytics effectiveness).
          </li>
          <li>
            You can use browser extensions or privacy settings that limit
            tracking.
          </li>
          <li>
            You can choose not to use the Site if you do not agree with this
            policy.
          </li>
        </ul>
      </section>

      <section>
        <h3>7) Data retention</h3>
        <p>
          Analytics data is retained according to the settings of our analytics
          provider. We keep only what is necessary for operational and
          improvement purposes.
        </p>
      </section>

      <section>
        <h3>8) Changes to this policy</h3>
        <p>
          We may update this Privacy Policy from time to time. We will update
          the “Last updated” date above when changes are made.
        </p>
      </section>

      <section>
        <h3>9) Contact</h3>
        <p>
          If you have questions about this Privacy Policy, contact:
          <br />
          <a href="mailto:admin@pilotseal.com">admin@pilotseal.com</a>
        </p>
      </section>
    </div>
  );
}

export default Privacy;