import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/HomePage.module.css';

const features = [
  {
    icon: "✅",
    title: "Endorsement Generator",
    description: "Generate FAA-compliant logbook endorsements quickly.",
    link: "/endorsement-generator",
    comingSoon: false,
    image: require('../images/feature1.png')
  },
  {
    icon: "📋",
    title: "Flight Brief Tool",
    description: "Preflight planning, risk assessment, weather, W&B and more.",
    link: "/flight-brief",
    comingSoon: false,
    image: require('../images/feature2.png')
  },
  {
    icon: "📁",
    title: "Logbook Tools",
    description: "Organize and export your training logs. (Coming Soon)",
    link: "#",
    comingSoon: true,
    image: require('../images/feature3.png')
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroContent}>
        <p className={styles.tagline}>
          All-in-one tools for flight instructors and students
        </p>
        <div className={styles.ctaButtons}>
          <button
            className={styles.primaryBtn}
            onClick={() => {
              const target = document.getElementById('features');
              target?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Started
          </button>
          <button className={styles.secondaryBtn} onClick={() => navigate('/about')}>Learn More</button>
        </div>
      </div>

      <div id="features" className={styles.featureSection}>
        {features.map((feature, index) => (
          <div key={index} className={styles.card}>
            <img src={feature.image} alt={feature.title} />
            <div className={styles.cardContent}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              {feature.comingSoon ? (
                <span className={styles.comingSoon}>Coming Soon</span>
              ) : (
                <button
                  className={styles.cardBtn}
                  onClick={() => navigate(feature.link)}
                >
                  Try Now →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;