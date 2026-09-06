import React from 'react';
import MotionReveal from '../../motion/MotionReveal.jsx';

export default function BlogHeader() {
  return (
    <MotionReveal as="header" className="mmc-blog-hero" strong>
      <h1>Guidance notes for <span>students and parents</span></h1>
      <p>Short reads on assessments, predictors, and admissions from the MapMyCareer360 team.</p>
    </MotionReveal>
  );
}
