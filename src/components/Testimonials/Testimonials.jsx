import React from 'react';
import './Testimonials.css';

const TESTIMONIALS = [
  { name: 'Ananya R.', role: 'Engineering Student, Bangalore', quote: 'The KCET predictor showed me exactly which colleges I could realistically get into - saved me weeks of guesswork.' },
  { name: 'Rahul K.', role: 'PGCET Aspirant', quote: 'My counsellor helped me shortlist colleges and the predictor confirmed I was aiming at the right ones.' },
  { name: 'Sneha M.', role: 'PU Student', quote: 'The career assessment actually matched what I ended up loving in college. Wish I had this sooner.' },
];

export default function Testimonials() {
  return (
    <section className="section mmc-testimonials-section">
      <div className="container">
        <div className="section-title">
          <h2>Our Students' <span>Feedback</span></h2>
          <p>Real experiences from students who used our counselling and predictor tools.</p>
        </div>
        <div className="mmc-testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div className="card mmc-testimonial-card" key={t.name}>
              <span className="mmc-testimonial-quote-mark">“</span>
              <p>{t.quote}</p>
              <div className="mmc-testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
