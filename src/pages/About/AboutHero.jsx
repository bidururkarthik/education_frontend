import React from 'react';
import { Link } from 'react-router-dom';
import OutlineIcon from '../../components/icons/OutlineIcon.jsx';
import AnimatedText from '../../motion/AnimatedText.jsx';
import CenterFlow from '../../motion/CenterFlow.jsx';
import MotionReveal, { staggerDelay } from '../../motion/MotionReveal.jsx';

export default function AboutHero() {
  const scrollToStory = () => {
    document.getElementById('mmc-about-story')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="mmc-about-hero" aria-label="About MapMyCareer360">
      <div className="container mmc-about-hero-stage">
        <div className="mmc-about-hero-copy">
          <p className="mmc-hero-crumb">About / MapMyCareer360</p>
          <h1>
            <AnimatedText>Empower the next generation of students.</AnimatedText>
          </h1>
          <p className="mmc-hero-sub">
            MapMyCareer360 charts a clear path — assessment, KCET &amp; PGCET predictors, and admission support.
          </p>
          <div className="mmc-about-hero-actions">
            <Link to="/register" className="mmc-hero-cta">
              Get Started
            </Link>
            <Link to="/career-assessment" className="mmc-hero-ghost">
              <OutlineIcon name="play" size={16} />
              Take Assessment
            </Link>
          </div>
          <button type="button" className="mmc-about-scroll" onClick={scrollToStory}>
            <span>Scroll</span>
            <OutlineIcon name="arrow" size={14} />
          </button>
        </div>

        <div className="mmc-about-hero-visual">
          <div className="mmc-about-glow" aria-hidden="true" />
          <div className="mmc-about-grid" aria-hidden="true" />
          <CenterFlow className="mmc-about-hero-flow" />

          <div className="mmc-float-stack">
            <MotionReveal variant="scale">
              <div className="mmc-float-stack-card">
                <span>Featured match</span>
                <strong>KCET · Engineering</strong>
                <p>Safe · Moderate · Dream colleges from live cutoffs</p>
              </div>
            </MotionReveal>
          </div>

          <MotionReveal variant="left" delay={staggerDelay(1)} className="mmc-float-card mmc-float-card--tl mmc-float">
            <div className="mmc-float-avatar mmc-float-avatar--lime">RM</div>
            <div>
              <strong>Rajeev M P</strong>
              <span>Career Counsellor</span>
              <small>Kasturi Nagar · Bengaluru</small>
            </div>
          </MotionReveal>

          <MotionReveal variant="right" delay={staggerDelay(2)} className="mmc-float-card mmc-float-card--tr mmc-float">
            <div className="mmc-float-avatar mmc-float-avatar--teal">RK</div>
            <div>
              <strong>Rakshith Kumar</strong>
              <span>Admissions Head</span>
              <small>India &amp; abroad</small>
            </div>
          </MotionReveal>

          <span className="mmc-float-pill mmc-float-pill--bl mmc-float">
            <span className="mmc-float-dot">A</span>
            Ananya · Engineering
          </span>
          <span className="mmc-float-pill mmc-float-pill--br mmc-float">
            <span className="mmc-float-dot mmc-float-dot--teal">R</span>
            Rahul · PGCET
          </span>
        </div>
      </div>
    </section>
  );
}
