import React, { useEffect, useRef, useState } from 'react';
import MotionReveal, { staggerDelay } from '../../motion/MotionReveal.jsx';
import ScrollCard from '../../motion/ScrollCard.jsx';
import AnimatedText from '../../motion/AnimatedText.jsx';
import CenterFlow from '../../motion/CenterFlow.jsx';
import OutlineIcon from '../icons/OutlineIcon.jsx';
import SectionAsideVisual from '../CareerJourney/SectionAsideVisual.jsx';
import './StudentReviews.css';

const PREVIEW_CHARS = 160;

const REVIEWS = [
  {
    id: 'ananya',
    name: 'Ananya R.',
    course: 'Engineering · Bangalore',
    source: 'KCET',
    featured: true,
    review: 'The predictor showed exactly which colleges were realistic — Safe, Moderate, Dream.',
  },
  {
    id: 'rahul',
    name: 'Rahul K.',
    course: 'PGCET aspirant',
    source: 'PGCET',
    review: 'Together they saved weeks of guesswork on PGCET shortlists.',
  },
  {
    id: 'sneha',
    name: 'Sneha M.',
    course: 'Career assessment',
    source: 'Assessment',
    review: 'The career test matched what Sneha actually enjoyed in college.',
  },
];

function visibleCount() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 980) return 2;
  return 3;
}

function Stars() {
  return (
    <span className="mmc-rev-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="14" height="14">
          <path d="M12 3.6 14.6 9l5.9.7-4.4 4 1.2 5.8L12 16.8 6.7 19.5l1.2-5.8-4.4-4L9.4 9z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review, delay, index = 0 }) {
  const [open, setOpen] = useState(false);
  const long = review.review.length > PREVIEW_CHARS;
  const text = !long || open ? review.review : `${review.review.slice(0, PREVIEW_CHARS).trim()}…`;

  return (
    <ScrollCard index={index} delay={delay} className={`mmc-rev-scene${review.featured ? ' is-featured' : ''}`}>
      <article className="mmc-rev-card">
        <header className="mmc-rev-who">
          <span className="mmc-rev-avatar" aria-hidden="true">{review.name.slice(0, 1)}</span>
          <div>
            <strong><AnimatedText delay={delay}>{review.name}</AnimatedText></strong>
            <small>{review.course}</small>
          </div>
          {review.source ? <em>{review.source}</em> : null}
        </header>
        <Stars />
        <p>{text}</p>
        {long ? (
          <button type="button" className="mmc-rev-more" onClick={() => setOpen((v) => !v)}>
            {open ? 'Read less' : 'Read more'}
          </button>
        ) : null}
      </article>
    </ScrollCard>
  );
}

export default function StudentReviews() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const startX = useRef(null);
  const maxIndex = Math.max(0, REVIEWS.length - visible);

  useEffect(() => {
    const update = () => setVisible(visibleCount());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  const onPointerDown = (event) => {
    startX.current = event.clientX;
  };

  const onPointerUp = (event) => {
    if (startX.current == null) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (delta > 48) prev();
    if (delta < -48) next();
  };

  return (
    <section className="section mmc-rev-section">
      <CenterFlow className="mmc-rev-flow" />
      <div className="container">
        <div className="mmc-rev-top">
          <MotionReveal className="mmc-rev-head">
            <p className="mmc-section-eyebrow">What students say</p>
            <h2><AnimatedText>Real experiences from students mapping their next step</AnimatedText></h2>
            <p>Students who used assessment, predictors and counsellor support to choose with more clarity.</p>
            <p className="mmc-rev-trust">Loved by students</p>
          </MotionReveal>

          <div className="mmc-rev-aside">
            <MotionReveal variant="right" delay={90}>
            <img src="/images/review.jpg" alt="" loading="lazy" />
            </MotionReveal>
            {maxIndex > 0 ? (
              <div className="mmc-rev-toolbar">
                <button type="button" className="mmc-rev-nav" onClick={prev} aria-label="Previous reviews">
                  <OutlineIcon name="arrow" size={16} />
                </button>
                <button type="button" className="mmc-rev-nav" onClick={next} aria-label="Next reviews">
                  <OutlineIcon name="arrow" size={16} />
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div
          className="mmc-rev-viewport"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { startX.current = null; }}
        >
          <div
            className="mmc-rev-track mmc-scroll-stage"
            style={{ '--mmc-rev-index': index, '--mmc-rev-visible': visible }}
          >
            {REVIEWS.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} delay={staggerDelay(i, 90)} />
            ))}
          </div>
        </div>

        {maxIndex > 0 ? (
          <div className="mmc-rev-dots" role="tablist" aria-label="Review slides">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={index === i}
                aria-label={`Show reviews starting at ${i + 1}`}
                className={`mmc-rev-dot${index === i ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
