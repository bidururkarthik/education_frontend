import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getImageUrl } from '../../api/api.js';
import './SliderHome.css';

// Each fallback slide now ships a desktop image (1920x900) and a mobile
// image (768x900) as WebP, generated from the original PNGs.
// Desktop ~170-185KB, mobile ~75-85KB (down from ~2-2.3MB PNGs).
const FALLBACK_SLIDES = [
  // {
  //   _id: 'fallback-1',
  //   title: 'Map Your Career With Confidence',
  //   subtitle: 'Take our scientific Career Assessment and discover the path that truly fits you.',
  //   imageDesktop: '/images/hero-1-desktop.webp',
  //   imageMobile: '/images/hero-1-mobile.webp',
  //   ctaLink: '/career-assessment',
  // },
  {
    _id: 'fallback-2',
    title: 'KCET & PGCET College Predictors',
    subtitle: 'Know your Safe, Moderate and Dream colleges instantly based on your rank.',
    imageDesktop: '/images/hero-2-desktop.webp',
    imageMobile: '/images/hero-2-mobile.webp',
    ctaLink: '/subscription',
  },
];

export default function SliderHome() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/sliders').then((res) => {
      if (res.data.sliders && res.data.sliders.length) setSlides(res.data.sliders);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[active] || slides[0];
  if (!slide) return null;

  // Slides coming from the admin API (ManageSlider) only store a single
  // `image` field (an uploaded /uploads/... path), so we fall back to that
  // for both breakpoints. Slides shipped in FALLBACK_SLIDES above carry
  // separate desktop/mobile static files already inside public/images.
  // getImageUrl() resolves /uploads/... paths to the backend's own origin;
  // /images/... paths (static, frontend-hosted) pass through unchanged.
  const desktopSrc = getImageUrl(slide.imageDesktop || slide.image);
  const mobileSrc = getImageUrl(slide.imageMobile || slide.image);

  // Only the very first paint (slide 0, before the timer has rotated)
  // should be eager + high priority. Every other slide can load lazily
  // since it's fetched only once the rotation reaches it.
  const isFirstPaint = active === 0;

  const isImageOnly = !!slide.imageOnly;

 const goToSlideLink = () => {
    if (isImageOnly || !slide.ctaLink) return;
    navigate(slide.ctaLink);
  };

 return (
    <section
      className={`mmc-slider${isImageOnly ? ' mmc-slider--image-only' : ''}`}
      onClick={goToSlideLink}
      role={isImageOnly ? undefined : 'link'}
      tabIndex={isImageOnly ? -1 : 0}
      onKeyDown={(e) => { if (!isImageOnly && (e.key === 'Enter' || e.key === ' ')) goToSlideLink(); }}
      aria-label={slide.title || 'MapMyCareer360'}
      style={{ cursor: isImageOnly ? 'default' : 'pointer' }}
    >
      <div className="mmc-slider-bg">
        <picture>
          <source media="(max-width: 768px)" srcSet={mobileSrc} />
          <img
            src={desktopSrc}
            alt={slide.title || 'MapMyCareer360'}
            className="mmc-slider-img"
            fetchPriority={isFirstPaint ? 'high' : 'auto'}
            loading={isFirstPaint ? 'eager' : 'lazy'}
            decoding={isFirstPaint ? 'sync' : 'async'}
          />
        </picture>
      </div>

      {!isImageOnly && (
        <>
          <div className="mmc-slider-overlay" />
          <div className="container mmc-slider-content">
            <span className="mmc-slider-tag">MapMyCareer360</span>
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
          </div>
        </>
      )}

      <div className="mmc-slider-dots" onClick={(e) => e.stopPropagation()}>
        {slides.map((s, i) => (
          <button
            key={s._id || i}
            className={i === active ? 'active' : ''}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  
  );
}