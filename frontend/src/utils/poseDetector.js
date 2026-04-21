import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

let detector = null;

/**
 * Initialize pose detection model (MoveNet)
 * @returns {Promise} Detector instance
 */
export async function initializePoseDetector() {
  if (detector) return detector;

  try {
    // Ensure TensorFlow is ready
    await tf.ready();

    // Create MoveNet detector
    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      }
    );

    return detector;
  } catch (error) {
    console.error('Error initializing pose detector:', error);
    throw error;
  }
}

/**
 * Detect pose from a video element or canvas
 * @param {HTMLVideoElement|HTMLCanvasElement} input - Video or canvas element
 * @returns {Promise<Array>} Array of keypoints with {x, y, name, score}
 */
export async function detectPose(input) {
  if (!detector) {
    throw new Error('Pose detector not initialized. Call initializePoseDetector first.');
  }

  try {
    const poses = await detector.estimatePoses(input);
    
    if (poses && poses.length > 0) {
      return poses[0].keypoints;
    }
    return [];
  } catch (error) {
    console.error('Error detecting pose:', error);
    return [];
  }
}

/**
 * Get keypoint by name
 * @param {Array} keypoints - Array of keypoints
 * @param {string} name - Keypoint name (e.g., 'left_shoulder')
 * @returns {Object} Keypoint object or null
 */
export function getKeypointByName(keypoints, name) {
  return keypoints.find(kp => kp.name === name) || null;
}

/**
 * Filter keypoints by confidence score
 * @param {Array} keypoints - Array of keypoints
 * @param {number} minScore - Minimum confidence score (0-1)
 * @returns {Array} Filtered keypoints
 */
export function filterKeypointsByScore(keypoints, minScore = 0.3) {
  return keypoints.filter(kp => (kp.score || 0) >= minScore);
}

/**
 * Draw skeleton on canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} keypoints - Array of keypoints
 * @param {number} minScore - Minimum score to draw
 */
export function drawSkeleton(ctx, keypoints, minScore = 0.3) {
  // Define skeleton connections for MoveNet
  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 4], // Head
    [5, 6], [5, 7], [7, 9], [6, 8], [8, 10], // Arms
    [5, 11], [6, 12], [11, 12], // Shoulders to hips
    [11, 13], [13, 15], [12, 14], [14, 16], // Legs
  ];

  // Draw connections
  ctx.strokeStyle = '#ec4899';
  ctx.lineWidth = 2;

  connections.forEach(([startIdx, endIdx]) => {
    const start = keypoints[startIdx];
    const end = keypoints[endIdx];

    if (start && end && (start.score || 0) >= minScore && (end.score || 0) >= minScore) {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  });

  // Draw keypoints
  ctx.fillStyle = '#ec4899';
  keypoints.forEach(kp => {
    if ((kp.score || 0) >= minScore) {
      ctx.beginPath();
      ctx.arc(kp.x, kp.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

/**
 * Release detector and free memory
 */
export function disposePoseDetector() {
  if (detector) {
    detector.dispose();
    detector = null;
  }
}
