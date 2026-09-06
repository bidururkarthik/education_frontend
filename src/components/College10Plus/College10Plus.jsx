import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getImageUrl } from '../../api/api.js';
import MotionReveal, { staggerDelay } from '../../motion/MotionReveal.jsx';
import AnimatedText from '../../motion/AnimatedText.jsx';
import OutlineIcon from '../icons/OutlineIcon.jsx';
import { MOCK_COLLEGES } from './collegeMocks.js';
import './College10Plus.css';

const COURSES = [
  { id: 'all', name: 'All', icon: 'search', patterns: null },
  { id: 'btech', name: 'B.Tech', icon: 'cap', patterns: ['b.tech', 'btech', 'b.e', 'be ', 'bachelor of technology', 'bachelor of engineering'] },
  { id: 'mca', name: 'MCA', icon: 'book', patterns: ['mca', 'master of computer'] },
  { id: 'bca', name: 'BCA', icon: 'book', patterns: ['bca', 'bachelor of computer'] },
  { id: 'it', name: 'IT', icon: 'chart', patterns: ['information technology', ' i.t', ' it'] },
  { id: 'mba', name: 'MBA', icon: 'target', patterns: ['mba', 'master of business'] },
  { id: 'bba', name: 'BBA', icon: 'target', patterns: ['bba', 'bachelor of business'] },
  { id: 'mtech', name: 'M.Tech', icon: 'cap', patterns: ['m.tech', 'mtech', 'm.e', 'master of technology', 'master of engineering'] },
  { id: 'bsc', name: 'B.Sc', icon: 'compass', patterns: ['b.sc', 'bsc', 'bachelor of science'] },
  { id: 'msc', name: 'M.Sc', icon: 'compass', patterns: ['m.sc', 'msc', 'master of science'] },
  { id: 'diploma', name: 'Diploma', icon: 'scale', patterns: ['diploma'] },
  { id: 'other', name: 'Other', icon: 'handshake', patterns: 'other' },
];

const FEE_OPTIONS = [
  { id: '', label: 'Any fees' },
  { id: 'lt1', label: 'Under ₹1L', max: 100000 },
  { id: '1to2', label: '₹1L – ₹2L', min: 100000, max: 200000 },
  { id: 'gt2', label: 'Above ₹2L', min: 200000 },
];

const RANK_OPTIONS = [
  { id: '', label: 'Any ranking' },
  { id: 'top20', label: 'Rank 1–20', max: 20 },
  { id: 'top50', label: 'Rank 1–50', max: 50 },
];

const EMPTY_FILTERS = { location: '', type: '', fees: '', ranking: '' };

function courseHaystack(college) {
  return (college.coursesOffered || [])
    .map((course) => `${course.name || ''} ${course.level || ''}`.toLowerCase())
    .join(' | ');
}

function matchesPatterns(college, patterns) {
  const hay = ` ${courseHaystack(college)} `;
  return patterns.some((pattern) => hay.includes(pattern.toLowerCase()));
}

function matchesCourseTab(college, tab, otherTabs) {
  if (!tab.patterns) return true;
  if (tab.patterns === 'other') {
    return !otherTabs.some((other) => other.patterns && other.patterns !== 'other' && matchesPatterns(college, other.patterns));
  }
  return matchesPatterns(college, tab.patterns);
}

function matchesFees(college, feesId) {
  if (!feesId) return true;
  const option = FEE_OPTIONS.find((item) => item.id === feesId);
  if (!option) return true;
  const annual = Number(college.fees?.annual);
  if (!Number.isFinite(annual) || annual <= 0) return false;
  if (option.min != null && annual < option.min) return false;
  if (option.max != null && annual >= option.max) return false;
  return true;
}

function matchesRanking(college, rankingId) {
  const option = RANK_OPTIONS.find((item) => item.id === rankingId);
  if (!option || !rankingId) return true;
  const rank = Number(college.ranking);
  if (!Number.isFinite(rank)) return false;
  return rank <= option.max;
}

function formatFees(college) {
  const annual = Number(college.fees?.annual);
  if (!Number.isFinite(annual) || annual <= 0) return null;
  return `₹${annual.toLocaleString('en-IN')}/yr`;
}

