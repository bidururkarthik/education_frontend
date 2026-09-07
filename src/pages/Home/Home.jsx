import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroHome from '../../components/HeroHome/HeroHome.jsx';
import TransformationBanner from '../../components/TransformationBanner/TransformationBanner.jsx';
import WhatWeOffer from '../../components/WhatWeOffer/WhatWeOffer.jsx';
import College10Plus from '../../components/College10Plus/College10Plus.jsx';
import StatsCounter from '../../components/StatsCounter/StatsCounter.jsx';
import StatsBanner from '../../components/StatsBanner/StatsBanner.jsx';
import ProcessSteps from '../../components/ProcessSteps/ProcessSteps.jsx';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs.jsx';
import StudentReviews from '../../components/StudentReviews/StudentReviews.jsx';
import MotionReveal from '../../motion/MotionReveal.jsx';
import AnimatedText from '../../motion/AnimatedText.jsx';
import OutlineIcon from '../../components/icons/OutlineIcon.jsx';
import useMotionPointer from '../../motion/useMotionPointer.js';
import Contact from '../Contact/Contact.jsx';
import './Home.css';


export default function Home() {
  const rootRef = useRef(null);
  useMotionPointer(rootRef);

  return (
    <div className="mmc-home" ref={rootRef}>
      <HeroHome />
      <StatsCounter />
      <TransformationBanner />
      <WhatWeOffer />
      <College10Plus />
      <StatsBanner />
      <StudentReviews />
      <Contact />

      <section className="mmc-cta-band">
        <div className="container mmc-cta-band-inner">
          <MotionReveal strong>
            <h2><AnimatedText>Ready to map your career?</AnimatedText></h2>
            <p>Start with a free assessment. Launch plans are ₹1.</p>
          </MotionReveal>
          <MotionReveal delay={90}>
            <Link to="/register" className="btn btn-ink">Get started free <OutlineIcon name="arrow" size={16} /></Link>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
}
