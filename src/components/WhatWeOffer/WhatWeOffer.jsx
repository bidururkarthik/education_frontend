import React from 'react';
import { Link } from 'react-router-dom';
import MotionReveal, { staggerDelay } from '../../motion/MotionReveal.jsx';
import ScrollCard from '../../motion/ScrollCard.jsx';
import AnimatedText from '../../motion/AnimatedText.jsx';
import CenterFlow from '../../motion/CenterFlow.jsx';
import OutlineIcon from '../icons/OutlineIcon.jsx';
import SectionAsideVisual from '../CareerJourney/SectionAsideVisual.jsx';
import './WhatWeOffer.css';

const OFFERS = [
  {
    to: '/career-assessment',
    icon: 'compass',
    title: 'Career assessment',
    description: 'Map aptitude, interest and personality to the right stream before you apply.',
  },
  {
    to: '/kcet-predictor',
    icon: 'cap',
    title: 'KCET predictor',
    description: 'See Safe, Moderate and Dream colleges from live cutoffs in seconds.',
  },
  {
    to: '/pgcet-predictor',
    icon: 'book',
    title: 'PGCET predictor',
    description: 'Match postgraduate courses by rank, category and preference.',
  },
  {
    to: '/college-compare',
    icon: 'scale',
    title: 'College compare',
    description: 'Weigh fees, courses and rankings side by side before you shortlist.',
  },
  {
    to: '/college-admission-enquiry',
    icon: 'handshake',
    title: 'Admission support',
    description: 'Counsellor follow-through on documents, enquiries and joining.',
  },
  {
    to: '/contact',
    icon: 'chat',
    title: 'Expert guidance',
    description: 'One-on-one mentorship to turn results into a clear college decision.',
  },
];

export default function WhatWeOffer() {
  return (
    <section className="section mmc-offer-section">
      <CenterFlow className="mmc-offer-flow" />
      <div className="container">
        <div className="mmc-offer-head-row">
          <MotionReveal className="mmc-offer-head">
            <p className="mmc-section-eyebrow mmc-heading-italic">
              <AnimatedText mark="offer">What we offer</AnimatedText>
            </p>
            <h2 className="mmc-heading-italic">
              <AnimatedText mark="admission">Tools that take you from assessment to admission</AnimatedText>
            </h2>
            <p>
              Everything MapMyCareer360 already does for students — predictors, comparison and counsellor support — in one place.
            </p>
          </MotionReveal>
          <MotionReveal variant="right" delay={90}>
            <SectionAsideVisual variant="fan" />
          </MotionReveal>
        </div>

        <div className="mmc-offer-grid mmc-scroll-stage">
          {OFFERS.map((offer, index) => (
            <ScrollCard
              key={offer.to}
              index={index}
              delay={staggerDelay(index, 90)}
              className="mmc-offer-scene"
            >
              <Link
                to={offer.to}
                className="mmc-offer-card"
                aria-label={`${offer.title}. ${offer.description}`}
              >
                <span className="mmc-offer-icon">
                  <OutlineIcon name={offer.icon} size={18} />
                </span>
                <strong className="mmc-offer-title">
                  <AnimatedText delay={staggerDelay(index, 40)}>{offer.title}</AnimatedText>
                </strong>
                <span className="mmc-offer-text">{offer.description}</span>
                <span className="mmc-offer-arrow" aria-hidden="true">
                  <OutlineIcon name="arrow" size={16} />
                </span>
              </Link>
            </ScrollCard>
          ))}
        </div>
      </div>
    </section>
  );
}
