import React from 'react';
import OutlineIcon from '../../components/icons/OutlineIcon.jsx';
import MotionReveal from '../../motion/MotionReveal.jsx';
import AnimatedText from '../../motion/AnimatedText.jsx';

export default function Mission() {
  return (
    <section className="mmc-about-mv mmc-about-mv--mission" aria-labelledby="mmc-mission-heading">
      <div className="container mmc-about-mv-grid">
        <MotionReveal variant="left" className="mmc-about-mv-visual">
          <div className="mmc-about-mv-orb mmc-about-mv-orb--orange" aria-hidden="true" />
          <div className="mmc-about-mv-icon mmc-float">
            <OutlineIcon name="target" size={36} />
          </div>
        </MotionReveal>
        <MotionReveal className="mmc-about-mv-copy">
          <p className="mmc-section-eyebrow">Our Mission</p>
          <h2 id="mmc-mission-heading">
            <AnimatedText>Informed decisions, every step.</AnimatedText>
          </h2>
          <p>
            Students need direction, not guesswork. We stay with them from stream choice after 10th through college admission and placement prep.
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
