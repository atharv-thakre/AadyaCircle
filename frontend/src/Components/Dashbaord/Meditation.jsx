import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  Wind,
  CloudRain,
  Trees,
  Waves,
  Calendar,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
  Heart,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const SOUNDS = [
  { id: "rain", name: "Soft Rain", icon: <CloudRain size={20} />, color: "from-blue-400 to-blue-600" },
  { id: "forest", name: "Forest", icon: <Trees size={20} />, color: "from-green-400 to-green-600" },
  { id: "waves", name: "Ocean", icon: <Waves size={20} />, color: "from-teal-400 to-teal-600" },
  { id: "white", name: "White Noise", icon: <Wind size={20} />, color: "from-gray-400 to-gray-600" },
];

const SESSION_HISTORY = [
  { date: "Oct 20", duration: "10m", type: "Productivity", mood: "Focused" },
  { date: "Oct 19", duration: "15m", type: "Sleep", mood: "Peaceful" },
  { date: "Oct 18", duration: "5m", type: "Morning", mood: "Energized" },
];

const WEEKLY_DATA = [
  { day: "Mon", mins: 15 },
  { day: "Tue", mins: 25 },
  { day: "Wed", mins: 10 },
  { day: "Thu", mins: 30 },
  { day: "Fri", mins: 20 },
  { day: "Sat", mins: 45 },
  { day: "Sun", mins: 15 },
];

