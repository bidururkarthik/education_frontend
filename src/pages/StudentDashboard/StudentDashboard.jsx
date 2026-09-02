import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './StudentDashboard.css';

const TABS = ['Overview', 'Profile', 'Assessments', 'Payments', 'Referrals'];

export default function StudentDashboard() {
  const { student } = useAuth();
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('Overview');
  const [referral, setReferral] = useState(null);
  const [profileForm, setProfileForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    api.get('/students/dashboard').then((res) => {
      setData(res.data);
      setProfileForm({
        fullName: res.data.profile.fullName, phone: res.data.profile.phone,
        gender: res.data.profile.gender || '', address: res.data.profile.address || '',
      });
    }).catch(() => {});
    api.get('/referrals/my').then((res) => setReferral(res.data)).catch(() => {});
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true); setSavedMsg('');
    try {
      await api.put('/students/me', profileForm);
      setSavedMsg('Profile updated successfully.');
    } catch {
      setSavedMsg('Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <div className="loading-state">Loading your dashboard...</div>;

  const referralLink = referral ? `${window.location.origin}/register?ref=${referral.referralCode}` : '';

  return (
    <div className="mmc-dashboard-page">
      <div className="page-hero">
        <div className="container">
          <h1>Welcome, {student?.fullName || 'Student'} 👋</h1>
          <p>Manage your profile, subscription, assessments and referrals from one place.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="mmc-dash-tabs">
            {TABS.map((t) => (
              <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>

          {tab === 'Overview' && (
            <div className="mmc-dash-grid">
              <div className="card mmc-dash-stat">
                <span>Active Subscription</span>
                <strong>{data.activeSubscription ? data.activeSubscription.plan.name : 'None'}</strong>
                {!data.activeSubscription && <Link to="/subscription" className="mmc-dash-cta">Subscribe now →</Link>}
              </div>
              <div className="card mmc-dash-stat">
                <span>Assessments Taken</span>
                <strong>{data.assessmentHistory.length}</strong>
                <Link to="/career-assessment" className="mmc-dash-cta">Take new assessment →</Link>
              </div>
              <div className="card mmc-dash-stat">
                <span>Total Payments</span>
                <strong>{data.paymentHistory.length}</strong>
              </div>
              <div className="card mmc-dash-stat">
                <span>Your Referral Code</span>
                <strong>{referral?.referralCode || '-'}</strong>
              </div>
            </div>
          )}

          {tab === 'Profile' && (
            <form className="card mmc-dash-form" onSubmit={saveProfile}>
              <h3>Edit Profile</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input value={profileForm.fullName || ''} onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={profileForm.phone || ''} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select value={profileForm.gender || ''} onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}>
                  <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea rows="3" value={profileForm.address || ''} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })} />
              </div>
              {savedMsg && <p className="mmc-success-msg">{savedMsg}</p>}
              <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            </form>
          )}

          {tab === 'Assessments' && (
            <div className="card mmc-dash-table">
              <h3>Assessment History</h3>
              {data.assessmentHistory.length === 0 ? (
                <div className="empty-state">No assessments taken yet. <Link to="/career-assessment">Take one now</Link>.</div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>Date</th><th>Recommended Streams</th></tr></thead>
                    <tbody>
                      {data.assessmentHistory.map((a) => (
                        <tr key={a._id}>
                          <td>{new Date(a.attemptedAt).toLocaleDateString()}</td>
                          <td>{a.recommendedStreams?.join(', ') || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {tab === 'Payments' && (
            <div className="card mmc-dash-table">
              <h3>Payment History</h3>
              {data.paymentHistory.length === 0 ? (
                <div className="empty-state">No payments yet.</div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>Invoice</th><th>Purpose</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                    <tbody>
                      {data.paymentHistory.map((p) => (
                        <tr key={p._id}>
                          <td>{p.invoiceNumber || '-'}</td>
                          <td style={{ textTransform: 'capitalize' }}>{p.purpose}</td>
                          <td>₹{p.amount}</td>
                          <td><span className={`badge ${p.status === 'success' ? 'badge-safe' : 'badge-moderate'}`}>{p.status}</span></td>
                          <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {tab === 'Referrals' && (
            <div className="card mmc-dash-table">
              <h3>Your Referrals</h3>
              <p>Share your referral link for Career Assessment / Subscription sign-ups:</p>
              <div className="mmc-referral-link">
                <input readOnly value={referralLink} />
                <button className="btn btn-secondary" onClick={() => navigator.clipboard.writeText(referralLink)}>Copy</button>
              </div>
              {referral?.referrals?.length === 0 || !referral ? (
                <div className="empty-state">No referrals yet - start sharing your link!</div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>Name</th><th>Type</th><th>Status</th></tr></thead>
                    <tbody>
                      {referral.referrals.map((r) => (
                        <tr key={r._id}>
                          <td>{r.referredName || r.referredEmail || '-'}</td>
                          <td style={{ textTransform: 'capitalize' }}>{r.type}</td>
                          <td><span className={`badge ${r.status === 'converted' ? 'badge-safe' : 'badge-moderate'}`}>{r.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
