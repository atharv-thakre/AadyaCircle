import React, { useState } from 'react';
import ExercisesList from './ExercisesList';
import ExercisePerformer from './ExercisePerformer';
import ExerciseResult from './ExerciseResult';

/**
 * Exercise Router Component
 * Manages navigation between:
 * 1. ExercisesList (select exercise)
 * 2. ExercisePerformer (perform exercise)
 * 3. ExerciseResult (view results)
 */
export default function Exercise({ isDarkMode = true }) {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'performer', 'result'
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [exerciseResult, setExerciseResult] = useState(null);

  const handleSelectExercise = (exerciseId) => {
    setSelectedExerciseId(exerciseId);
    setCurrentView('performer');
  };

  const handleBack = () => {
    setCurrentView('list');
    setSelectedExerciseId(null);
  };

  const handleComplete = (result) => {
    setExerciseResult(result);
    setCurrentView('result');
  };

  const handleTryAgain = () => {
    setCurrentView('performer');
  };

  const handleBackToExercises = () => {
    setCurrentView('list');
    setSelectedExerciseId(null);
    setExerciseResult(null);
  };

  return (
    <div className="w-full h-full">
      {currentView === 'list' && (
        <ExercisesList isDarkMode={isDarkMode} onSelectExercise={handleSelectExercise} />
      )}

      {currentView === 'performer' && (
        <ExercisePerformer
          isDarkMode={isDarkMode}
          exerciseId={selectedExerciseId}
          onBack={handleBack}
          onComplete={handleComplete}
        />
      )}

      {currentView === 'result' && (
        <ExerciseResult
          isDarkMode={isDarkMode}
          result={exerciseResult}
          onTryAgain={handleTryAgain}
          onBack={handleBackToExercises}
        />
      )}
    </div>
  );
}
