import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const SERVICES = [
  { icon: '🧭', title: 'Career Assessment', text: 'A comprehensive, scientifically designed assessment covering aptitude, interest and personality. Paid access, free for active subscribers. Results are saved to your dashboard.', link: '/career-assessment' },
  { icon: '🎓', title: 'KCET College Predictor', text: 'Enter Rank, Category, Gender and 371J/Hyderabad-Karnataka status to get Safe, Moderate and Dream college predictions based on previous-year cutoff data.', link: '/kcet-predictor' },
  { icon: '📘', title: 'PGCET College Predictor', text: 'Enter Rank, Category, Course and College Type to get postgraduate college predictions.', link: '/pgcet-predictor' },
  { icon: '⚖️', title: 'College Compare', text: 'Compare shortlisted colleges side-by-side on fees, courses, facilities and rankings.', link: '/college-compare' },
  { icon: '💳', title: 'Subscription Plans', text: 'Monthly, Quarterly and Yearly plans unlock free Career Assessment access plus both predictors.', link: '/subscription' },
  { icon: '🎁', title: 'Referral Program', text: 'Refer friends for Career Assessment or Subscription using your personal referral link and track conversions from your dashboard.', link: '/dashboard' },
  { icon: '🏫', title: 'College Admission Referral', text: 'A separate, independent referral channel to help students get guided admission enquiries handled by our counselling team.', link: '/college-admission-enquiry' },
  { icon: '📞', title: 'Personal Counselling', text: 'One-on-one mentorship for Yearly subscribers to help translate assessment & predictor results into a real decision.', link: '/contact' },
];

export default function Services() {
  return (
    <div className="mmc-services-page">

      <header className="mmc-svc-hero">
        <svg className="mmc-svc-hero-contours" viewBox="0 0 1140 380" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50,80 C 200,30 400,130 650,75 C 850,30 1000,100 1200,60" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,150 C 220,100 420,200 660,140 C 860,95 1010,170 1200,130" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,220 C 240,170 440,270 680,210 C 880,165 1020,240 1200,200" stroke="#0074CC" strokeWidth="1" fill="none" />
        </svg>
        <div className="container mmc-svc-hero-inner">
          <span className="mono mmc-eyebrow">The full route</span>
          <h1>Our Services</h1>
          <p>Everything you need, from figuring out "what should I study" to "which college should I join".</p>
        </div>
      </header>

      <section className="mmc-svc-section">
        <div className="container mmc-services-list">
          <div className="mmc-services-line" aria-hidden="true" />
          {SERVICES.map((s, i) => (
            <div className={`mmc-service-row ${i % 2 === 1 ? 'mmc-service-row--alt' : ''}`} key={s.title}>
              <span className="mono mmc-service-index">{String(i + 1).padStart(2, '0')}</span>
              <div className="mmc-service-card">
                <span className="mmc-service-row-icon">{s.icon}</span>
                <div className="mmc-service-row-body">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <Link to={s.link} className="mmc-service-row-link">Explore &rarr;</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mmc-svc-cta">
        <div className="container">
          <h2>Not sure where to start?</h2>
          <p>Book a free consultation and we'll help you pick the right first step.</p>
          <a className="btn-primary" href="/contact-us">Book Free Consultation →</a>
        </div>
      </section>

    </div>
  );
}