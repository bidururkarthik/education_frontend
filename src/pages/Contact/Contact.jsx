import React, { useState } from 'react';
import api from '../../api/api.js';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ loading: false, sent: false, error: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, sent: false, error: '' });
    try {
      await api.post('/contact', form);
      setStatus({ loading: false, sent: true, error: '' });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, sent: false, error: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="mmc-contact-page">

      {/* HERO */}
      <header className="mmc-ct-hero">
        <svg className="mmc-ct-hero-contours" viewBox="0 0 1140 380" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50,90 C 200,40 400,140 650,85 C 850,40 1000,110 1200,70" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,170 C 220,120 420,220 660,160 C 860,115 1010,190 1200,150" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,250 C 240,200 440,300 680,240 C 880,195 1020,270 1200,230" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,330 C 260,280 460,380 700,320 C 900,275 1030,350 1200,310" stroke="#0074CC" strokeWidth="1" fill="none" />
        </svg>
        <div className="container mmc-ct-hero-inner">
          <div className="mmc-eyebrow mono">Get in touch</div>
          <h1>Contact Us</h1>
          <p>Have a question about assessments, predictors or admissions? We're here to help.</p>
        </div>
      </header>

      {/* SECTION */}
      <section className="mmc-ct-section">
        <div className="container mmc-contact-grid">

          <div className="mmc-contact-info">
            <span className="mono">Reach us</span>
            <h3>Talk to a counsellor</h3>

            <div className="mmc-contact-row">
              <span className="mmc-contact-icon">📍</span>
              <p>Kasturi Nagar, Bangalore</p>
            </div>
            <div className="mmc-contact-row">
              <span className="mmc-contact-icon">📞</span>
              <p><a href="tel:+919008804368">+91 90088 04368</a></p>
            </div>
            <div className="mmc-contact-row">
              <span className="mmc-contact-icon">📞</span>
              <p><a href="tel:+916366018352">+91 63660 18352</a></p>
            </div>
            <div className="mmc-contact-row">
              <span className="mmc-contact-icon">✉️</span>
              <p><a href="mailto:info@mapmycareer360.com">info@mapmycareer360.com</a></p>
            </div>
            <div className="mmc-contact-row">
              <span className="mmc-contact-icon">💬</span>
              <p><a href="https://wa.link/czgq77" target="_blank" rel="noreferrer">Chat with us on WhatsApp</a></p>
            </div>
          </div>

          <form className="mmc-contact-form" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            <p className="mmc-contact-form-sub">We usually reply within one business day.</p>

            <div className="mmc-form-group">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="mmc-form-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mmc-form-group">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="mmc-form-group">
              <label>Message</label>
              <textarea name="message" rows="4" value={form.message} onChange={handleChange} required />
            </div>
            {status.error && <p className="mmc-error-msg">{status.error}</p>}
            {status.sent && <p className="mmc-success-msg">Thanks! We'll get back to you shortly.</p>}
            <button className="btn-primary" type="submit" disabled={status.loading}>
              {status.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
