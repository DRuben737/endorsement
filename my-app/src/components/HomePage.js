import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/HomePage.module.css';

const features = [
  {
    title: 'Endorsement Generator',
    description: 'Build endorsement draft packets faster with template search, signatures, and clean PDF output.',
    link: '/endorsement-generator',
    eyebrow: 'Most used',
    image: require('../images/feature1.png'),
  },
  {
    title: 'Flight Brief Tool',
    description: 'Combine weather context, planning notes, and operational checks in one preflight workflow.',
    link: '/flight-brief',
    eyebrow: 'Preflight',
    image: require('../images/feature2.png'),
  },
  {
    title: 'Weight & Balance',
    description: 'Run loading scenarios quickly and catch envelope issues before they become dispatch mistakes.',
    link: '/wb',
    eyebrow: 'Safety',
    image: require('../images/feature4.png'),
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.heroWrapper}>
      <section className={styles.heroPanel}>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>PilotSeal Toolkit</p>
          <h1 className={styles.heroTitle}>Sharper tools for training, endorsements, and flight prep.</h1>
          <p className={styles.tagline}>
            Reduce repetitive paperwork, tighten your preflight workflow, and keep the core student-facing tools in one place.
          </p>
          <div className={styles.ctaButtons}>
            <button
              className={styles.primaryBtn}
              onClick={() => navigate('/endorsement-generator')}
            >
              Open Endorsement Generator
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={() => {
                const target = document.getElementById('features');
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Browse Tools
            </button>
          </div>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.statCard}>
            <strong>3</strong>
            <span>core workflows surfaced on the home page</span>
          </div>
          <div className={styles.statCard}>
            <strong>PDF</strong>
            <span>export-ready outputs for paper or digital use</span>
          </div>
          <div className={styles.statCard}>
            <strong>Mobile</strong>
            <span>responsive layout for ramp-side use</span>
          </div>
        </div>
      </section>

      <div className={styles.quickList}>
        <div>
          <h2>What's improved</h2>
          <p>Cleaner navigation, more focused tool cards, and a stronger foundation for adding more aviation utilities without the UI drifting.</p>
        </div>
        <button className={styles.inlineLink} onClick={() => navigate('/about')}>
          Read project background
        </button>
      </div>

      <div id="features" className={styles.featureSection}>
        {features.map((feature) => (
          <article key={feature.title} className={styles.card}>
            <img src={feature.image} alt={feature.title} />
            <div className={styles.cardContent}>
              <span className={styles.eyebrow}>{feature.eyebrow}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <button
                className={styles.cardBtn}
                onClick={() => navigate(feature.link)}
              >
                Open Tool
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
