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
    thumbnail: '🤸', // emoji placeholder
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
