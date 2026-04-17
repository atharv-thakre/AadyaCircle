export function calculateAngle(a, b, c) {
  if (!a || !b || !c) return null;

  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };

  const dot = ab.x * cb.x + ab.y * cb.y;
  const magAB = Math.hypot(ab.x, ab.y);
  const magCB = Math.hypot(cb.x, cb.y);

  if (!magAB || !magCB) return null;

  const cosine = Math.min(1, Math.max(-1, dot / (magAB * magCB)));
  const angle = Math.acos(cosine) * (180 / Math.PI);
  return Number.isFinite(angle) ? angle : null;
}
