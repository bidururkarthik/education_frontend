import React from 'react';
import './About.css';

const team = [
  {
    initials: 'RM',
    name: 'Rajeev M P',
    role: 'Career Counsellor & Sales Head',
    variant: 'brass',
  },
  {
    initials: 'RK',
    name: 'Rakshith Kumar B G',
    role: 'Partnerships & Admissions Head',
    variant: 'coral',
  },
  {
    initials: 'RM',
    name: 'Raghavendra M',
    role: 'Marketing & Operations Head',
    variant: 'sage',
  },
];

const route = [
  { step: '01', title: 'Free Consultation', copy: 'Connect with our counsellors and set the starting point.' },
  { step: '02', title: 'Counselling & Assessment', copy: 'Aptitude tests uncover the right stream and direction.' },
  { step: '03', title: 'College Shortlisting', copy: 'Best-fit colleges, matched against real cutoff data.' },
  { step: '04', title: 'Application Support', copy: 'Documentation and admissions handled end to end.' },
  { step: '05', title: 'Placement Prep', copy: 'Resumes, mock interviews and job readiness.' },
];

const values = [
  { label: 'End-to-end', title: 'Full Guidance', copy: 'From stream selection to placement, we stay on the route with you.' },
  { label: 'Access', title: 'Admission Support', copy: 'A global network across India and abroad, matched to real cutoffs.' },
  { label: 'Funding', title: 'Scholarships', copy: 'We help identify and apply for scholarships students qualify for.' },
  { label: '1-on-1', title: 'Mentorship', copy: 'Personal mentoring that continues well past the first consultation.' },
];

export default function About() {
  return (
    <div className="mmc-about">

      {/* HERO */}
      <header className="mmc-hero">
        <svg className="mmc-hero-contours" viewBox="0 0 1140 620" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50,120 C 200,60 400,180 650,110 C 850,55 1000,140 1200,90" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,220 C 220,160 420,280 660,210 C 860,155 1010,240 1200,190" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,320 C 240,260 440,380 680,310 C 880,255 1020,340 1200,300" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,420 C 260,360 460,480 700,410 C 900,355 1030,440 1200,400" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,520 C 280,460 480,580 720,510 C 920,455 1040,540 1200,500" stroke="#0074CC" strokeWidth="1" fill="none" />
        </svg>
        <div className="container mmc-hero-inner">
          <div className="mmc-eyebrow mono">Bengaluru, Karnataka · Est. counselling desk</div>
          <h1>Every career has a route.<br />We help you <em>chart</em> yours.</h1>
          <p className="mmc-hero-sub">
            MapMyCareer360 pairs scientific career assessment with real cutoff-data driven predictors
            for KCET and PGCET admissions — so students stop guessing and start planning, from the
            first assessment to the final placement.
          </p>
          <div className="mmc-hero-actions">
            <a className="btn-primary" href="/contact">Book a free consultation →</a>
            <span className="mono mmc-hero-coords">12.9975° N, 77.6499° E — Kasturi Nagar</span>
          </div>
        </div>
      </header>

      {/* ROUTE / PROCESS */}
      <section className="mmc-route">
        <div className="container">
          <div className="mmc-section-head">
            <span className="mono">The MMC Navigator</span>
            <h2>Five waypoints, one destination.</h2>
          </div>
          <div className="mmc-route-track">
            <div className="mmc-route-line" />
            {route.map((r) => (
              <div className="mmc-route-stop" key={r.step}>
                <div className="mmc-route-pin">{r.step}</div>
                <h4>{r.title}</h4>
                <p>{r.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY / MISSION / VISION */}
      <section className="mmc-story">
        <div className="container mmc-story-grid">
          <div>
            <span className="mono mmc-label">Our story</span>
            <h2>Guiding students<br />beyond academics.</h2>
            <div className="mmc-story-copy">
              <p>
                <strong>Map My Career 360 (MMC360)</strong> was founded on a simple belief: students need
                more than academics to succeed — they need the right direction, support, and opportunities.
              </p>
              <p>
                From helping students choose their career stream after 10th, to securing admissions in top
                universities across India and abroad, and finally preparing them for successful placements,
                MMC360 is an end-to-end platform dedicated to student success.
              </p>
            </div>
          </div>
          <div>
            <div className="mmc-waypoint-card">
              <span className="mono">Our Vision</span>
              <h3>Bridging potential and opportunity.</h3>
              <p>To bridge the gap between academic potential and real-world opportunities.</p>
            </div>
            <div className="mmc-waypoint-card">
              <span className="mono">Our Mission</span>
              <h3>Informed decisions, every step.</h3>
              <p>To empower every student with informed decisions, expert guidance, and continuous support throughout their career journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES / WHY US */}
      <section className="mmc-values">
        <div className="container">
          <div className="mmc-section-head mmc-section-head--tight">
            <span className="mono mmc-label--sage">What makes us different</span>
            <h2>Guidance that doesn't end at admission.</h2>
          </div>
          <div className="mmc-values-grid">
            {values.map((v) => (
              <div className="mmc-value-cell" key={v.title}>
                <span className="mono">{v.label}</span>
                <h4>{v.title}</h4>
                <p>{v.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mmc-team">
        <div className="container">
          <div className="mmc-team-head">
            <div>
              <span className="mono">Field team</span>
              <h2>The people plotting the route.</h2>
            </div>
            <p>Three heads, one desk in Kasturi Nagar — counselling, admissions, and the operations that keep every application on schedule.</p>
          </div>
          <div className="mmc-team-grid">
            {team.map((member) => (
              <div className="mmc-agent-card" key={member.name}>
                <div className="mmc-agent-pin" />
                <div className={`mmc-agent-badge mmc-agent-badge--${member.variant}`}>{member.initials}</div>
                <h4>{member.name}</h4>
                <div className="mmc-agent-role">{member.role}</div>
                <div className="mmc-agent-coords mono">Kasturi Nagar, Bengaluru</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mmc-cta">
        <div className="container">
          <h2>Ready to plot your route?</h2>
          <p>Book a free consultation and let's map the path from where you are to where you want to be.</p>
          <a className="btn-primary" href="/contact-us">Book Free Consultation →</a>
        </div>
      </section>

    </div>
  );
}