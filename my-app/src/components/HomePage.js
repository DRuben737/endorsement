// src/components/HomePage.js
import React from 'react';
import styles from '../css/HomePage.module.css'; // 导入 CSS 模块

const HomePage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to PilotSeal Endorsement Tool</h1>
        <p>Smart. Compliant. Efficient.</p>
        <a href="/logbook" className={styles.ctaButton}>Get Started</a>
      </section>

      <section className={styles.introSection}>
        <p className={styles.intro}>
          This platform was built to eliminate the hassle of generating FAA endorsements. Designed for flight instructors, students, and aviation enthusiasts, it streamlines the endorsement process and ensures compliance with Part 61.
        </p>
        <p className={styles.experience}>
          Integrated with practical tools and optimized for daily use, it offers flexibility, precision, and ease of access—whether you're preparing for a lesson or documenting progress.
        </p>
        <p className={styles.conclusion}>
          Explore the Logbook, Weight and Balance, and Endorsement Generator using the navigation links above.
        </p>
      </section>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <h3>Logbook</h3>
          <p>Record and track your flight history with ease.</p>
          <a href="/logbook">Open Logbook</a>
        </div>
        <div className={styles.featureCard}>
          <h3>Weight & Balance</h3>
          <p>Calculate aircraft load and performance instantly.</p>
          <a href="/w-and-b">Try W&amp;B Tool</a>
        </div>
        <div className={styles.featureCard}>
          <h3>Endorsement Generator</h3>
          <p>Generate accurate FAA-compliant endorsements.</p>
          <a href="/endorsements">Generate Now</a>
        </div>
      </section>

      <section className={styles.authorLink}>
        <a href="https://ruben.pilotseal.com" target="_blank" rel="noopener noreferrer">
          👨‍✈️ Learn more about the creator
        </a>
      </section>
    </div>
  );
};

export default HomePage;