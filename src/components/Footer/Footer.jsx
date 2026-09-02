import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <footer className="mmc-footer">
      <div className="container mmc-footer-grid">
        <div>
          <div className="mmc-footer-brand">
            <img
              src="/images/logo.png"
              alt="MapMyCareer360"
              className={`mmc-footer-logo ${logoLoaded ? 'is-loaded' : ''}`}
              onLoad={() => setLogoLoaded(true)}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <p>MapMyCareer360 is a student-first platform guiding you through career counselling,
            admissions, documentation, and placements - plus tools like the KCET/PGCET College
            Predictors that most consultancies simply don't offer.</p>
          <div className="mmc-footer-social">
            <a href="https://www.facebook.com/mapmycareer360/" target="_blank" rel="noreferrer" aria-label="Facebook">📘</a>
            <a href="https://www.youtube.com/@Mapmycareer360" target="_blank" rel="noreferrer" aria-label="YouTube">▶️</a>
            <a href="https://www.instagram.com/mapmycareer360" target="_blank" rel="noreferrer" aria-label="Instagram">📷</a>
            <a href="https://wa.link/czgq77" target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/career-assessment">Career Assessment</Link></li>
            <li><Link to="/subscription">Subscription Plans</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4>Predictors & Tools</h4>
          <ul>
            <li><Link to="/kcet-predictor">KCET College Predictor</Link></li>
            <li><Link to="/pgcet-predictor">PGCET College Predictor</Link></li>
            <li><Link to="/college-compare">Compare Colleges</Link></li>
            <li><Link to="/college-admission-enquiry">College Admission Enquiry</Link></li>
          </ul>
        </div>

        <div>
          <h4>Get In Touch</h4>
          <ul className="mmc-footer-contact">
            <li>📍 Kasturi Nagar, Bangalore</li>
            <li>📞 <a href="tel:+919008804368">+91 90088 04368</a></li>
            <li>📞 <a href="tel:+916366018352">+91 63660 18352</a></li>
            <li>✉️ <a href="mailto:info@mapmycareer360.com">info@mapmycareer360.com</a></li>
          </ul>
        </div>
      </div>

      <div className="mmc-footer-bottom">
        <p>© {new Date().getFullYear()} MapMyCareer360. All rights reserved | Designed by yashwanth </p>
        <Link to="/admin/login" className="mmc-admin-link">Admin Login</Link>
      </div>
    </footer>
  );
}