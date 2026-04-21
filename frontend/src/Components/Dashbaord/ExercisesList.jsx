import React, { useState } from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { getAllExercises } from '../../utils/exerciseConfig';

export default function ExercisesList({ isDarkMode = true, onSelectExercise }) {
  const exercises = getAllExercises();

  return (
    <div className={`w-full h-full rounded-2xl border p-8 ${isDarkMode ? 'border-[#c47ea8]/30 bg-[#0f0f0f]/40' : 'border-[#c47ea8]/20 bg-white/50'} backdrop-blur-md`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Activity size={28} className="text-[#c47ea8]" />
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Exercises
          </h1>
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Select an exercise and perform it for the recommended duration. Real-time feedback will help you improve.
        </p>
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => onSelectExercise(exercise.id)}
            className={`group cursor-pointer rounded-xl border p-6 transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? 'border-[#c47ea8]/30 bg-[#1a1a1a]/60 hover:border-[#c47ea8]/60 hover:bg-[#1a1a1a]/80 shadow-lg hover:shadow-[#c47ea8]/30'
                : 'border-[#c47ea8]/20 bg-white/80 hover:border-[#c47ea8]/60 hover:bg-white shadow-md hover:shadow-[#c47ea8]/20'
            }`}
          >
            {/* Thumbnail */}
            <div className={`text-6xl mb-4 text-center p-4 rounded-lg ${isDarkMode ? 'bg-[#c47ea8]/10' : 'bg-[#c47ea8]/5'}`}>
              {exercise.thumbnail}
            </div>

            {/* Title and Difficulty */}
            <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {exercise.name}
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                isDarkMode
                  ? 'bg-[#c47ea8]/20 text-[#c47ea8]'
                  : 'bg-[#c47ea8]/15 text-[#c47ea8]'
              }`}>
                {exercise.difficulty}
              </span>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {exercise.duration}s
              </span>
            </div>

            {/* Description */}
            <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {exercise.description}
            </p>

            {/* Muscles Targeted */}
            <div className="flex flex-wrap gap-1 mb-4">
              {exercise.muscles.map((muscle) => (
                <span
                  key={muscle}
                  className={`text-xs px-2 py-1 rounded ${
                    isDarkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Estimated Reps */}
            <p className={`text-xs mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Est. {exercise.estimatedReps}
            </p>

            {/* Start Button */}
            <button className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-all ${
              isDarkMode
                ? 'bg-[#c47ea8] text-white hover:bg-[#b86b9d] shadow-lg'
                : 'bg-[#c47ea8] text-white hover:bg-[#b86b9d] shadow-md'
            }`}>
              Start Exercise
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {exercises.length === 0 && (
        <div className={`flex flex-col items-center justify-center py-12 rounded-lg border-2 border-dashed ${isDarkMode ? 'border-[#c47ea8]/20' : 'border-[#c47ea8]/15'}`}>
          <Activity size={48} className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} />
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No exercises available
          </p>
        </div>
      )}
    </div>
  );
}