async function fetchColleges() {
  const first = await api.get('/colleges', { params: { page: 1, limit: 100 } });
  let list = first.data.colleges || [];
  const totalPages = first.data.pagination?.totalPages || 1;
  for (let page = 2; page <= totalPages; page += 1) {
    const res = await api.get('/colleges', { params: { page, limit: 100 } });
    list = list.concat(res.data.colleges || []);
  }
  return list;
}

export default function College10Plus() {
  const [colleges, setColleges] = useState(MOCK_COLLEGES);
  const [status, setStatus] = useState('ready');
  const [activeId, setActiveId] = useState('all');
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);
  const tabsRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    let alive = true;
    fetchColleges()
      .then((list) => {
        if (!alive) return;
        setColleges(list.length ? list : MOCK_COLLEGES);
        setStatus('ready');
      })
      .catch(() => {
        if (!alive) return;
        setColleges(MOCK_COLLEGES);
        setStatus('ready');
      });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setSearch(query.trim().toLowerCase()), 180);
    return () => window.clearTimeout(timer);
  }, [query]);

  const activeTab = COURSES.find((course) => course.id === activeId) || COURSES[0];
  const otherTabs = COURSES.filter((course) => course.id !== 'all' && course.id !== 'other');

  const locations = useMemo(() => (
    [...new Set(colleges.map((college) => college.location).filter(Boolean))].sort()
  ), [colleges]);

  const types = useMemo(() => (
    [...new Set(colleges.map((college) => college.type).filter(Boolean))]
  ), [colleges]);

  const results = useMemo(() => {
    const q = search;
    return colleges.filter((college) => {
      if (!matchesCourseTab(college, activeTab, otherTabs)) return false;
      if (filters.location && college.location !== filters.location) return false;
      if (filters.type && college.type !== filters.type) return false;
      if (!matchesFees(college, filters.fees)) return false;
      if (!matchesRanking(college, filters.ranking)) return false;
      if (!q) return true;
      const courses = courseHaystack(college);
      const blob = `${college.name || ''} ${college.location || ''} ${college.type || ''} ${courses}`.toLowerCase();
      return blob.includes(q);
    });
  }, [colleges, activeTab, otherTabs, filters, search]);

  useLayoutEffect(() => {
    const list = tabsRef.current;
    if (!list) return;
    const active = list.querySelector('[aria-selected="true"]');
    if (!active) return;
    setIndicator({ left: active.offsetLeft, width: active.offsetWidth });
  }, [activeId, status]);

  const onTabsKeyDown = (event) => {
    const index = COURSES.findIndex((course) => course.id === activeId);
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setActiveId(COURSES[(index + 1) % COURSES.length].id);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setActiveId(COURSES[(index - 1 + COURSES.length) % COURSES.length].id);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveId(COURSES[0].id);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveId(COURSES[COURSES.length - 1].id);
    }
  };

  const filterCount = Object.values(filters).filter(Boolean).length;
  const shown = results.slice(0, 9);

  return (
    <section className="section mmc-c10-section">
      <div className="container">
        <MotionReveal className="mmc-c10-head">
          <p className="mmc-section-eyebrow">College 10+</p>
          <h2><AnimatedText>Explore colleges by course</AnimatedText></h2>
          <p>Browse 10+ programmes, then search and filter the colleges already listed on MapMyCareer360.</p>
        </MotionReveal>

        <div className="mmc-c10-tabs-wrap">
          <div
            className="mmc-c10-tabs"
            ref={tabsRef}
            role="tablist"
            aria-label="Course categories"
            onKeyDown={onTabsKeyDown}
          >
            <span
              className="mmc-c10-indicator"
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
              aria-hidden="true"
            />
            {COURSES.map((course) => (
              <button
                key={course.id}
                type="button"
                role="tab"
                id={`mmc-c10-tab-${course.id}`}
                aria-selected={activeId === course.id}
                aria-controls="mmc-c10-panel"
                tabIndex={activeId === course.id ? 0 : -1}
                className={`mmc-c10-tab${activeId === course.id ? ' is-active' : ''}`}
                onClick={() => setActiveId(course.id)}
              >
                <OutlineIcon name={course.icon} size={14} />
                {course.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mmc-c10-tools">
          <label className={`mmc-c10-search${query ? ' has-value' : ''}`}>
            <span className="mmc-c10-search-icon">
              <OutlineIcon name="search" size={16} />
            </span>
            <span className="sr-only">Search colleges</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search college, course or location"
              autoComplete="off"
            />
            {query ? (
              <button type="button" className="mmc-c10-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <OutlineIcon name="close" size={14} />
              </button>
            ) : null}
          </label>

          <button
            type="button"
            className={`mmc-c10-filter-btn${filterOpen ? ' is-open' : ''}`}
            aria-expanded={filterOpen}
            aria-controls="mmc-c10-filters"
            onClick={() => setFilterOpen((open) => !open)}
          >
            <OutlineIcon name="filter" size={16} />
            Filter
            {filterCount ? <em>{filterCount}</em> : null}
          </button>
        </div>

        <div
          id="mmc-c10-filters"
          className={`mmc-c10-filters${filterOpen ? ' is-open' : ''}`}
          aria-hidden={!filterOpen}
          inert={filterOpen ? undefined : ''}
        >
          <div className="mmc-c10-filters-inner">
            <label>
              Location
              <select
                value={filters.location}
                onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
              >
                <option value="">Any location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </label>
            <label>
              College type
              <select
                value={filters.type}
                onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
              >
                <option value="">Any type</option>
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
            <label>
              Fees
              <select
                value={filters.fees}
                onChange={(e) => setFilters((prev) => ({ ...prev, fees: e.target.value }))}
              >
                {FEE_OPTIONS.map((option) => (
                  <option key={option.id || 'any'} value={option.id}>{option.label}</option>
                ))}
              </select>
            </label>
            <label>
              Ranking
              <select
                value={filters.ranking}
                onChange={(e) => setFilters((prev) => ({ ...prev, ranking: e.target.value }))}
              >
                {RANK_OPTIONS.map((option) => (
                  <option key={option.id || 'any'} value={option.id}>{option.label}</option>
                ))}
              </select>
            </label>
            {filterCount ? (
              <button type="button" className="mmc-c10-reset" onClick={() => setFilters(EMPTY_FILTERS)}>
                Clear filters
              </button>
            ) : null}
          </div>
        </div>

        <div
          id="mmc-c10-panel"
          role="tabpanel"
          aria-labelledby={`mmc-c10-tab-${activeId}`}
          className="mmc-c10-panel"
        >
          <p className="mmc-c10-count">
            {status === 'loading' && 'Loading colleges…'}
            {status === 'error' && 'Colleges could not be loaded just now.'}
            {status === 'ready' && (
              results.length
                ? `${results.length} ${activeTab.name === 'All' ? 'college' : activeTab.name} result${results.length === 1 ? '' : 's'}`
                : `No ${activeTab.name} colleges match this search.`
            )}
          </p>

          {status === 'ready' && shown.length > 0 ? (
            <div className="mmc-c10-grid" key={`${activeId}-${search}-${filters.location}-${filters.type}-${filters.fees}-${filters.ranking}`}>
              {shown.map((college, index) => (
                <CollegeResultCard college={college} key={college._id} delay={staggerDelay(index, 50)} />
              ))}
            </div>
          ) : null}

          {status === 'ready' && results.length > shown.length ? (
            <div className="mmc-c10-more">
              <Link to="/college-compare" className="mmc-why-cta">See all colleges</Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CollegeResultCard({ college, delay }) {
  const image = getImageUrl(college.image) || '/images/college-placeholder.jpg';
  const fees = formatFees(college);
  const courses = (college.coursesOffered || []).map((course) => course.name).filter(Boolean).slice(0, 3);

  return (
    <MotionReveal className="mmc-c10-card" delay={delay}>
      <div className="mmc-c10-photo">
        <img src={image} alt={college.name} />
      </div>
      <div className="mmc-c10-body">
        <strong><AnimatedText delay={delay}>{college.name}</AnimatedText></strong>
        <small>
          <OutlineIcon name="pin" size={13} />
          {college.location || 'Karnataka'}
        </small>
        {courses.length ? <span className="mmc-c10-courses">{courses.join(' · ')}</span> : null}
        <div className="mmc-c10-meta">
          {college.type ? <em>{college.type}</em> : null}
          {college.ranking ? <em>Rank #{college.ranking}</em> : null}
          {fees ? <em>{fees}</em> : null}
        </div>
        <Link to="/college-compare" className="mmc-c10-cta">
          View details <OutlineIcon name="arrow" size={14} />
        </Link>
      </div>
    </MotionReveal>
  );
}
