import { calculateAngle } from '../utils/calculateAngle';
import { computeWeightedScore } from '../utils/scoring';

const MIN_SCORE = 0.2;

function pickSide(keypoints, leftName, rightName) {
  const left = keypoints[leftName];
  const right = keypoints[rightName];
  if (!left && !right) return null;
  if (!left) return 'right';
  if (!right) return 'left';
  return (left.score || 0) >= (right.score || 0) ? 'left' : 'right';
}

function mapKeypoints(rawKeypoints = []) {
  return rawKeypoints.reduce((acc, kp) => {
    if (kp?.name && (kp?.score ?? 0) >= MIN_SCORE) {
      acc[kp.name] = kp;
    }
    return acc;
  }, {});
}

function resolvePhase(currentPhase, previousPhase) {
  if (currentPhase === 'up' || currentPhase === 'down') {
    return currentPhase;
  }
  return previousPhase || 'up';
}

function squashFeedback(messages, fallback) {
  return messages.length ? messages[0] : fallback;
}

function analyzeSquat(kp, previousPhase) {
  const side = pickSide(kp, 'left_hip', 'right_hip') || 'left';
  const shoulder = kp[`${side}_shoulder`];
  const hip = kp[`${side}_hip`];
  const knee = kp[`${side}_knee`];
  const ankle = kp[`${side}_ankle`];

  if (!shoulder || !hip || !knee || !ankle) {
    return {
      phase: previousPhase || 'up',
      score: 0,
      feedback: 'Move fully into frame for squat tracking.',
      metrics: {},
      meta: null,
    };
  }

  const kneeAngle = calculateAngle(hip, knee, ankle);
  const backAngle = calculateAngle(shoulder, hip, knee);
  const hipBelowKnee = hip.y > knee.y;
  const kneeTravel = Math.abs(knee.x - ankle.x) < 0.13;

  let phase = previousPhase || 'up';
  if (kneeAngle !== null) {
    if (kneeAngle < 95 && hipBelowKnee) phase = 'down';
    if (kneeAngle > 160) phase = 'up';
  }

  const checks = [
    { ok: backAngle !== null && backAngle > 155, weight: 0.4, message: 'Keep your back straight' },
    { ok: hipBelowKnee, weight: 0.35, message: 'Go lower' },
    { ok: kneeTravel, weight: 0.25, message: 'Keep knees behind your toes' },
  ];

  const { score, failedMessages } = computeWeightedScore(checks);

  return {
    phase: resolvePhase(phase, previousPhase),
    score,
    feedback: squashFeedback(failedMessages, 'Great squat form. Keep it up.'),
    metrics: {
      kneeAngle: kneeAngle ? Math.round(kneeAngle) : null,
      backAngle: backAngle ? Math.round(backAngle) : null,
    },
    meta: null,
  };
}

function analyzePushup(kp, previousPhase) {
  const side = pickSide(kp, 'left_shoulder', 'right_shoulder') || 'left';
  const shoulder = kp[`${side}_shoulder`];
  const elbow = kp[`${side}_elbow`];
  const wrist = kp[`${side}_wrist`];
  const hip = kp[`${side}_hip`];
  const ankle = kp[`${side}_ankle`];

  if (!shoulder || !elbow || !wrist || !hip || !ankle) {
    return {
      phase: previousPhase || 'up',
      score: 0,
      feedback: 'Move fully into frame for push-up tracking.',
      metrics: {},
      meta: null,
    };
  }

  const elbowAngle = calculateAngle(shoulder, elbow, wrist);
  const bodyLineAngle = calculateAngle(shoulder, hip, ankle);
  const chestLowered = shoulder.y >= elbow.y - 0.03;

  let phase = previousPhase || 'up';
  if (elbowAngle !== null) {
    if (elbowAngle < 95 && chestLowered) phase = 'down';
    if (elbowAngle > 155) phase = 'up';
  }

  const checks = [
    { ok: bodyLineAngle !== null && bodyLineAngle > 155, weight: 0.45, message: 'Keep your body in a straight line' },
    { ok: elbowAngle !== null && elbowAngle <= 100, weight: 0.3, message: 'Bend elbows close to 90 degrees' },
    { ok: chestLowered, weight: 0.25, message: 'Lower your chest a little more' },
  ];

  const { score, failedMessages } = computeWeightedScore(checks);

  return {
    phase: resolvePhase(phase, previousPhase),
    score,
    feedback: squashFeedback(failedMessages, 'Strong push-up rep. Maintain control.'),
    metrics: {
      elbowAngle: elbowAngle ? Math.round(elbowAngle) : null,
      bodyLineAngle: bodyLineAngle ? Math.round(bodyLineAngle) : null,
    },
    meta: null,
  };
}

function analyzeBicepCurl(kp, previousPhase, previousMeta) {
  const side = pickSide(kp, 'left_elbow', 'right_elbow') || 'left';
  const shoulder = kp[`${side}_shoulder`];
  const elbow = kp[`${side}_elbow`];
  const wrist = kp[`${side}_wrist`];

  if (!shoulder || !elbow || !wrist) {
    return {
      phase: previousPhase || 'down',
      score: 0,
      feedback: 'Move fully into frame for curl tracking.',
      metrics: {},
      meta: previousMeta || null,
    };
  }

  const elbowAngle = calculateAngle(shoulder, elbow, wrist);
  const previousElbow = previousMeta?.elbow;
  const elbowDrift = previousElbow
    ? Math.hypot(elbow.x - previousElbow.x, elbow.y - previousElbow.y)
    : 0;

  const contraction = elbowAngle !== null && elbowAngle < 55;
  const extension = elbowAngle !== null && elbowAngle > 150;
  const stableElbow = elbowDrift < 0.04;

  let phase = previousPhase || 'down';
  if (contraction) phase = 'up';
  if (extension) phase = 'down';

  const checks = [
    { ok: contraction || extension, weight: 0.4, message: 'Use full contraction and extension' },
    { ok: stableElbow, weight: 0.35, message: "Don't swing your arm" },
    { ok: elbowAngle !== null && elbowAngle > 35, weight: 0.25, message: 'Control the movement speed' },
  ];

  const { score, failedMessages } = computeWeightedScore(checks);

  return {
    phase: resolvePhase(phase, previousPhase),
    score,
    feedback: squashFeedback(failedMessages, 'Nice curl. Keep elbow fixed.'),
    metrics: {
      elbowAngle: elbowAngle ? Math.round(elbowAngle) : null,
    },
    meta: {
      elbow,
      elbowAngle,
    },
  };
}

export function analyzeExercise({ exercise, keypoints, previousPhase, previousMeta }) {
  const mapped = mapKeypoints(keypoints);

  if (exercise === 'pushups') {
    return analyzePushup(mapped, previousPhase);
  }

  if (exercise === 'bicep-curls') {
    return analyzeBicepCurl(mapped, previousPhase, previousMeta);
  }

  return analyzeSquat(mapped, previousPhase);
}
