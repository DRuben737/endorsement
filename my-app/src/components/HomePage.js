// src/components/HomePage.js
import React from 'react';
import styles from '../css/HomePage.module.css'; // 导入 CSS 模块

const HomePage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <p>
          <a href="/logbook">Go to Logbook</a>
        </p>
        <p className={styles.minimalTagline}>Your toolkit for efficient and compliant FAA endorsements.</p>
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

      <section className={styles.introSection}>
        <p className={styles.authorNote}>
          👨‍✈️ Created by <a href="https://ruben.pilotseal.com" target="_blank" rel="noopener noreferrer">Ruben</a> – check out his work and aviation insights.
        </p>
      </section>
    </div>
  );
};

export default HomePage;