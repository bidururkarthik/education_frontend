import React from 'react';
import './ProcessSteps.css';

const STEPS = [
  { n: '01', title: 'Book Free Consultation', text: 'Connect with our experts - no charge, no pressure.' },
  { n: '02', title: 'Counselling & Assessment', text: 'Discover the right career path through our scientific assessment.' },
  { n: '03', title: 'College Shortlisting', text: 'Get Safe, Moderate and Dream colleges instantly with our predictors.' },
  { n: '04', title: 'Application Support', text: 'We help you handle every document and deadline.' },
  { n: '05', title: 'Placement Preparation', text: 'Resume audits, mock interviews and job-readiness coaching.' },
];

export default function ProcessSteps() {
  return (
    <section className="section mmc-process-section">
      <div className="container">
        <div className="section-title">
          <h2>Our <span>Process</span></h2>
          <p>A clear, guided path from "which stream should I pick?" to "I got the placement."</p>
        </div>
        <div className="mmc-process-track">
          {STEPS.map((s, i) => (
            <div className="mmc-process-step" key={s.n}>
              <div className="mmc-process-num">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
              {i < STEPS.length - 1 && <span className="mmc-process-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
