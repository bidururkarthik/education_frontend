import React, { useEffect, useRef, useState } from 'react';
import './StatsCounter.css';

const STATS = [
  { label: 'Students Guided', value: 1000, suffix: '+' },
  { label: 'Partner Colleges', value: 150, suffix: '+' },
  { label: 'Live College Predictors', value: 2, suffix: '', highlight: true },
  { label: 'Counsellor Support', value: 24, suffix: '/7' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.round(target * progress));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsCounter() {
  return (
    <section className="mmc-stats">
      <div className="container mmc-stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className={`mmc-stat-item ${s.highlight ? 'highlight' : ''}`}>
            <div className="mmc-stat-number"><Counter target={s.value} suffix={s.suffix} /></div>
            <div className="mmc-stat-label">{s.label}</div>
            {s.highlight && <span className="mmc-stat-tag">Try it free →</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
