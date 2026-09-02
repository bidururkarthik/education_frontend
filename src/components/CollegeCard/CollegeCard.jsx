import React from 'react';
import './CollegeCard.css';

export default function CollegeCard({ college, selected, onToggle, showSelect }) {
  return (
    <div className={`card mmc-college-card ${selected ? 'selected' : ''}`}>
      <div className="mmc-college-image">
        <img src={college.image || '/images/college-placeholder.jpg'} alt={college.name} />
      </div>
      <div className="mmc-college-body">
        <h4>{college.name}</h4>
        <p className="mmc-college-loc">📍 {college.location || 'Karnataka'}</p>
        <span className="badge badge-moderate">{college.type || 'Private'}</span>
        {college.ranking && <p className="mmc-college-rank">Rank #{college.ranking}</p>}
        {showSelect && (
          <button className={`btn ${selected ? 'btn-secondary' : 'btn-outline'}`} onClick={() => onToggle(college)}>
            {selected ? 'Selected' : 'Add to Compare'}
          </button>
        )}
      </div>
    </div>
  );
}
