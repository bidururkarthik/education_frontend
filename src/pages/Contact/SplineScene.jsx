import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary.jsx';
import OutlineIcon from '../../components/icons/OutlineIcon.jsx';

/**
 * Paste your exported Spline scene URL here, or set REACT_APP_SPLINE_CONTACT_SCENE.
 * Export from Spline: Share / Export → Code / URL ending in scene.splinecode
 */
export const CONTACT_SPLINE_SCENE =
  process.env.REACT_APP_SPLINE_CONTACT_SCENE ||
  'https://prod.spline.design/LN262OKclnLGMDay/scene.splinecode';

// How long to wait for onLoad before treating the scene as failed.
const LOAD_TIMEOUT_MS = 9000;

const Spline = lazy(() => import('@splinetool/react-spline'));

function SplineFallback() {
  return (
    <div className="mmc-spline-fallback">
      <ErrorBoundary fallback={null}>
        <OutlineIcon name="pin" size={22} />
      </ErrorBoundary>
      <p>3D preview unavailable right now — you can still reach us below.</p>
    </div>
  );
}

export default function SplineScene() {
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const settled = useRef(false);

  // Silent-hang guard: if the scene never calls onLoad and never throws
  // (e.g. a stalled or CORS-blocked fetch), stop showing "Loading…" forever.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!settled.current) {
        settled.current = true;
        setStatus('error');
      }
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleLoad = () => {
    if (settled.current) return; // timeout already fired
    settled.current = true;
    setStatus('ready');
  };

  const handleBoundaryError = () => {
    if (settled.current) return;
    settled.current = true;
    setStatus('error');
  };

  if (status === 'error') {
    return <SplineFallback />;
  }

  return (
    <div className={`mmc-spline-stage${status === 'ready' ? ' is-ready' : ''}`}>
      {status === 'loading' ? (
        <p className="mmc-spline-wait" role="status">Loading 3D scene…</p>
      ) : null}
      <ErrorBoundary fallback={<SplineFallback />} onError={handleBoundaryError}>
        <Suspense fallback={null}>
          <Spline scene={CONTACT_SPLINE_SCENE} onLoad={handleLoad} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}