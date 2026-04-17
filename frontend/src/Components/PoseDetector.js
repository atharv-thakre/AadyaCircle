import { useEffect, useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

const EDGES = [
  ['left_shoulder', 'right_shoulder'],
  ['left_shoulder', 'left_elbow'],
  ['left_elbow', 'left_wrist'],
  ['right_shoulder', 'right_elbow'],
  ['right_elbow', 'right_wrist'],
  ['left_shoulder', 'left_hip'],
  ['right_shoulder', 'right_hip'],
  ['left_hip', 'right_hip'],
  ['left_hip', 'left_knee'],
  ['left_knee', 'left_ankle'],
  ['right_hip', 'right_knee'],
  ['right_knee', 'right_ankle'],
];

function drawPose(canvas, pose) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!pose?.keypoints?.length) return;

  const keypointsByName = pose.keypoints.reduce((acc, kp) => {
    if (kp?.name && (kp?.score ?? 0) > 0.2) {
      acc[kp.name] = kp;
    }
    return acc;
  }, {});

  ctx.strokeStyle = '#c47ea8';
  ctx.lineWidth = 3;

  EDGES.forEach(([start, end]) => {
    const a = keypointsByName[start];
    const b = keypointsByName[end];
    if (!a || !b) return;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });

  Object.values(keypointsByName).forEach((kp) => {
    ctx.beginPath();
    ctx.arc(kp.x, kp.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#fce8f0';
    ctx.fill();
  });
}

export default function PoseDetector({ videoRef, canvasRef, onPose, onModelReady, onStatus }) {
  const detectorRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let consecutiveErrors = 0;

    const createDetectorWithFallback = async () => {
      const mediapipeSources = [
        'https://cdn.jsdelivr.net/gh/google-ai-edge/mediapipe@master/mediapipe/pose',
        'https://cdn.jsdelivr.net/npm/@mediapipe/pose',
      ];

      let lastError = null;
      onStatus?.('Loading BlazePose model...');

      // Prefer BlazePose MediaPipe runtime to avoid tfhub model loading issues.
      for (const solutionPath of mediapipeSources) {
        try {
          const detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.BlazePose,
            {
              runtime: 'mediapipe',
              modelType: 'full',
              solutionPath,
              enableSmoothing: true,
            }
          );
          onStatus?.(`Model ready (BlazePose via ${solutionPath.includes('gh/') ? 'GitHub CDN' : 'jsDelivr npm'}).`);
          return detector;
        } catch (error) {
          lastError = error;
          console.warn(`BlazePose init failed for ${solutionPath}`, error);
        }
      }

      // Final fallback to MoveNet so the app can still run.
      try {
        onStatus?.('BlazePose source failed. Falling back to MoveNet...');
        const moveNetDetector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          {
            modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
            enableSmoothing: true,
          }
        );
        onStatus?.('Model ready (MoveNet fallback).');
        return moveNetDetector;
      } catch (moveNetError) {
        try {
          onStatus?.('MoveNet failed. Falling back to PoseNet...');
          const poseNetDetector = await poseDetection.createDetector(
            poseDetection.SupportedModels.PoseNet,
            {
              architecture: 'MobileNetV1',
              outputStride: 16,
              inputResolution: { width: 640, height: 480 },
              multiplier: 0.75,
            }
          );
          onStatus?.('Model ready (PoseNet fallback).');
          return poseNetDetector;
        } catch (poseNetError) {
          onStatus?.('All model sources failed to initialize.');
          throw poseNetError || moveNetError || lastError;
        }
      }
    };

    const setup = async () => {
      try {
        await tf.setBackend('webgl');
      } catch (error) {
        await tf.setBackend('cpu');
      }
      await tf.ready();

      const detector = await createDetectorWithFallback();

      if (cancelled) {
        await detector.dispose();
        return;
      }

      detectorRef.current = detector;
      onModelReady?.(true);

      const detect = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas || video.readyState < 2) {
          frameRef.current = requestAnimationFrame(detect);
          return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        try {
          const poses = await detector.estimatePoses(video, { flipHorizontal: true });
          consecutiveErrors = 0;
          const pose = poses?.[0] || null;
          drawPose(canvas, pose);
          onPose?.(pose);
        } catch (error) {
          console.error('Pose estimation failed:', error);
          consecutiveErrors += 1;
          if (consecutiveErrors >= 6) {
            onModelReady?.(false);
            onStatus?.('Pose detector running into repeated frame errors. Please refresh.');
          }
        }

        frameRef.current = requestAnimationFrame(detect);
      };

      frameRef.current = requestAnimationFrame(detect);
    };

    setup().catch((error) => {
      console.error('Failed to initialize pose detector:', error);
      onModelReady?.(false);
      onStatus?.(`Model init failed: ${error?.message || 'Unknown error'}`);
    });

    return () => {
      cancelled = true;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (detectorRef.current) detectorRef.current.dispose();
      detectorRef.current = null;
    };
  }, [canvasRef, onModelReady, onPose, onStatus, videoRef]);

  return null;
}
