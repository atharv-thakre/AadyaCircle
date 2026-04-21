/**
 * Calculate angle between three keypoints (e.g., shoulder-elbow-wrist)
 * @param {Object} point1 - First point {x, y}
 * @param {Object} point2 - Center point (vertex) {x, y}
 * @param {Object} point3 - Third point {x, y}
 * @returns {number} Angle in degrees (0-180)
 */
export function calculateAngle(point1, point2, point3) {
  if (!point1 || !point2 || !point3) return 0;

  // Calculate vectors
  const vector1 = {
    x: point1.x - point2.x,
    y: point1.y - point2.y,
  };

  const vector2 = {
    x: point3.x - point2.x,
    y: point3.y - point2.y,
  };

  // Calculate dot product and magnitudes
  const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
  const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
  const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);

  if (magnitude1 === 0 || magnitude2 === 0) return 0;

  // Calculate angle using arccos
  const cosAngle = dotProduct / (magnitude1 * magnitude2);
  const clampedCosAngle = Math.max(-1, Math.min(1, cosAngle));
  const angleRadians = Math.acos(clampedCosAngle);
  const angleDegrees = (angleRadians * 180) / Math.PI;

  return Math.round(angleDegrees);
}

/**
 * Calculate distance between two points
 * @param {Object} point1 - {x, y}
 * @param {Object} point2 - {x, y}
 * @returns {number} Euclidean distance
 */
export function calculateDistance(point1, point2) {
  if (!point1 || !point2) return 0;
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}
