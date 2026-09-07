import React from 'react';
import { Link } from 'react-router-dom';
import { staggerDelay } from '../../motion/MotionReveal.jsx';
import ScrollCard from '../../motion/ScrollCard.jsx';
import OutlineIcon from '../../components/icons/OutlineIcon.jsx';
import './Services.css';

const SERVICES = [
  { icon: 'compass', title: 'Career Assessment', text: 'Aptitude, interest and personality mapped to streams.', link: '/career-assessment' },
  { icon: 'cap', title: 'KCET Predictor', text: 'Safe, Moderate and Dream colleges from live cutoffs.', link: '/kcet-predictor' },
  { icon: 'book', title: 'PGCET Predictor', text: 'Postgraduate matches by rank, category and course.', link: '/pgcet-predictor' },
  { icon: 'scale', title: 'College Compare', text: 'Fees, courses and rankings side by side.', link: '/college-compare' },
  { icon: 'target', title: 'Subscription Plans', text: 'Unlock assessment and both predictors from ₹1.', link: '/subscription' },
  { icon: 'handshake', title: 'Referral Program', text: 'Share your link and track conversions in dashboard.', link: '/dashboard' },
  { icon: 'chart', title: 'Admission Support', text: 'Guided enquiries handled by our counselling team.', link: '/college-admission-enquiry' },
  { icon: 'chat', title: 'Personal Counselling', text: 'One-on-one mentorship to turn results into a decision.', link: '/contact' },
];

export default function Services() {
  const orbit = [
    { icon: 'compass', to: '/career-assessment', label: 'Assessment', tone: 'lime' },
    { icon: 'cap', to: '/kcet-predictor', label: 'KCET', tone: 'mint' },
    { icon: 'book', to: '/pgcet-predictor', label: 'PGCET', tone: 'sky' },
    { icon: 'scale', to: '/college-compare', label: 'Compare', tone: 'ink' },
    { icon: 'target', to: '/subscription', label: 'Plans', tone: 'lime' },
    { icon: 'handshake', to: '/college-admission-enquiry', label: 'Admission', tone: 'mint' },
    { icon: 'chat', to: '/contact', label: 'Counselling', tone: 'sky' },
  ];

  return (
    <div className="mmc-services-page">
      <header className="mmc-svc-banner">
        <div className="mmc-svc-banner-glow" aria-hidden="true" />
        <div className="mmc-svc-banner-grid" aria-hidden="true" />

        <div className="mmc-svc-orbit">
          <svg className="mmc-svc-arc" viewBox="0 0 640 280" fill="none" aria-hidden="true">
            <path d="M40 250 C 80 60 200 20 320 20 C 440 20 560 60 600 250" stroke="var(--mmc-blue-soft)" strokeWidth="1.5" strokeDasharray="6 8" />
          </svg>
          <div className="mmc-svc-hub">
            <img src="/images/logo.png" alt="MapMyCareer360" />
          </div>
          {orbit.map((item, i) => (
            <Link
              key={item.label}
              to={item.to}
              className={`mmc-svc-node mmc-svc-node--${i + 1} mmc-svc-node--${item.tone} mmc-float`}
              style={{ animationDelay: `${i * 0.35}s` }}
              aria-label={item.label}
            >
              <OutlineIcon name={item.icon} size={20} />
            </Link>
          ))}
        </div>

        <h1>Connect with the <span>tools students already use daily</span></h1>
        <p>Assessment, KCET & PGCET predictors, compare, and counselling — one platform for the full admission path.</p>
        <Link to="/register" className="mmc-why-cta">Get Started</Link>
      </header>

      <section className="mmc-svc-section">
        <div className="container mmc-svc-grid mmc-scroll-stage">
          {SERVICES.map((s, i) => (
            <ScrollCard as={Link} to={s.link} className="mmc-svc-card" key={s.title} index={i} delay={staggerDelay(i, 90)}>
              <div className="mmc-svc-frame">
                <div className="mmc-svc-photo">
                  <OutlineIcon name={s.icon} size={36} />
                </div>
              </div>
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </ScrollCard>
          ))}
        </div>
      </section>

      <section className="mmc-svc-cta">
        <div className="container">
          <h2>Not sure where to start?</h2>
          <p>Book a free consultation and we’ll help you pick the first step.</p>
          <Link to="/contact" className="mmc-why-cta">Get Started</Link>
        </div>
      </section>
    </div>
  );
}
