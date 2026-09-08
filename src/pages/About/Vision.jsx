import React from 'react';
import OutlineIcon from '../../components/icons/OutlineIcon.jsx';
import MotionReveal from '../../motion/MotionReveal.jsx';
import AnimatedText from '../../motion/AnimatedText.jsx';

export default function Vision() {
  return (
    <section className="mmc-about-mv mmc-about-mv--vision" aria-labelledby="mmc-vision-heading">
      <div className="container mmc-about-mv-grid mmc-about-mv-grid--flip">
        <MotionReveal className="mmc-about-mv-copy">
          <p className="mmc-section-eyebrow">Our Vision</p>
          <h2 id="mmc-vision-heading">
            <AnimatedText>Bridge potential and opportunity.</AnimatedText>
          </h2>
          <p>
            MapMyCareer360 charts a clear path — assessment, KCET &amp; PGCET predictors, and admission support.
          </p>
        </MotionReveal>
        <MotionReveal variant="right" className="mmc-about-mv-visual">
        <img
              src="/images/mission.jpg"
              alt=""
              loading="lazy"
              className='mmc-about-mv-visual-img'
            />
        </MotionReveal>
      </div>
    </section>
  );
}
