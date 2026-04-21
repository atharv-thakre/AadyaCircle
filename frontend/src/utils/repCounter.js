import { calculateAngle, calculateDistance } from './calculateAngle';
import { getKeypointByName } from './poseDetector';

/**
 * Detect jumping jacks from keypoints
 * Uses: arm height (shoulders to wrists) and leg width (ankle distance)
 */
export class JumpingJackCounter {
  constructor() {
    this.repCount = 0;
    this.state = 'down'; // 'down' -> 'up' -> 'down' (state machine to prevent double counting)
    this.history = [];
    this.frameCount = 0;
    this.lastRepFrame = -1;
  }

  /**
   * Process keypoints and detect rep
   * @param {Array} keypoints - MoveNet keypoints array
   * @returns {Object} {repCount, isRepCompleted, state}
   */
  processFrame(keypoints) {
    this.frameCount++;
    const isRepCompleted = false;

    // Get required keypoints
    const leftShoulder = getKeypointByName(keypoints, 'left_shoulder');
    const rightShoulder = getKeypointByName(keypoints, 'right_shoulder');
    const leftWrist = getKeypointByName(keypoints, 'left_wrist');
    const rightWrist = getKeypointByName(keypoints, 'right_wrist');
    const leftAnkle = getKeypointByName(keypoints, 'left_ankle');
    const rightAnkle = getKeypointByName(keypoints, 'right_ankle');

    // Check if keypoints have sufficient confidence
    const minScore = 0.3;
    if (
      !leftShoulder || !rightShoulder || !leftWrist || !rightWrist || !leftAnkle || !rightAnkle ||
      (leftShoulder.score || 0) < minScore || (rightShoulder.score || 0) < minScore ||
      (leftWrist.score || 0) < minScore || (rightWrist.score || 0) < minScore ||
      (leftAnkle.score || 0) < minScore || (rightAnkle.score || 0) < minScore
    ) {
      return { repCount: this.repCount, isRepCompleted, state: this.state };
    }

    // Detect arm height: are wrists above shoulders?
    const armHeightThreshold = 30; // pixels above shoulders
    const leftArmRaised = leftWrist.y < leftShoulder.y - armHeightThreshold;
    const rightArmRaised = rightWrist.y < rightShoulder.y - armHeightThreshold;
    const armsRaised = leftArmRaised && rightArmRaised;

    // Detect leg width: are ankles far apart?
    const ankleDistance = calculateDistance(leftAnkle, rightAnkle);
    const legWidthThreshold = 100; // pixels minimum distance between ankles
    const legsApart = ankleDistance > legWidthThreshold;

    // State machine logic
    if (this.state === 'down') {
      // Transition from down to up
      if (armsRaised && legsApart) {
        this.state = 'up';
      }
    } else if (this.state === 'up') {
      // Transition from up back to down (rep completed)
      if (!armsRaised || !legsApart) {
        this.state = 'down';
        // Only count if at least 10 frames have passed since last rep
        if (this.frameCount - this.lastRepFrame > 10) {
          this.repCount++;
          this.lastRepFrame = this.frameCount;
          this.history.push({
            timestamp: Date.now(),
            frame: this.frameCount,
          });
          return { repCount: this.repCount, isRepCompleted: true, state: this.state };
        }
      }
    }

    return { repCount: this.repCount, isRepCompleted, state: this.state };
  }

  /**
   * Get rep history
   * @returns {Array} Array of rep timestamps
   */
  getHistory() {
    return this.history;
  }

  /**
   * Reset counter
   */
  reset() {
    this.repCount = 0;
    this.state = 'down';
    this.history = [];
    this.frameCount = 0;
    this.lastRepFrame = -1;
  }

  /**
   * Get statistics
   * @returns {Object} Stats object
   */
  getStats() {
    return {
      totalReps: this.repCount,
      totalFrames: this.frameCount,
      repsPerSecond: this.frameCount > 0 ? (this.repCount / (this.frameCount / 30)).toFixed(2) : 0,
    };
  }
}

export default JumpingJackCounter;
