import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import PredictorResultTable from '../../components/PredictorResultTable/PredictorResultTable.jsx';
import PredictorPaywall from '../../components/PredictorPaywall/PredictorPaywall.jsx';
import './KcetPredictor.css';

const CATEGORIES = ['GM', '1G', '2A', '2B', '3A', '3B', 'SC', 'ST'];

export default function KcetPredictor() {
  const { student } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    rank: '', category: 'GM', gender: 'Any', is371J: false, year: '',
    name: student?.fullName || '', phone: student?.phone || '', email: student?.email || '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paywall, setPaywall] = useState(null); // { oneTimeFee, message }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const runPredict = async (extra = {}) => {
    const res = await api.post('/predictors/kcet', { ...form, ...extra });
    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student) {
      navigate('/login', { state: { from: '/kcet-predictor' } });
      return;
    }

    setLoading(true); setError(''); setResult(null); setPaywall(null);
    try {
      const data = await runPredict();
      setResult(data);
    } catch (err) {
      if (err.response?.status === 402) {
        setPaywall(err.response.data); // { subscriptionRequired, oneTimeFee, message }
      } else {
        setError(err.response?.data?.message || 'Prediction failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mmc-predictor-page">
      <header className="mmc-pred-hero">
        <svg className="mmc-pred-hero-contours" viewBox="0 0 1140 380" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50,80 C 200,30 400,130 650,75 C 850,30 1000,100 1200,60" stroke="#0174cc" strokeWidth="1" fill="none" />
          <path d="M-50,150 C 220,100 420,200 660,140 C 860,95 1010,170 1200,130" stroke="#0174cc" strokeWidth="1" fill="none" />
          <path d="M-50,220 C 240,170 440,270 680,210 C 880,165 1020,240 1200,200" stroke="#0174cc" strokeWidth="1" fill="none" />
        </svg>
        <div className="container mmc-pred-hero-inner">
          <span className="mono mmc-eyebrow">KCET · Engineering Admissions</span>
          <h1>Chart your route<br />into engineering.</h1>
          <p>Enter your rank &amp; category to see your Safe, Moderate and Dream engineering colleges.</p>
        </div>
      </header>

      <section className="mmc-pred-section">
        <div className="container mmc-predictor-layout">
          <form className="mmc-pred-form" onSubmit={handleSubmit}>
            <h3>Enter Your Details</h3>

            <div className="mmc-form-section">
              <span className="mono mmc-form-section-label">01 — Identity</span>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required minLength={2} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required minLength={8} />
              </div>
              <div className="form-group">
                <label>Email (optional)</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} />
              </div>
            </div>

            <div className="mmc-form-section">
              <span className="mono mmc-form-section-label">02 — Rank &amp; Eligibility</span>
              <div className="form-group">
                <label>KCET Rank</label>
                <input type="number" name="rank" value={form.rank} onChange={handleChange} required min="1" />
              </div>
              <div className="mmc-form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange}>
                    <option>Any</option><option>Male</option><option>Female</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Year (optional)</label>
                <input type="number" name="year" value={form.year} onChange={handleChange} placeholder="e.g. 2025" />
              </div>
              <div className="form-group mmc-checkbox-group">
                <label>
                  <input type="checkbox" name="is371J" checked={form.is371J} onChange={handleChange} />
                  {' '}371J / Hyderabad-Karnataka Reservation
                </label>
              </div>
            </div>

            {error && <p className="mmc-pred-error">{error}</p>}
            <button className="btn-primary" disabled={loading}>{loading ? 'Predicting...' : 'Predict Colleges →'}</button>
            {!student && <p className="mmc-pred-hint">You'll need to login first - your details above are saved, nothing is lost.</p>}
          </form>

          <div className="mmc-predictor-output">
            <div className="mmc-output-label">
              <span className="mono">Predicted routes</span>
              <span className="mmc-output-legend">
                <em className="dot safe" />Safe <em className="dot moderate" />Moderate <em className="dot dream" />Dream
              </span>
            </div>
            {paywall ? (
              <PredictorPaywall
                predictorName="KCET"
                oneTimeFee={paywall?.oneTimeFee}
                formData={form}
                predictorEndpoint="/predictors/kcet"
                onSubscribe={() => navigate('/subscription', { state: { from: '/kcet-predictor' } })}
                onUnlocked={(data) => { setResult(data); setPaywall(null); }}
              />
            ) : result ? (
              <PredictorResultTable result={result} />
            ) : (
              <div className="mmc-empty-state">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M12 3 L13.6 10.4 L21 12 L13.6 13.6 L12 21 L10.4 13.6 L3 12 L10.4 10.4 Z" fill="currentColor" opacity="0.9" />
                </svg>
                Fill the form and click "Predict Colleges" to see your Safe, Moderate and Dream colleges.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}