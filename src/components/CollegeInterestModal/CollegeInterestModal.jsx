import React, { useState } from 'react';
import api from '../../api/api.js';
import './CollegeInterestModal.css';

export default function CollegeInterestModal({ collegeIds, context, onSuccess, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await api.post('/college-interest', { ...form, collegeIds, context });
      onSuccess();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mmc-interest-modal-backdrop" onClick={onClose}>
      <div className="mmc-interest-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Just one quick step 👋</h3>
        <p className="mmc-interest-sub">
          Share your details so our counsellors can send you more info on these colleges - your comparison unlocks right after.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Full Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div className="form-group"><label>Phone</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div>
          <div className="form-group"><label>Email (optional)</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          {error && <p className="error-state">{error}</p>}
          <div className="mmc-interest-modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Please wait...' : 'Show My Comparison'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
