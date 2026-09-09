import React from 'react';

export const CONTACT_SPLINE_SCENE =
  'https://my.spline.design/r4xbot-pBUh3jXoltFqa2wY4bvK3kFC/';

export default function SplineScene() {
  return (
    <div className="mmc-spline-stage">
      <iframe
        src={CONTACT_SPLINE_SCENE}
        title="3D Contact Scene"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
        }}
        allow="fullscreen"
      />
    </div>
  );
}