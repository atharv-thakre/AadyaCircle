/**
 * Exercise configuration - Define all available exercises here
 * This makes it easy to add more exercises in the future
 */

export const EXERCISES = {
  jumping_jacks: {
    id: 'jumping_jacks',
    name: 'Jumping Jacks',
    duration: 30, // seconds
    difficulty: 'Easy',
    videoUrl: 'https://www.youtube.com/embed/XR0xeuK5zBU',
    description: 'Jump with arms up and legs apart. Keep moving for 30 seconds.',
    instructions: [
      'Stand with feet together, arms at sides',
      'Jump while spreading legs and raising arms above head',
      'Return to starting position',
      'Repeat continuously for 30 seconds',
    ],
    caloriesPerRep: 0.5,
    estimatedReps: '15-25 reps',
    muscles: ['Legs', 'Arms', 'Cardio'],
    thumbnail: '🤸',
  },
  squats: {
    id: 'squats',
    name: 'Squats',
    duration: 30,
    difficulty: 'Medium',
    videoUrl: 'https://www.youtube.com/embed/aclHkVaku9U',
    description: 'Lower your hips and stand back up. Keep your back straight.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your hips as if sitting in a chair',
      'Keep your chest up and knees behind toes',
      'Push through heels to stand back up',
    ],
    caloriesPerRep: 0.6,
    estimatedReps: '12-18 reps',
    muscles: ['Glutes', 'Quads', 'Hamstrings'],
    thumbnail: '🏋️',
  },
  push_ups: {
    id: 'push_ups',
    name: 'Push-ups',
    duration: 30,
    difficulty: 'Hard',
    videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4',
    description: 'Lower your body using your arms and push back up.',
    instructions: [
      'Start in a high plank position',
      'Lower your chest toward the floor',
      'Keep your elbows at a 45-degree angle',
      'Push back up to the starting position',
    ],
    caloriesPerRep: 0.8,
    estimatedReps: '10-20 reps',
    muscles: ['Chest', 'Triceps', 'Shoulders'],
    thumbnail: '💪',
  },
  lunges: {
    id: 'lunges',
    name: 'Lunges',
    duration: 30,
    difficulty: 'Medium',
    videoUrl: 'https://www.youtube.com/embed/QOVaHwm-Q6U',
    description: 'Step forward and lower your hips until both knees are bent.',
    instructions: [
      'Stand tall with feet hip-width apart',
      'Step forward with one leg and lower hips',
      'Both knees should be at 90-degree angles',
      'Push back to starting position and switch legs',
    ],
    caloriesPerRep: 0.4,
    estimatedReps: '10-14 reps',
    muscles: ['Quads', 'Glutes', 'Hamstrings'],
    thumbnail: '🦵',
  },
  plank: {
    id: 'plank',
    name: 'Plank',
    duration: 30,
    difficulty: 'Medium',
    videoUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw',
    description: 'Hold a push-up position on your forearms.',
    instructions: [
      'Rest your weight on your forearms and toes',
      'Keep your body in a straight line',
      'Engage your core and squeeze your glutes',
      'Hold the position for the full duration',
    ],
    caloriesPerRep: 0, // Duration based
    estimatedReps: 'Hold for 30s',
    muscles: ['Core', 'Shoulders', 'Back'],
    thumbnail: '🧘',
  },
  high_knees: {
    id: 'high_knees',
    name: 'High Knees',
    duration: 30,
    difficulty: 'Hard',
    videoUrl: 'https://www.youtube.com/embed/8opcQdC-V-U',
    description: 'Run in place while lifting your knees high.',
    instructions: [
      'Stand with feet hip-width apart',
      'Drive one knee up toward your chest',
      'Switch legs quickly as if running in place',
      'Keep your core engaged and back straight',
    ],
    caloriesPerRep: 0.3,
    estimatedReps: '40-60 knees',
    muscles: ['Cardio', 'Legs', 'Core'],
    thumbnail: '🏃',
  },
  crunches: {
    id: 'crunches',
    name: 'Crunches',
    duration: 30,
    difficulty: 'Easy',
    videoUrl: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
    description: 'Lie on your back and lift your shoulders toward your knees.',
    instructions: [
      'Lie on your back with knees bent and feet flat',
      'Place hands behind head or across chest',
      'Lift shoulders off the floor while exhaling',
      'Lower back down and repeat',
    ],
    caloriesPerRep: 0.2,
    estimatedReps: '15-20 reps',
    muscles: ['Abs', 'Core'],
    thumbnail: '🤸‍♀️',
  },
};

/**
 * Get exercise configuration by ID
 * @param {string} exerciseId
 * @returns {Object} Exercise config object
 */
export function getExerciseConfig(exerciseId) {
  return EXERCISES[exerciseId] || null;
}

/**
 * Get all available exercises
 * @returns {Array} Array of exercise configs
 */
export function getAllExercises() {
  return Object.values(EXERCISES);
}

/**
 * Get exercise by name
 * @param {string} name
 * @returns {Object} Exercise config or null
 */
export function getExerciseByName(name) {
  return Object.values(EXERCISES).find(ex => ex.name === name) || null;
}

export default EXERCISES;
