import React from 'react';

export default function WebcamFeed({ videoRef, canvasRef, modelReady }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#c47ea8]/25 bg-black shadow-2xl">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-[420px] w-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ transform: 'scaleX(-1)' }}
      />

      <div className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-[#f5d6e4]">
        {modelReady ? 'Pose model ready' : 'Loading pose model...'}
      </div>
    </div>
  );
}
