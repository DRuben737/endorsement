
// src/components/HomePage.js
import React from 'react';
import styles from '../css/HomePage.module.css'; // 导入 CSS 模块

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome!</h1>
      <p className={styles.intro}>
          This site is not just a tool; it's a labor of love. It began with a simple frustration: printing endorsements was a hassle. I wanted to find a way to make it easier, so I created a solution that helps everyone in aviation—students, instructors, and enthusiasts alike.
      </p>
      <p className={styles.experience}>
          As I built and refined this tool, it became more than just a time-saver. It's now an integral part of my daily routine and a resource I hope will benefit you too. I've connected it with my own spreadsheets, aiming to provide features that truly help you in your aviation journey.
      </p>
      <p className={styles.community}>
          The Pilotchat community is currently in testing, with space for just 20 users at this stage. It's a chance to be part of something new, something that aims to make a real difference in the way we handle endorsements.
      </p>
      <p className={styles.conclusion}>
          I'm thrilled to share this with you and excited about the possibilities ahead. Thank you for being part of this adventure!
      </p>
      <p className={styles.conclusion}>Navigate to the Logbook, Weight and Balance, or Generate Endorsement pages using the links above.</p>
    </div>
  );
};

export default HomePage;