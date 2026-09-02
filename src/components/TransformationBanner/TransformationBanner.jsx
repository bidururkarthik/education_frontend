import React from 'react';
import { Link } from 'react-router-dom';
import './TransformationBanner.css';

export default function TransformationBanner() {
  return (
    <section className="mmc-transform section">
      <div className="container mmc-transform-inner">
        <div className="mmc-transform-text">
          <div className="section-title" style={{ textAlign: 'left', marginBottom: 20 }}>
            <h2>Every Student Has a <span>Professional</span> Waiting Inside</h2>
            <p style={{ margin: 0 }}>
              From a confused student carrying a backpack to a confident professional walking into
              their dream career - MapMyCareer360 is the bridge that gets you there.
            </p>
          </div>
          <ul className="mmc-transform-points">
            <li>✔ Scientific Career Assessment to find your true calling</li>
            <li>✔ Real cutoff-data based KCET & PGCET College Predictors</li>
            <li>✔ Personal mentorship through subscription plans</li>
            <li>✔ End-to-end support till college admission</li>
          </ul>
          <Link to="/career-assessment" className="btn btn-primary">Start Your Transformation</Link>
        </div>

        <div className="mmc-transform-image">
          <img src="/images/student-to-professional.png" alt="Student transforming into a career professional" />
        </div>
      </div>
    </section>
  );
}
