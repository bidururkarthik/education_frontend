import React from 'react';
import { Link } from 'react-router-dom';
import SliderHome from '../../components/SliderHome/SliderHome.jsx';
import TransformationBanner from '../../components/TransformationBanner/TransformationBanner.jsx';
import StatsCounter from '../../components/StatsCounter/StatsCounter.jsx';
import ProcessSteps from '../../components/ProcessSteps/ProcessSteps.jsx';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs.jsx';
import Testimonials from '../../components/Testimonials/Testimonials.jsx';
import './Home.css';

const SERVICES = [
  { icon: '🧭', title: 'Career Assessment', text: 'Scientific assessment that maps your interests, aptitude & personality to the right career streams.', link: '/career-assessment' },
  { icon: '🎓', title: 'KCET Predictor', text: 'Enter your rank & category to instantly see Safe, Moderate and Dream engineering colleges.', link: '/kcet-predictor' },
  { icon: '📘', title: 'PGCET Predictor', text: 'Plan your postgraduate admissions with data-driven college predictions.', link: '/pgcet-predictor' },
  { icon: '⚖️', title: 'Compare Colleges', text: 'Compare fees, courses, facilities and rankings side-by-side before you decide.', link: '/college-compare' },
  { icon: '💳', title: 'Subscription Plans', text: 'Launch offer: every plan is ₹1 - unlock all predictors and assessments.', link: '/subscription' },
  { icon: '🤝', title: 'College Admission Support', text: 'End-to-end guidance and referrals to help you secure admission in the right college.', link: '/college-admission-enquiry' },
];

export default function Home() {
  return (
    <div className="mmc-home">
      <SliderHome />
      <StatsCounter />

      <section className="section mmc-services-section">
        <div className="container">
          <div className="section-title">
            <h2>What We <span>Offer</span></h2>
            <p>Everything a student needs to plan and secure their ideal career, in one platform.</p>
          </div>
          <div className="mmc-services-grid">
            {SERVICES.map((s) => (
              <Link to={s.link} className="card mmc-service-card" key={s.title}>
                <span className="mmc-service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TransformationBanner />
      <ProcessSteps />
      <WhyChooseUs />
      <Testimonials />

      <section className="mmc-cta-band">
        <div className="container mmc-cta-band-inner">
          <div>
            <h2>Ready to map your career?</h2>
            <p>Join thousands of students who found clarity with MapMyCareer360 - launch pricing is just ₹1.</p>
          </div>
          <Link to="/register" className="btn btn-primary">Get Started Free</Link>
        </div>
      </section>
    </div>
  );
}
