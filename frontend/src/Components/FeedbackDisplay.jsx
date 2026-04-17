import React from 'react';

export default function FeedbackDisplay({
  exercise,
  reps,
  currentScore,
  lastRepScore,
  feedback,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-[#c47ea8]/25 bg-white/70 p-4 backdrop-blur-md">
        <p className="text-xs uppercase tracking-wider text-[#7a6b89]">Current Exercise</p>
        <p className="mt-1 text-xl font-semibold text-[#2d1f3d]">{exercise}</p>
      </div>

      <div className="rounded-2xl border border-[#c47ea8]/25 bg-white/70 p-4 backdrop-blur-md">
        <p className="text-xs uppercase tracking-wider text-[#7a6b89]">Repetition Count</p>
        <p className="mt-1 text-xl font-semibold text-[#2d1f3d]">{reps}</p>
      </div>

      <div className="rounded-2xl border border-[#c47ea8]/25 bg-white/70 p-4 backdrop-blur-md">
        <p className="text-xs uppercase tracking-wider text-[#7a6b89]">Live Accuracy</p>
        <p className="mt-1 text-xl font-semibold text-[#2d1f3d]">{currentScore}%</p>
      </div>

      <div className="rounded-2xl border border-[#c47ea8]/25 bg-white/70 p-4 backdrop-blur-md">
        <p className="text-xs uppercase tracking-wider text-[#7a6b89]">Last Rep Score</p>
        <p className="mt-1 text-xl font-semibold text-[#2d1f3d]">{lastRepScore}%</p>
      </div>

      <div className="md:col-span-2 rounded-2xl border border-[#c47ea8]/30 bg-[#2d1f3d] p-4 text-[#fce8f0] shadow-lg">
        <p className="text-xs uppercase tracking-wider text-[#f5d6e4]/80">Real-time Feedback</p>
        <p className="mt-1 text-base font-medium">{feedback}</p>
      </div>
    </div>
  );
}
