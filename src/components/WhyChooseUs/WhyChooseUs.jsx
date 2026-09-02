import React from 'react';
import { Link } from 'react-router-dom';
import './WhyChooseUs.css';

const REASONS = [
  { icon: '🎯', title: 'End-to-End Guidance', text: 'From choosing a stream to landing a placement, we stay with you at every step.' },
  { icon: '🏛️', title: 'Admission Support', text: 'Shortlisting and application help for top colleges across India and abroad.' },
  { icon: '🎓', title: 'Scholarships', text: 'We help identify and apply for scholarships you actually qualify for.' },
  { icon: '📦', title: 'Welcome Kit', text: 'A head start with resources built specifically for incoming students.' },
  { icon: '🤝', title: 'Mentorship', text: 'Personalized 1-on-1 mentoring, not one-size-fits-all advice.' },
  { icon: '⚡', title: 'Instant Predictors', text: 'Free-to-try KCET & PGCET College Predictors - real cutoff data, results in seconds.', highlight: true },
];

export default function WhyChooseUs() {
  return (
    <section className="section mmc-why-section">
      <div className="container">
        <div className="section-title">
          <h2>What Makes Us <span>Different</span></h2>
          <p>We go beyond basic counselling - end-to-end guidance backed by real tools, not just advice.</p>
        </div>
        <div className="mmc-why-grid">
          {REASONS.map((r) => (
            <div className={`card mmc-why-card ${r.highlight ? 'mmc-why-highlight' : ''}`} key={r.title}>
              <span className="mmc-why-icon">{r.icon}</span>
              <h4>{r.title}</h4>
              <p>{r.text}</p>
              {r.highlight && <Link to="/kcet-predictor" className="mmc-why-link">Try it now →</Link>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
