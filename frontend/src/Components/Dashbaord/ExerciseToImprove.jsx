import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Activity, AlertTriangle, Camera, CheckCircle2, Play, RotateCcw, Video, Target, TrendingUp, Info } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { useAuth } from '../../context/AuthContext';

const EXERCISES = [
    {
        id: 'arms-up-hold',
        title: 'Arms Up Hold',
        description: 'Raise both hands up and hold a stable posture for a few seconds.',
        demoSrc: '/ArmsUp.mp4',
        demoTimestamp: 1,
        durationMs: 7000,
        passAccuracy: 65,
        angleTriplets: [
            ['left_shoulder', 'left_elbow', 'left_wrist'],
            ['right_shoulder', 'right_elbow', 'right_wrist'],
            ['left_elbow', 'left_shoulder', 'left_hip'],
            ['right_elbow', 'right_shoulder', 'right_hip']
        ]
    },
    {
        id: 'side-balance',
        title: 'Side Balance',
        description: 'Open your arms and keep your torso aligned while balancing your stance.',
        demoSrc: '/Side_Balance.mp4',
        demoTimestamp: 1,
        durationMs: 7000,
        passAccuracy: 65,
        angleTriplets: [
            ['left_shoulder', 'left_elbow', 'left_wrist'],
            ['right_shoulder', 'right_elbow', 'right_wrist'],
            ['left_shoulder', 'left_hip', 'left_knee'],
            ['right_shoulder', 'right_hip', 'right_knee']
        ]
    },
    {
        id: 'power-stance',
        title: 'Power Stance',
        description: 'Keep your chest open, knees soft, and maintain a confident lower-body stance.',
        demoSrc: '/PowerStance.mp4',
        demoTimestamp: 1,
        durationMs: 7000,
        passAccuracy: 70,
        angleTriplets: [
            ['left_hip', 'left_knee', 'left_ankle'],
            ['right_hip', 'right_knee', 'right_ankle'],
            ['left_shoulder', 'left_hip', 'left_knee'],
            ['right_shoulder', 'right_hip', 'right_knee']
        ]
    }
];

const KP_MIN_SCORE = 0.3;

const waitForEvent = (element, eventName) =>
    new Promise(resolve => {
        const handler = () => {
            element.removeEventListener(eventName, handler);
            resolve();
        };
        element.addEventListener(eventName, handler, { once: true });
    });

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function getAngle(a, b, c) {
    if (!a || !b || !c) return null;

    const ab = { x: a.x - b.x, y: a.y - b.y };
    const cb = { x: c.x - b.x, y: c.y - b.y };

    const dot = ab.x * cb.x + ab.y * cb.y;
    const magAB = Math.sqrt(ab.x ** 2 + ab.y ** 2);
    const magCB = Math.sqrt(cb.x ** 2 + cb.y ** 2);

    if (!magAB || !magCB) return null;

    const cosine = clamp(dot / (magAB * magCB), -1, 1);
    return (Math.acos(cosine) * 180) / Math.PI;
}

function getPointByName(keypoints, name) {
    return keypoints.find(kp => kp.name === name && (kp.score ?? 0) >= KP_MIN_SCORE);
}

function extractAngles(keypoints, triplets) {
    const angles = {};
    triplets.forEach(([a, b, c]) => {
        const first = getPointByName(keypoints, a);
        const middle = getPointByName(keypoints, b);
        const third = getPointByName(keypoints, c);
        const angle = getAngle(first, middle, third);
        if (angle !== null) {
            angles[`${a}-${b}-${c}`] = angle;
        }
    });
    return angles;
}

function calculateAccuracy(currentAngles, baselineAngles) {
    const keys = Object.keys(baselineAngles).filter(key => typeof currentAngles[key] === 'number');
    if (!keys.length) return 0;

    const totalError = keys.reduce((sum, key) => {
        const diff = Math.abs(currentAngles[key] - baselineAngles[key]);
        const normalized = clamp(diff / 90, 0, 1); // Normalize error up to 90 degrees
        return sum + normalized;
    }, 0);

    const avgError = totalError / keys.length;
    return Math.round((1 - avgError) * 100);
}

function mapCameraError(error) {
    const name = error?.name || '';
    if (name === 'NotAllowedError' || name === 'SecurityError') {
        return 'Camera access was denied. Please allow camera permission and retry.';
    }
    if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        return 'No camera device was found. Connect a camera and retry.';
    }
    if (name === 'NotReadableError' || name === 'TrackStartError') {
        return 'Camera is busy in another app. Close other apps using camera and retry.';
    }
    if (name === 'OverconstrainedError' || name === 'ConstraintNotSatisfiedError') {
        return 'Camera constraints are not supported on this device.';
    }

    return error?.message || 'Unable to access camera.';
}

