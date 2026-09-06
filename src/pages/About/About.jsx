import React from 'react';
import { Link } from 'react-router-dom';
import StatsCounter from '../../components/StatsCounter/StatsCounter.jsx';
import OutlineIcon from '../../components/icons/OutlineIcon.jsx';
import MotionReveal, { staggerDelay } from '../../motion/MotionReveal.jsx';
import './About.css';

const team = [
  { initials: 'RM', name: 'Rajeev M P', role: 'Career Counsellor', detail: 'Sales Head', tone: 'lime' },
  { initials: 'RK', name: 'Rakshith Kumar B G', role: 'Admissions Head', detail: 'Partnerships', tone: 'teal' },
  { initials: 'RG', name: 'Raghavendra M', role: 'Operations Head', detail: 'Marketing', tone: 'ink' },
];

export default function About() {
  return (
    <div className="mmc-about">
      <section className="mmc-about-hero">
        <div className="mmc-about-glow" aria-hidden="true" />
        <div className="mmc-about-grid" aria-hidden="true" />

        <article className="mmc-float-card mmc-float-card--tl mmc-float">
          <div className="mmc-float-avatar mmc-float-avatar--lime">RM</div>
          <div>
            <strong>Rajeev M P</strong>
            <span>Career Counsellor</span>
            <small>Kasturi Nagar · Bengaluru</small>
          </div>
        </article>

        <article className="mmc-float-card mmc-float-card--tr mmc-float">
          <div className="mmc-float-avatar mmc-float-avatar--teal">RK</div>
          <div>
            <strong>Rakshith Kumar</strong>
            <span>Admissions Head</span>
            <small>India &amp; abroad</small>
          </div>
        </article>

        <article className="mmc-float-stack mmc-float">
          <div className="mmc-float-stack-card">
            <span>Featured match</span>
            <strong>KCET · Engineering</strong>
            <p>Safe · Moderate · Dream colleges from live cutoffs</p>
          </div>
        </article>

        <div className="mmc-about-hero-copy">
          <h1>Empower the next generation of students.</h1>
          <p>
            MapMyCareer360 charts a clear path — assessment, KCET &amp; PGCET predictors, and admission support.
          </p>
          <div className="mmc-about-hero-actions">
            <Link to="/register" className="mmc-about-btn mmc-about-btn--lime">
              Get Started
            </Link>
            <Link to="/career-assessment" className="mmc-about-btn mmc-about-btn--ink">
              <OutlineIcon name="play" size={16} />
              Take Assessment
            </Link>
          </div>
        </div>

        <span className="mmc-float-pill mmc-float-pill--bl mmc-float">
          <span className="mmc-float-dot">A</span>
          Ananya · Engineering
        </span>
        <span className="mmc-float-pill mmc-float-pill--br mmc-float">
          <span className="mmc-float-dot mmc-float-dot--teal">R</span>
          Rahul · PGCET
        </span>
      </section>

      <StatsCounter />

      <section className="mmc-about-story">
        <div className="container mmc-about-story-grid">
          <MotionReveal>
            <p className="mmc-section-eyebrow">Our story</p>
            <h2>Guidance beyond academics.</h2>
            <p>
              Students need direction, not guesswork. We stay with them from stream choice after 10th through college admission and placement prep.
            </p>
          </MotionReveal>
          <div className="mmc-about-mission">
            <MotionReveal delay={staggerDelay(1)} className="mmc-about-panel">
              <span>Vision</span>
              <h3>Bridge potential and opportunity.</h3>
            </MotionReveal>
            <MotionReveal delay={staggerDelay(2)} className="mmc-about-panel">
              <span>Mission</span>
              <h3>Informed decisions, every step.</h3>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className="mmc-about-team">
        <div className="container">
          <MotionReveal className="section-title">
            <p className="mmc-section-eyebrow">The desk</p>
            <h2>People behind the map</h2>
          </MotionReveal>
          <div className="mmc-about-team-grid">
            {team.map((member, i) => (
              <MotionReveal key={member.name} className="mmc-about-person" delay={staggerDelay(i)}>
                <div className={`mmc-about-person-photo mmc-about-person-photo--${member.tone}`}>{member.initials}</div>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
                <small>{member.detail}</small>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
