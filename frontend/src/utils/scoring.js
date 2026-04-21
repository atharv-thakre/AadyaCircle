import { calculateAngle, calculateDistance } from './calculateAngle';
import { getKeypointByName } from './poseDetector';

/**
 * Scorer for jumping jacks exercise
 * Ideal form: arms at ~160° up, legs ~100+ pixels apart
 */
export class JumpingJackScorer {
  constructor() {
    this.frames = [];
    this.accuracyScores = [];
    this.formQualityScores = [];
  }

  /**
   * Score a single frame based on form quality
   * @param {Array} keypoints - MoveNet keypoints array
   * @returns {number} Accuracy score (0-100)
   */
  scoreFrame(keypoints) {
    let score = 0;
    let componentCount = 0;

    // Get required keypoints
    const leftShoulder = getKeypointByName(keypoints, 'left_shoulder');
    const rightShoulder = getKeypointByName(keypoints, 'right_shoulder');
    const leftWrist = getKeypointByName(keypoints, 'left_wrist');
    const rightWrist = getKeypointByName(keypoints, 'right_wrist');
    const leftAnkle = getKeypointByName(keypoints, 'left_ankle');
    const rightAnkle = getKeypointByName(keypoints, 'right_ankle');

    const minScore = 0.3;

    // Score arm angles (ideal: 160-180°)
    if (
      leftShoulder && leftWrist && rightShoulder &&
      (leftShoulder.score || 0) >= minScore && (leftWrist.score || 0) >= minScore
    ) {
      const leftArmAngle = calculateAngle(leftWrist, leftShoulder, { x: leftShoulder.x, y: leftShoulder.y + 100 });
      const idealArmAngle = 170;
      const armAngleDiff = Math.abs(leftArmAngle - idealArmAngle);
      const armScore = Math.max(0, 100 - armAngleDiff * 1.5); // Lenient: 1.5 points per degree diff
      score += armScore;
      componentCount++;
    }

    if (
      rightShoulder && rightWrist && leftShoulder &&
      (rightShoulder.score || 0) >= minScore && (rightWrist.score || 0) >= minScore
    ) {
      const rightArmAngle = calculateAngle(rightWrist, rightShoulder, { x: rightShoulder.x, y: rightShoulder.y + 100 });
      const idealArmAngle = 170;
      const armAngleDiff = Math.abs(rightArmAngle - idealArmAngle);
      const armScore = Math.max(0, 100 - armAngleDiff * 1.5);
      score += armScore;
      componentCount++;
    }

    // Score leg width (ideal: 100+ pixels apart)
    if (
      leftAnkle && rightAnkle &&
      (leftAnkle.score || 0) >= minScore && (rightAnkle.score || 0) >= minScore
    ) {
      const ankleDistance = calculateDistance(leftAnkle, rightAnkle);
      const idealDistance = 120;
      const distanceDiff = Math.abs(ankleDistance - idealDistance);
      const distanceScore = Math.max(0, 100 - distanceDiff * 0.5); // Lenient: 0.5 points per pixel diff
      score += distanceScore;
      componentCount++;
    }

    // Calculate average accuracy for this frame (60-70% is considered good for lenient mode)
    const frameAccuracy = componentCount > 0 ? Math.round(score / componentCount) : 0;
    this.accuracyScores.push(frameAccuracy);

    return frameAccuracy;
  }

  /**
   * Process frame and add to history
   * @param {Array} keypoints - MoveNet keypoints array
   * @param {number} reps - Current rep count
   */
  processFrame(keypoints, reps) {
    const accuracy = this.scoreFrame(keypoints);
    this.frames.push({
      timestamp: Date.now(),
      accuracy,
      reps,
    });
  }

  /**
   * Calculate overall statistics
   * @param {number} totalReps - Total reps completed
   * @returns {Object} Statistics object
   */
  getStatistics(totalReps) {
    if (this.accuracyScores.length === 0) {
      return {
        averageAccuracy: 0,
        formQuality: 0,
        caloriesBurned: 0,
      };
    }

    // Average accuracy across all frames (60% = good in lenient mode)
    const averageAccuracy = Math.round(
      this.accuracyScores.reduce((a, b) => a + b, 0) / this.accuracyScores.length
    );

    // Form quality: consistency of accuracy scores
    const variance = this.calculateVariance(this.accuracyScores);
    const formQuality = Math.max(0, Math.min(100, 100 - variance / 2));

    // Calories: ~0.5 calories per jumping jack (rough estimate)
    const caloriesBurned = parseFloat((totalReps * 0.5).toFixed(2));

    return {
      averageAccuracy: Math.max(0, Math.min(100, averageAccuracy)),
      formQuality: Math.round(formQuality),
      caloriesBurned,
    };
  }

  /**
   * Calculate variance of array values
   * @param {Array} values
   * @returns {number} Variance
   */
  calculateVariance(values) {
    if (values.length < 2) return 0;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squareDiffs = values.map(v => Math.pow(v - mean, 2));
    return squareDiffs.reduce((a, b) => a + b, 0) / values.length;
  }

  /**
   * Reset scorer
   */
  reset() {
    this.frames = [];
    this.accuracyScores = [];
    this.formQualityScores = [];
  }

  /**
   * Get frame history
   * @returns {Array} Frames array
   */
  getFrameHistory() {
    return this.frames;
  }
}

export default JumpingJackScorer;