function drawPose(canvas, video, keypoints) {
    const ctx = canvas.getContext('2d');
    if (!ctx || !video.videoWidth || !video.videoHeight) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create a subtle mirrored effect for realism
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Draw skeleton lines
    const adjacentPairs = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.MoveNet);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.7)'; // pink-500
    
    adjacentPairs.forEach(([i, j]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];
        if (kp1.score >= KP_MIN_SCORE && kp2.score >= KP_MIN_SCORE) {
            ctx.beginPath();
            // Since video is mirrored visually above, we need to match keypoint drawing.
            // MoveNet outputs coordinates already horizontally flipped if `flipHorizontal: true` was passed!
            ctx.moveTo(kp1.x, kp1.y);
            ctx.lineTo(kp2.x, kp2.y);
            ctx.stroke();
        }
    });

    // Draw keypoints
    keypoints.forEach(point => {
        if ((point.score ?? 0) < KP_MIN_SCORE) return;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ec4899'; // pink-500
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

export default function ExerciseToImprove({ isDarkMode = true }) {
    const { progress, recordExerciseResult } = useAuth();

    const detectorRef = useRef(null);
    const webcamRef = useRef(null);
    const demoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const frameLoopRef = useRef(null);

    const [modelState, setModelState] = useState('idle'); // idle | loading | ready | error
    const [activeExerciseId, setActiveExerciseId] = useState(null);
    const [runtimeError, setRuntimeError] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [currentAccuracy, setCurrentAccuracy] = useState(0);
    const [lastResult, setLastResult] = useState(null);

    const baselineCacheRef = useRef({});
    const samplesRef = useRef([]);
    const startTimeRef = useRef(0);
    const isRunningRef = useRef(false);

    const activeExercise = useMemo(
        () => EXERCISES.find(item => item.id === activeExerciseId) || null,
        [activeExerciseId]
    );

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (webcamRef.current) {
            webcamRef.current.srcObject = null;
        }
        setIsCameraReady(false);
    }, []);

    const stopSession = useCallback(() => {
        if (frameLoopRef.current) {
            cancelAnimationFrame(frameLoopRef.current);
            frameLoopRef.current = null;
        }
        isRunningRef.current = false;
        setIsRunning(false);
    }, []);

    const bootModel = useCallback(async () => {
        if (detectorRef.current) return detectorRef.current;

        setModelState('loading');
        await tf.ready();

        try {
            const supportedModels = poseDetection.SupportedModels;
            const movenetModelType = poseDetection.movenet?.modelType?.SINGLEPOSE_LIGHTNING;

            if (typeof poseDetection.createDetector !== 'function' || !supportedModels?.MoveNet) {
                throw new Error('Pose detector API is unavailable in this build.');
            }

            detectorRef.current = await poseDetection.createDetector(
                supportedModels.MoveNet,
                movenetModelType
                    ? { modelType: movenetModelType }
                    : { modelType: 'SinglePose.Lightning' }
            );
        } catch (error) {
            console.error('Pose model init failed:', error);
            setModelState('error');
            throw error;
        }

        setModelState('ready');
        return detectorRef.current;
    }, []);

    const startCamera = useCallback(async () => {
        if (!navigator?.mediaDevices?.getUserMedia) {
            throw new Error('Camera device is not accessible in your browser.');
        }

        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                },
                audio: false
            });
        } catch (error) {
            throw new Error(mapCameraError(error));
        }

        streamRef.current = stream;
        if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
            if (webcamRef.current.readyState < 1) {
                await waitForEvent(webcamRef.current, 'loadedmetadata');
            }
            await webcamRef.current.play();
            setIsCameraReady(true);
        }
    }, []);

    const getDemoBaselineAngles = useCallback(async exercise => {
        if (baselineCacheRef.current[exercise.id]) {
            return baselineCacheRef.current[exercise.id];
        }

        const detector = await bootModel();
        const demoVideo = demoRef.current;
        if (!demoVideo) throw new Error('Demo video element is missing.');

        demoVideo.src = exercise.demoSrc;
        demoVideo.currentTime = 0;
        await waitForEvent(demoVideo, 'loadedmetadata');

        const seekTime = Math.min(exercise.demoTimestamp, Math.max(0, demoVideo.duration - 0.2));
        demoVideo.currentTime = seekTime;
        await waitForEvent(demoVideo, 'seeked');

        const demoPoses = await detector.estimatePoses(demoVideo, { flipHorizontal: false });
        if (!demoPoses?.length) {
            throw new Error('No demonstrator pose detected on the requested frame.');
        }

        const baselineAngles = extractAngles(demoPoses[0].keypoints, exercise.angleTriplets);
        if (!Object.keys(baselineAngles).length) {
            throw new Error('Failed to compute essential baseline angles from demo frame.');
        }

        baselineCacheRef.current[exercise.id] = baselineAngles;
        return baselineAngles;
    }, [bootModel]);

    const finalizeSession = useCallback((exercise, passAccuracy) => {
        const samples = samplesRef.current;
        if (!samples.length) {
            setRuntimeError('Could not record enough valid pose samples. Ensure full body is visible in good lighting.');
            stopSession();
            return;
        }

        const avg = Math.round(samples.reduce((sum, score) => sum + score, 0) / samples.length);
        setLastResult({
            exerciseId: exercise.id,
            accuracy: avg,
            passed: avg >= passAccuracy
        });
        
        // Notify context about the completed exercise result
        if (recordExerciseResult) {
            recordExerciseResult(exercise.id, avg);
        }
        
        stopSession();
    }, [recordExerciseResult, stopSession]);

    const runTrackingLoop = useCallback(async (exercise, baselineAngles) => {
        const detector = detectorRef.current;
        const webcam = webcamRef.current;
        if (!detector || !webcam) return;

        const tick = async () => {
            try {
                if (!isRunningRef.current) return;

                const poses = await detector.estimatePoses(webcam, { flipHorizontal: true });
                const pose = poses?.[0];

                // Always paint webcam frames so camera does not appear blank
                // when keypoints are temporarily not detected.
                drawPose(canvasRef.current, webcam, pose?.keypoints || []);

                if (pose?.keypoints?.length) {
                    const currentAngles = extractAngles(pose.keypoints, exercise.angleTriplets);
                    const accuracy = calculateAccuracy(currentAngles, baselineAngles);

                    if (accuracy > 0) {
                        setCurrentAccuracy(accuracy);
                        samplesRef.current.push(accuracy);
                    }
                }

                const elapsed = Date.now() - startTimeRef.current;
                if (elapsed >= exercise.durationMs) {
                    finalizeSession(exercise, exercise.passAccuracy);
                    return;
                }

                frameLoopRef.current = requestAnimationFrame(tick);
            } catch (err) {
                console.error("Frame loop error:", err);
                setRuntimeError('Pose tracking encountered an error. Please stop and retry.');
                stopSession();
            }
        };

        frameLoopRef.current = requestAnimationFrame(tick);
    }, [finalizeSession, stopSession]);

    const handleStartExercise = useCallback(async exercise => {
        setRuntimeError('');
        setLastResult(null);
        setCurrentAccuracy(0);
        setActiveExerciseId(exercise.id);

        try {
            await startCamera();
            await bootModel();
            const baselineAngles = await getDemoBaselineAngles(exercise);

            samplesRef.current = [];
            startTimeRef.current = Date.now();
            isRunningRef.current = true;
            setIsRunning(true);

            await runTrackingLoop(exercise, baselineAngles);
        } catch (error) {
            console.error('HANDLE START EXERCISE ERROR:', error);
            setRuntimeError(error?.message || 'Unable to initialize the exercise.');
            stopSession();
            stopCamera();
        }
    }, [bootModel, getDemoBaselineAngles, runTrackingLoop, startCamera, stopCamera, stopSession]);

    const handleStopExercise = useCallback(() => {
        stopSession();
        stopCamera();
    }, [stopCamera, stopSession]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopSession();
            stopCamera();
        };
    }, [stopCamera, stopSession]);

    // UI Themes utilizing Glassmorphism
    const themeParams = isDarkMode 
        ? {
            bg: "bg-gradient-to-br from-[#0a0a0c] to-[#121018]",
            textNorm: "text-gray-200",
            textMuted: "text-gray-400",
            cardBg: "bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]",
            cardHover: "hover:bg-white/[0.07]",
            accentText: "text-pink-400",
            accentBg: "bg-pink-500/20 text-pink-300",
            gradientText: "bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
        } 
        : {
            bg: "bg-gray-50",
            textNorm: "text-gray-900",
            textMuted: "text-gray-500",
            cardBg: "bg-white border border-gray-200 shadow-sm",
            cardHover: "hover:bg-gray-50",
            accentText: "text-pink-600",
            accentBg: "bg-pink-100 text-pink-700",
            gradientText: "bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
        };

    const elapsedTime = isRunningRef.current ? Math.min((Date.now() - startTimeRef.current) / 1000, activeExercise?.durationMs / 1000) : 0;
    const progressPercent = activeExercise ? (elapsedTime / (activeExercise.durationMs / 1000)) * 100 : 0;

    return (
        <div className={`w-full min-h-screen ${themeParams.bg} font-sans transition-colors duration-500 p-4 sm:p-6 lg:p-8 relative overflow-hidden`}>
            {/* Ambient Background decorations */}
            {isDarkMode && (
                <>
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/10 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
                </>
            )}

            <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${themeParams.cardBg} flex items-center justify-center shadow-lg border-t border-t-white/10`}>
                            <TrendingUp className={themeParams.accentText} size={28} />
                        </div>
                        <div>
                            <h1 className={`text-3xl font-bold tracking-tight ${themeParams.textNorm}`}>
                                Master Your <span className={themeParams.gradientText}>Movements</span>
                            </h1>
                            <p className={`${themeParams.textMuted} mt-1 font-medium`}>
                                Real-time AI pose analysis mapped to expert templates
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Panel: Exercise List */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <div className={`rounded-3xl p-6 ${themeParams.cardBg} flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className={`text-xl font-bold ${themeParams.textNorm} flex items-center gap-2`}>
                                    <Target className={themeParams.accentText} size={20} />
                                    Regimen Map
                                </h2>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${themeParams.accentBg}`}>
                                    {EXERCISES.length} Activities
                                </span>
                            </div>

                            <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                                {EXERCISES.map(exercise => {
                                    const saved = progress?.exerciseProgress?.[exercise.id];
                                    const isSelected = activeExerciseId === exercise.id;

                                    return (
                                        <div
                                            key={exercise.id}
                                            onClick={() => !isRunning && handleStartExercise(exercise)}
                                            className={`relative group rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                                                isSelected 
                                                    ? `ring-2 ring-pink-500/50 ${isDarkMode ? 'bg-white/[0.08]' : 'bg-pink-50'}` 
                                                    : `${themeParams.cardBg} ${themeParams.cardHover}`
                                            } ${isRunning && !isSelected ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                        >
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="flex-1">
                                                    <h3 className={`font-bold text-lg leading-tight mb-2 ${themeParams.textNorm}`}>
                                                        {exercise.title}
                                                    </h3>
                                                    <p className={`text-sm leading-relaxed ${themeParams.textMuted} mb-4`}>
                                                        {exercise.description}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-sm font-medium">
                                                        <div className="flex items-center gap-1.5 opacity-80">
                                                            <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-pink-500' : 'bg-gray-400'}`} />
                                                            <span className={themeParams.textNorm}>{exercise.passAccuracy}% Target</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 opacity-80">
                                                            <div className={`w-2 h-2 rounded-full ${saved?.bestAccuracy >= exercise.passAccuracy ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                                            <span className={themeParams.textNorm}>Best: {saved?.bestAccuracy || 0}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {saved?.completed && (
                                                    <div className="bg-emerald-500/20 p-2 rounded-full absolute top-4 right-4">
                                                        <CheckCircle2 size={18} className="text-emerald-400" />
                                                    </div>
                                                )}
                                            </div>

                                            {isSelected && isRunning && (
                                                <div className="mt-5 w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 ease-linear"
                                                        style={{ width: `${progressPercent}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Active Session */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className={`rounded-3xl p-6 md:p-8 flex-1 flex flex-col ${themeParams.cardBg} shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative z-10`}>
                            {!activeExercise ? (
                                <div className="flex-1 min-h-[400px] flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-24 h-24 mb-6 rounded-3xl bg-pink-500/10 flex items-center justify-center animate-pulse">
                                        <Activity size={48} className={themeParams.accentText} />
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-3 ${themeParams.textNorm}`}>Initialize a Session</h3>
                                    <p className={`max-w-md ${themeParams.textMuted} leading-relaxed`}>
                                        Select a technique from the regimen map. Our engine aligns your skeletal architecture with expert biometrics in real-time.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col h-full gap-6">
                                    {/* Active Header */}
                                    <div className="flex items-end justify-between border-b border-white/10 pb-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Activity size={16} className={themeParams.accentText} />
                                                <span className={`text-sm uppercase tracking-wider font-bold ${themeParams.accentText}`}>Active Technique</span>
                                            </div>
                                            <h2 className={`text-3xl font-bold ${themeParams.textNorm}`}>{activeExercise.title}</h2>
                                        </div>

                                        <div className="flex flex-col items-end gap-3">
                                            {isRunning ? (
                                                <button
                                                    onClick={handleStopExercise}
                                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/20 text-red-400 font-bold hover:bg-red-500/30 transition-colors"
                                                >
                                                    <RotateCcw size={18} /> Abort Tracking
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleStartExercise(activeExercise)}
                                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold hover:shdow-lg hover:opacity-90 transition-all transform hover:scale-[1.02]"
                                                >
                                                    <Play size={18} className="fill-current" /> Initialize Tracking
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Analytics Bar */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-6">
                                            <div>
                                                <p className={`text-xs uppercase font-bold tracking-wider ${themeParams.textMuted}`}>Real-time Precision</p>
                                                <p className={`text-4xl font-black ${themeParams.gradientText}`}>{currentAccuracy}%</p>
                                            </div>
                                            <div className={`h-12 w-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
                                            <div>
                                                <p className={`text-xs uppercase font-bold tracking-wider ${themeParams.textMuted}`}>Target Benchmark</p>
                                                <p className={`text-xl font-bold ${themeParams.textNorm} mt-1`}>{activeExercise.passAccuracy}%</p>
                                            </div>
                                        </div>
                                        
                                        {modelState === 'loading' && (
                                            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                                <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                                                <span className="text-sm font-semibold tracking-wide">Waking AI Engine...</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Video Feeds */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                        <div className="flex flex-col relative group">
                                            <div className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-md z-10 flex items-center gap-1.5 border border-white/10">
                                                <Info size={12} className="text-blue-400" />
                                                Master Class
                                            </div>
                                            <video
                                                key={`${activeExercise.id}-${activeExercise.demoSrc}`}
                                                src={activeExercise.demoSrc}
                                                autoPlay
                                                controls={!isRunning}
                                                loop
                                                muted
                                                playsInline
                                                className={`w-full aspect-video object-cover rounded-2xl bg-black border ${isDarkMode ? 'border-white/10' : 'border-gray-900'} shadow-md`}
                                            />
                                        </div>

                                        <div className="flex flex-col relative">
                                            <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-md z-10 flex items-center gap-1.5 border border-white/10">
                                                <div className={`w-2 h-2 rounded-full ${isCameraReady ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                                                Live Intel
                                            </div>
                                            <div className={`w-full aspect-video rounded-2xl overflow-hidden bg-[#050505] relative border ${isDarkMode ? 'border-white/10' : 'border-gray-900'} shadow-md`}>
                                                {isCameraReady ? (
                                                    <canvas ref={canvasRef} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                                                            <Camera size={28} className={themeParams.textMuted} />
                                                        </div>
                                                        <p className={`text-sm font-medium ${themeParams.textMuted}`}>Signal offline.</p>
                                                        <p className={`text-xs ${themeParams.textMuted} opacity-70 mt-1`}>Initiate tracking to connect optics pipeline.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notices Area */}
                                    {runtimeError && (
                                        <div className={`mt-4 w-full p-4 rounded-xl border flex items-start gap-3 backdrop-blur-md shadow-lg ${isDarkMode ? 'border-red-500/30 bg-red-500/10 text-red-200' : 'border-red-200 bg-red-50 text-red-700'}`}>
                                            <AlertTriangle size={20} className="shrink-0 text-red-500" />
                                            <div className="flex flex-col">
                                                <span className="font-bold text-red-500">System Alert</span>
                                                <span className="text-sm mt-0.5">{runtimeError}</span>
                                            </div>
                                        </div>
                                    )}

                                    {lastResult?.exerciseId === activeExercise.id && !isRunning && !runtimeError && (
                                        <div className={`mt-4 w-full p-5 rounded-xl border flex items-start gap-4 backdrop-blur-md shadow-lg ${lastResult.passed ? (isDarkMode ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-emerald-200 bg-emerald-50') : (isDarkMode ? 'border-amber-500/40 bg-amber-500/10' : 'border-amber-200 bg-amber-50')}`}>
                                            <div className={`p-2 rounded-full ${lastResult.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                {lastResult.passed ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                <span className={`font-bold text-lg mb-1 ${lastResult.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                    Sequence {lastResult.passed ? 'Validated' : 'Incomplete'}
                                                </span>
                                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                    Final Accuracy Scan: <strong>{lastResult.accuracy}%</strong>. <br/>
                                                    {lastResult.passed 
                                                        ? 'Biometrics matched core reference. Excellent form.' 
                                                        : 'Alignment deviation detected. Recalibrate and initiate sequence again.'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden technical elements */}
            <video ref={demoRef} className="hidden" playsInline muted preload="auto" />
            <video ref={webcamRef} className="hidden" playsInline muted />
        </div>
    );
}
