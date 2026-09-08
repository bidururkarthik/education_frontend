import React, { useEffect, useState } from 'react';
import api from '../../api/api.js';
import CollegeCard from '../../components/CollegeCard/CollegeCard.jsx';
import CollegeInterestModal from '../../components/CollegeInterestModal/CollegeInterestModal.jsx';
import './CollegeCompare.css';

export default function CollegeCompare() {
  const [colleges, setColleges] = useState([]);
  const [selected, setSelected] = useState([]);
  const [compareData, setCompareData] = useState(null);
  const [search, setSearch] = useState('');
  const [showInterestModal, setShowInterestModal] = useState(false);

  useEffect(() => {
    api.get('/colleges').then((res) => setColleges(res.data.colleges || [])).catch(() => {});
  }, []);

  const toggleSelect = (college) => {
    const exists = selected.find((c) => c._id === college._id);
    if (exists) setSelected(selected.filter((c) => c._id !== college._id));
    else if (selected.length < 4) setSelected([...selected, college]);
  };

  // Comparing is gated behind a short lead-capture form - the actual table
  // only renders after the form is submitted (or already submitted this
  // session), matching "submit one basic form before they can compare".
  const startCompare = () => {
    if (sessionStorage.getItem('mmc_interest_submitted')) {
      runCompare();
    } else {
      setShowInterestModal(true);
    }
  };

  const runCompare = async () => {
    try {
      const res = await api.post('/colleges/compare', { collegeIds: selected.map((c) => c._id) });
      setCompareData(res.data.colleges);
    } catch {
      setCompareData(selected.map((c) => ({ ...c, highlights: ['✅ Solid All-Round Choice'] })));
    }
  };

  const onInterestSubmitted = () => {
    sessionStorage.setItem('mmc_interest_submitted', '1');
    setShowInterestModal(false);
    runCompare();
  };

  const filtered = colleges.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mmc-compare-page">

      {/* HERO */}
      <header className="mmc-cmp-hero">
        <svg className="mmc-cmp-hero-contours" viewBox="0 0 1140 380" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50,90 C 200,40 400,140 650,85 C 850,40 1000,110 1200,70" stroke="#0174cc" strokeWidth="1" fill="none" />
          <path d="M-50,170 C 220,120 420,220 660,160 C 860,115 1010,190 1200,150" stroke="#0174cc" strokeWidth="1" fill="none" />
          <path d="M-50,250 C 240,200 440,300 680,240 C 880,195 1020,270 1200,230" stroke="#0174cc" strokeWidth="1" fill="none" />
          <path d="M-50,330 C 260,280 460,380 700,320 C 900,275 1030,350 1200,310" stroke="#0174cc" strokeWidth="1" fill="none" />
        </svg>
        <div className="container mmc-cmp-hero-inner">
          <div className="mmc-eyebrow mono">Side by side · up to 4 colleges</div>
          <h1>Compare Colleges</h1>
          <p>Select up to 4 colleges to lay their fees, courses, facilities and rankings out on one route.</p>
        </div>
      </header>

      {/* SECTION */}
      <section className="mmc-cmp-section">
        <div className="container">

          <div className="mmc-compare-toolbar">
            <input
              className="mmc-compare-search"
              placeholder="Search colleges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn-primary" onClick={startCompare} disabled={selected.length < 2}>
              Compare Selected ({selected.length})
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="mmc-compare-empty">No colleges found yet. Colleges added by the admin will appear here.</div>
          ) : (
            <div className="mmc-college-grid">
              {filtered.map((c) => (
                <CollegeCard
                  key={c._id}
                  college={c}
                  showSelect
                  selected={!!selected.find((s) => s._id === c._id)}
                  onToggle={toggleSelect}
                />
              ))}
            </div>
          )}

          {compareData && compareData.length > 0 && (
            <div className="mmc-compare-result">
              <span className="mono">Comparison</span>
              <h3>How these stack up</h3>
              <p className="mmc-compare-note">Every college below has real strengths worth knowing - here's what stands out about each.</p>

              {/* Positive-only highlight badges per college - no college is framed
                  as "worse" than another, only what it's good for. */}
              <div className="mmc-compare-highlights">
                {compareData.map((c) => (
                  <div key={c._id} className="mmc-compare-highlight-card">
                    <strong>{c.name}</strong>
                    <div className="mmc-compare-highlight-tags">
                      {(c.highlights || ['✅ Solid All-Round Choice']).map((h) => (
                        <span key={h} className="mmc-compare-tag">{h}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mmc-compare-table-wrap">
                <table className="mmc-compare-table">
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      {compareData.map((c) => <th key={c._id}>{c.name}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Location</td>{compareData.map((c) => <td key={c._id}>{c.location || '-'}</td>)}</tr>
                    <tr><td>Type</td>{compareData.map((c) => <td key={c._id}>{c.type || '-'}</td>)}</tr>
                    <tr><td>Ranking</td>{compareData.map((c) => <td key={c._id}>{c.ranking || '-'}</td>)}</tr>
                    <tr><td>Annual Fees</td>{compareData.map((c) => <td key={c._id}>{c.fees?.annual ? `₹${c.fees.annual}` : '-'}</td>)}</tr>
                    <tr><td>Courses Offered</td>{compareData.map((c) => <td key={c._id}>{c.coursesOffered?.map((co) => co.name).join(', ') || '-'}</td>)}</tr>
                    <tr><td>Facilities</td>{compareData.map((c) => <td key={c._id}>{(c.facilities || []).join(', ') || '-'}</td>)}</tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {showInterestModal && (
        <CollegeInterestModal
          collegeIds={selected.map((c) => c._id)}
          context="compare"
          onSuccess={onInterestSubmitted}
          onClose={() => setShowInterestModal(false)}
        />
      )}
    </div>
  );
}
