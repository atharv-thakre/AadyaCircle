import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { getExerciseConfig } from '../../utils/exerciseConfig';

export default function ExerciseResult({ isDarkMode = true, result, onTryAgain, onBack }) {
  const exercise = getExerciseConfig(result.exerciseId);
  const [allResults, setAllResults] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('exerciseHistory') || '[]');
    setAllResults(history);
  }, []);

  if (!exercise || !result) {
    return (
      <div className={`w-full h-full rounded-2xl border p-8 flex items-center justify-center ${
        isDarkMode ? 'border-[#c47ea8]/30 bg-[#0f0f0f]/40' : 'border-[#c47ea8]/20 bg-white/50'
      }`}>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Result data not found</p>
      </div>
    );
  }

  // Prepare chart data
  const performanceData = [
    { name: 'Accuracy', value: result.accuracy, color: '#c47ea8' },
    { name: 'Form Quality', value: result.formScore, color: '#ec4899' },
  ];

  const allResultsData = allResults
    .filter(r => r.exerciseId === result.exerciseId)
    .slice(-7) // Last 7 results
    .map((r, idx) => ({
      name: `Session ${idx + 1}`,
      reps: r.reps,
      accuracy: r.accuracy,
    }));

  // Determine performance rating
  const getRating = () => {
    const combined = (result.accuracy + result.formScore) / 2;
    if (combined >= 80) return { label: 'Excellent', color: '#10b981', emoji: '🌟' };
    if (combined >= 70) return { label: 'Good', color: '#f59e0b', emoji: '👍' };
    if (combined >= 60) return { label: 'Fair', color: '#f97316', emoji: '💪' };
    return { label: 'Keep Trying', color: '#ef4444', emoji: '🎯' };
  };

  const rating = getRating();
  const timestamp = new Date(result.timestamp);
  const formattedTime = timestamp.toLocaleString();

  return (
    <div className={`w-full h-full rounded-2xl border p-6 ${isDarkMode ? 'border-[#c47ea8]/30 bg-[#0f0f0f]/40' : 'border-[#c47ea8]/20 bg-white/50'} backdrop-blur-md overflow-y-auto`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-[#262626] text-gray-400' : 'hover:bg-gray-200 text-gray-600'
          }`}
        >
          <ArrowLeft size={18} />
          Back to Exercises
        </button>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {exercise.name} - Results
        </h1>
        <div />
      </div>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Performance Rating Card */}
        <div className={`rounded-xl border p-6 text-center ${isDarkMode ? 'border-[#c47ea8]/30 bg-[#1a1a1a]/60' : 'border-[#c47ea8]/20 bg-white/80'}`}>
          <p className={`text-5xl mb-3`}>{rating.emoji}</p>
          <p className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {rating.label}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Overall Performance Score: {Math.round((result.accuracy + result.formScore) / 2)}%
          </p>
        </div>

        {/* Key Stats */}
        <div className={`rounded-xl border p-6 ${isDarkMode ? 'border-[#c47ea8]/30 bg-[#1a1a1a]/60' : 'border-[#c47ea8]/20 bg-white/80'}`}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Key Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Repetitions:</span>
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-[#c47ea8]' : 'text-[#c47ea8]'}`}>{result.reps}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Accuracy:</span>
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{result.accuracy}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Form Quality:</span>
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{result.formScore}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Calories Burned:</span>
              <span className={`text-2xl font-bold text-orange-500`}>{result.caloriesBurned}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Duration:</span>
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{result.duration}s</span>
            </div>
            <div className="border-t border-[#c47ea8]/20 pt-3 mt-3">
              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Completed on {formattedTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      {allResultsData.length > 0 && (
        <div className={`rounded-xl border p-6 mb-6 ${isDarkMode ? 'border-[#c47ea8]/30 bg-[#1a1a1a]/60' : 'border-[#c47ea8]/20 bg-white/80'}`}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Performance Trend (Last 7 Sessions)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={allResultsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#262626' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={isDarkMode ? '#888' : '#666'} />
              <YAxis stroke={isDarkMode ? '#888' : '#666'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
                  border: `1px solid ${isDarkMode ? '#c47ea8' : '#c47ea8'}`,
                  borderRadius: '8px',
                }}
                labelStyle={{ color: isDarkMode ? '#fff' : '#000' }}
              />
              <Bar dataKey="reps" fill="#c47ea8" name="Reps" radius={[8, 8, 0, 0]} />
              <Bar dataKey="accuracy" fill="#ec4899" name="Accuracy %" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Performance Breakdown */}
      <div className={`rounded-xl border p-6 mb-6 ${isDarkMode ? 'border-[#c47ea8]/30 bg-[#1a1a1a]/60' : 'border-[#c47ea8]/20 bg-white/80'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Performance Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={performanceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {performanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
                border: `1px solid ${isDarkMode ? '#c47ea8' : '#c47ea8'}`,
                borderRadius: '8px',
              }}
              labelStyle={{ color: isDarkMode ? '#fff' : '#000' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center mb-6">
        <button
          onClick={onTryAgain}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-[#c47ea8] text-white hover:bg-[#b86b9d] transition-all"
        >
          Try Again
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            isDarkMode
              ? 'bg-[#262626] text-white hover:bg-[#333]'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}
        >
          <Download size={18} />
          Save Result
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            isDarkMode
              ? 'bg-[#262626] text-white hover:bg-[#333]'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}
        >
          <Share2 size={18} />
          Share
        </button>
      </div>

      {/* Tips Section */}
      <div className={`rounded-xl border p-6 ${isDarkMode ? 'border-[#c47ea8]/30 bg-[#1a1a1a]/60' : 'border-[#c47ea8]/20 bg-white/80'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Tips for Improvement
        </h3>
        <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <li>✨ Focus on maintaining proper form throughout the exercise</li>
          <li>🎯 Keep your movements consistent and controlled</li>
          <li>⚡ Try to complete more repetitions in the same timeframe</li>
          <li>📹 Ensure good lighting and position the camera properly</li>
          <li>💪 Practice regularly to see improvement in your performance</li>
        </ul>
      </div>
    </div>
  );
}
