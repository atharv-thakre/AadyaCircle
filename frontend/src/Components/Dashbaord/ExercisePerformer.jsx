import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, RotateCcw, ArrowLeft, Loader2 } from 'lucide-react';
import { getExerciseConfig } from '../../utils/exerciseConfig';
import { initializePoseDetector, detectPose, disposePoseDetector, drawSkeleton } from '../../utils/poseDetector';
import JumpingJackCounter from '../../utils/repCounter';
import JumpingJackScorer from '../../utils/scoring';

export default function ExercisePerformer({ isDarkMode = true, exerciseId, onBack, onComplete }) {
  const exercise = getExerciseConfig(exerciseId);
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercise.duration);
  const [reps, setReps] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const counterRef = useRef(null);
  const scorerRef = useRef(null);
  const detectorRef = useRef(null);
  const frameLoopRef = useRef(null);
  const startTimeRef = useRef(null);

  // Initialize pose detector and camera on mount
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Initialize pose detector
        detectorRef.current = await initializePoseDetector();

        // Initialize counter and scorer
        counterRef.current = new JumpingJackCounter();
        scorerRef.current = new JumpingJackScorer();

        // Access webcam
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 } },
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setIsCameraReady(true);
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing camera or detector:', err);
        setError(err.message || 'Failed to access camera. Please check permissions.');
        setIsLoading(false);
      }
    };

    initializeCamera();

    // Cleanup on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (detectorRef.current) {
        disposePoseDetector();
      }
      if (frameLoopRef.current) {
        cancelAnimationFrame(frameLoopRef.current);
      }
    };
  }, []);

  // Start exercise
  const handleStart = async () => {
    if (!isCameraReady || !videoRef.current) {
      setError('Camera not ready');
      return;
    }

    setIsStarted(true);
    setTimeLeft(exercise.duration);
    setReps(0);
    setAccuracy(0);
    counterRef.current.reset();
    scorerRef.current.reset();
    startTimeRef.current = Date.now();

    // Start detection loop
    const runDetection = async () => {
      if (!isStarted) return;

      try {
        const keypoints = await detectPose(videoRef.current);

        if (keypoints && keypoints.length > 0) {
          // Update counter
          const { repCount, isRepCompleted } = counterRef.current.processFrame(keypoints);
          setReps(repCount);

          // Update scorer
          scorerRef.current.processFrame(keypoints, repCount);
          const stats = scorerRef.current.getStatistics(repCount);
          setAccuracy(stats.averageAccuracy);

          // Draw skeleton
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawSkeleton(ctx, keypoints, 0.3);
          }
        }

        frameLoopRef.current = requestAnimationFrame(runDetection);
      } catch (err) {
        console.error('Detection error:', err);
      }
    };

    frameLoopRef.current = requestAnimationFrame(runDetection);
  };

  // Stop exercise
  const handleStop = () => {
    setIsStarted(false);
    if (frameLoopRef.current) {
      cancelAnimationFrame(frameLoopRef.current);
    }
  };

  // Timer effect
  useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted]);

  // Auto-submit when timer hits zero
  useEffect(() => {
    if (timeLeft === 0 && isStarted) {
      handleSubmit();
    }
  }, [timeLeft, isStarted]);

  // Handle video canvas size
  useEffect(() => {
    if (videoRef.current && canvasRef.current && isCameraReady) {
      const { videoWidth, videoHeight } = videoRef.current;
      if (videoWidth && videoHeight) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
      }
    }
  }, [isCameraReady]);

  const handleSubmit = useCallback(() => {
    handleStop();
    
    // Use refs or current state - here we trust state is updated
    const stats = {
      exerciseId: exerciseId,
      exerciseName: exercise.name,
      reps,
      accuracy,
      formScore: scorerRef.current?.getStatistics(reps).formQuality || 0,
      caloriesBurned: scorerRef.current?.getStatistics(reps).caloriesBurned || 0,
      duration: exercise.duration,
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage
    const history = JSON.parse(localStorage.getItem('exerciseHistory') || '[]');
    history.push(stats);
    localStorage.setItem('exerciseHistory', JSON.stringify(history));

    if (onComplete) onComplete(stats);
  }, [exerciseId, exercise.name, exercise.duration, reps, accuracy, onComplete]);

  if (!exercise) {
    return (
      <div className={`w-full h-full rounded-2xl border p-8 flex items-center justify-center ${
        isDarkMode ? 'border-[#c47ea8]/30 bg-[#0f0f0f]/40' : 'border-[#c47ea8]/20 bg-white/50'
      }`}>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Exercise not found</p>
      </div>
    );
  }

  return (
    <div className={`w-full h-full rounded-2xl border p-6 ${isDarkMode ? 'border-[#c47ea8]/30 bg-[#0f0f0f]/40' : 'border-[#c47ea8]/20 bg-white/50'} backdrop-blur-md flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-[#262626] text-gray-400' : 'hover:bg-gray-200 text-gray-600'
          }`}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {exercise.name}
        </h1>
        <div />
      </div>

      {/* Main Layout: YouTube + Webcam */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 min-h-0">
        {/* YouTube Video */}
        <div className={`rounded-xl overflow-hidden border ${isDarkMode ? 'border-[#c47ea8]/30' : 'border-[#c47ea8]/20'}`}>
          <iframe
            width="100%"
            height="100%"
            src={exercise.videoUrl}
            title="Exercise Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Webcam Feed */}
        <div className={`rounded-xl overflow-hidden border relative bg-black ${isDarkMode ? 'border-[#c47ea8]/30' : 'border-[#c47ea8]/20'}`}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <Loader2 className="animate-spin text-[#c47ea8]" size={32} />
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/80 z-10 p-4">
              <p className="text-white text-center text-sm">{error}</p>
            </div>
          )}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform scale-x-[-1]"
            onLoadedMetadata={() => {
              if (canvasRef.current && videoRef.current) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
              }
            }}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      {/* Stats and Controls */}
      <div className={`rounded-xl border p-4 ${isDarkMode ? 'border-[#c47ea8]/30 bg-[#1a1a1a]/60' : 'border-[#c47ea8]/20 bg-white/80'}`}>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* Timer */}
          <div className="text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time Left</p>
            <p className={`text-3xl font-bold ${isStarted ? 'text-[#c47ea8]' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {timeLeft}s
            </p>
          </div>

          {/* Reps */}
          <div className="text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Reps</p>
            <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {reps}
            </p>
          </div>

          {/* Accuracy */}
          <div className="text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Accuracy</p>
            <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {accuracy}%
            </p>
          </div>

          {/* Duration */}
          <div className="text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Duration</p>
            <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {exercise.duration}s
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          {!isStarted && timeLeft > 0 ? (
            <button
              onClick={handleStart}
              disabled={!isCameraReady || isLoading}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                isCameraReady && !isLoading
                  ? 'bg-[#c47ea8] text-white hover:bg-[#b86b9d]'
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
            >
              <Play size={18} />
              {timeLeft < exercise.duration ? 'Resume' : 'Start'}
            </button>
          ) : isStarted ? (
            <button
              onClick={handleStop}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition-all"
            >
              <Square size={18} />
              Stop
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-[#c47ea8] text-white hover:bg-[#b86b9d] transition-all"
            >
              Submit Result
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
