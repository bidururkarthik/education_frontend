import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { student, logout } = useAuth();
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate('/');
  };

  // Lock background scroll while the mobile menu is open - otherwise the
  // page behind the menu keeps scrolling and other sections peek through
  // the gap above/behind the open panel.
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.classList.add('mmc-menu-open');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.dataset.scrollY = String(scrollY);
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
      document.body.classList.remove('mmc-menu-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      delete document.body.dataset.scrollY;
      window.scrollTo(0, scrollY);
    }
  }, [open]);

  return (
    <>
      {/* Slim top contact bar - hidden on mobile via CSS to save space */}
      <div className="mmc-topbar">
        <div className="container mmc-topbar-inner">
          <div className="mmc-topbar-contact">
            <a href="tel:+919008804368">📞 +91 90088 04368</a>
            <a href="mailto:info@mapmycareer360.com" className="mmc-topbar-email">✉️ info@mapmycareer360.com</a>
          </div>
          <Link to="/career-assessment" className="mmc-topbar-cta">🎯 Free Career Assessment</Link>
        </div>
      </div>

      <header className="mmc-navbar">
        <div className="container mmc-navbar-inner">
          {/* Logo only - no text wordmark alongside it. */}
          <Link to="/" className="mmc-brand" onClick={close}>
            <img
              src="/images/logo.png"
              alt="MapMyCareer360"
              className={`mmc-brand-img ${logoLoaded ? 'is-loaded' : ''}`}
              onLoad={() => setLogoLoaded(true)}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </Link>

          <nav className={`mmc-nav-links ${open ? 'open' : ''}`}>
            <NavLink to="/" end onClick={close}>Home</NavLink>
            <NavLink to="/about" onClick={close}>About Us</NavLink>
            <NavLink to="/services" onClick={close}>Services</NavLink>
            <NavLink to="/career-assessment" onClick={close}>Career Assessment</NavLink>
            <NavLink to="/kcet-predictor" onClick={close}>KCET Predictor</NavLink>
            <NavLink to="/pgcet-predictor" onClick={close}>PGCET Predictor</NavLink>
            <NavLink to="/college-compare" onClick={close}>Compare Colleges</NavLink>
            <NavLink to="/subscription" onClick={close}>Subscription</NavLink>
            <NavLink to="/contact" onClick={close}>Contact</NavLink>

            <div className="mmc-nav-auth">
              {student ? (
                <>
                  <NavLink to="/dashboard" className="mmc-nav-dash" onClick={close}>My Dashboard</NavLink>
                  <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={close} className="mmc-nav-login">Login</NavLink>
                  <NavLink to="/register" onClick={close} className="btn btn-primary">Sign Up</NavLink>
                </>
              )}
            </div>
          </nav>

          <button
            className={`mmc-burger ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Dims the page behind the open mobile menu, and closing on tap outside */}
      {open && <div className="mmc-nav-backdrop" onClick={close} />}
    </>
  );
}