export default function Meditation({ isDarkMode }) {
  const [timeLeft, setTimeLeft] = useState(600); // Default 10 mins
  const [isActive, setIsActive] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [selectedSound, setSelectedSound] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [totalMins, setTotalMins] = useState(1450); // Total mock minutes
  const [streak, setStreak] = useState(12); // Mock streak
  const [breathState, setBreathState] = useState("Inhale"); // Inhale, Hold, Exhale

  const timerRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      completeSession();
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  // Breathing animation logic
  useEffect(() => {
    if (isActive) {
      const breathInterval = setInterval(() => {
        setBreathState((prev) => {
          if (prev === "Inhale") return "Hold";
          if (prev === "Hold") return "Exhale";
          return "Inhale";
        });
      }, 4000);
      return () => clearInterval(breathInterval);
    }
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    setSessionStarted(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(600);
    setSessionStarted(false);
  };

  const completeSession = () => {
    setIsActive(false);
    setShowSummary(true);
    setTotalMins(prev => prev + 10);
    setStreak(prev => prev + 1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col xl:flex-row gap-8 no-scrollbar">
      
      {/* LEFT PANEL: ZEN TIMER */}
      <div className={`flex-1 flex flex-col items-center justify-center rounded-[3rem] p-10 relative overflow-hidden transition-all duration-700 ${
        isDarkMode ? 'bg-[#111111]/40 border border-white/5' : 'bg-white/40 border border-[#c47ea8]/20'
      } backdrop-blur-3xl shadow-2xl`}>
        
        {/* Animated Background Glow */}
        <motion.div 
          animate={{
            scale: isActive ? [1, 1.2, 1] : 1,
            opacity: isActive ? [0.1, 0.2, 0.1] : 0.05,
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-[#c47ea8] via-purple-500 to-teal-400 blur-[100px] pointer-events-none" 
        />

        {/* Timer UI */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            animate={{ scale: isActive ? [0.98, 1.02, 0.98] : 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-80 h-80 rounded-full border-2 border-white/10 flex items-center justify-center relative shadow-2xl"
          >
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="160" cy="160" r="150"
                fill="none"
                stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(196,126,168,0.1)"}
                strokeWidth="4"
              />
              <motion.circle
                initial={{ strokeDasharray: "942", strokeDashoffset: "942" }}
                animate={{ strokeDashoffset: 942 - (timeLeft / 600) * 942 }}
                cx="160" cy="160" r="150"
                fill="none"
                stroke="url(#timerGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                transition={{ duration: 1, ease: "linear" }}
              />
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c47ea8" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isActive ? breathState : "idle"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm font-bold uppercase tracking-[0.3em] text-[#c47ea8] mb-2"
                >
                  {isActive ? breathState : "Mindful"}
                </motion.div>
              </AnimatePresence>
              <h1 className="text-7xl font-bold font-serif italic tracking-tighter">
                {formatTime(timeLeft)}
              </h1>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="mt-12 flex items-center gap-6">
            <button 
              onClick={resetTimer}
              className={`p-4 rounded-full transition-all active:scale-90 ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}>
              <RotateCcw size={24} className="opacity-50" />
            </button>
            <button 
              onClick={toggleTimer}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c47ea8] to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-[#c47ea8]/30 hover:scale-105 active:scale-95 transition-all">
              {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </button>
            <button className={`p-4 rounded-full transition-all active:scale-90 ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}>
              <Sparkles size={24} className="opacity-50" />
            </button>
          </div>
        </div>

        {/* Sound Selection Overlay */}
        <div className="mt-16 w-full max-w-sm">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Soundscape</h3>
            <span className="text-[10px] bg-[#c47ea8]/10 text-[#c47ea8] px-2 py-0.5 rounded-full font-bold">New</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {SOUNDS.map((sound) => (
              <button
                key={sound.id}
                onClick={() => setSelectedSound(sound.id)}
                className={`p-4 rounded-2xl flex items-center justify-center transition-all ${
                  selectedSound === sound.id 
                    ? `bg-gradient-to-br ${sound.color} text-white shadow-lg scale-110` 
                    : isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-black/5 hover:bg-black/10 text-gray-500'
                }`}
              >
                {sound.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: ANALYSIS & TRACKER */}
      <div className="w-full xl:w-[450px] flex flex-col gap-8 no-scrollbar">
        
        {/* STATS OVERVIEW */}
        <div className={`p-8 rounded-[3rem] transition-all duration-700 ${
          isDarkMode ? 'bg-[#111111]/40' : 'bg-white/40'
        } backdrop-blur-xl border border-white/5`}>
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="text-[#c47ea8]" size={20} />
            <h3 className="text-sm font-bold uppercase tracking-widest">Mindfulness Analytics</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#c47ea8]">
                <Zap size={14} />
                <span className="text-xs font-bold">Current Streak</span>
              </div>
              <p className="text-3xl font-bold font-serif italic">{streak} Days</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-teal-400">
                <TrendingUp size={14} />
                <span className="text-xs font-bold">Monthly Focus</span>
              </div>
              <p className="text-3xl font-bold font-serif italic">+24%</p>
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="mt-10 h-32 flex items-end justify-between gap-2 px-2">
            {WEEKLY_DATA.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group gap-2">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.mins / 45) * 100}%` }}
                  className={`w-full rounded-t-lg transition-all ${
                    data.day === "Sat" ? 'bg-gradient-to-t from-[#c47ea8] to-purple-500' : 'bg-white/10 group-hover:bg-white/20'
                  }`} 
                />
                <span className="text-[9px] font-bold opacity-30 uppercase">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT JOURNEY */}
        <div className={`p-8 rounded-[3rem] flex-1 transition-all duration-700 ${
          isDarkMode ? 'bg-[#111111]/40' : 'bg-white/40'
        } backdrop-blur-xl border border-white/5`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Clock className="text-[#c47ea8]" size={20} />
              <h3 className="text-sm font-bold uppercase tracking-widest">Recent Sessions</h3>
            </div>
            <button className="text-[10px] font-bold text-[#c47ea8] hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {SESSION_HISTORY.map((session, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 5 }}
                className={`p-4 rounded-3xl flex items-center justify-between group cursor-pointer ${
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    isDarkMode ? 'bg-white/5 text-[#c47ea8]' : 'bg-[#c47ea8]/10 text-[#c47ea8]'
                  }`}>
                    <Heart size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{session.type} Flow</h4>
                    <p className="text-[10px] opacity-40 font-bold uppercase tracking-tighter">{session.date} &middot; {session.mood}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold opacity-60">{session.duration}</span>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className={`mt-10 p-6 rounded-[2rem] relative overflow-hidden group border ${
            isDarkMode ? 'bg-white/5 border-white/5' : 'bg-[#c47ea8]/5 border-[#c47ea8]/10'
          }`}>
            <Sparkles className="absolute top-4 right-4 text-[#c47ea8] opacity-20 group-hover:rotate-12 transition-transform" size={40} />
            <h4 className="text-sm font-bold mb-2 italic serif">Personal Growth</h4>
            <p className="text-[11px] leading-relaxed opacity-60">You've reached <span className="text-[#c47ea8] font-bold">{totalMins} minutes</span> of deep mindfulness this year. Amazing progress!</p>
          </div>
        </div>
      </div>

      {/* SUMMARY MODAL (Optional) */}
      <AnimatePresence>
        {showSummary && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={`w-full max-w-sm rounded-[3rem] p-10 text-center ${isDarkMode ? 'bg-[#0f0f0f] border border-white/10' : 'bg-white border-transparent shadow-2xl'}`}
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-2xl shadow-green-500/20">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold font-serif italic mb-2">Session Complete</h2>
              <p className="text-sm opacity-50 mb-8 leading-relaxed">You've successfully completed 10 minutes of meditation. Your mind feels clearer.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className={`p-4 rounded-3xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <p className="text-[10px] font-bold uppercase opacity-40">Mins Gained</p>
                  <p className="text-xl font-bold text-[#c47ea8]">+10</p>
                </div>
                <div className={`p-4 rounded-3xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <p className="text-[10px] font-bold uppercase opacity-40">Streak</p>
                  <p className="text-xl font-bold text-teal-400">{streak}</p>
                </div>
              </div>

              <button 
                onClick={() => setShowSummary(false)}
                className="w-full py-4 rounded-full bg-[#c47ea8] text-white font-bold hover:bg-[#a9668e] transition-all"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
