export function updateRepCounter(previousPhase, currentPhase, previousReps) {
  const normalizedPrev = previousPhase || 'up';
  const normalizedCurr = currentPhase || normalizedPrev;

  const incremented = normalizedPrev === 'down' && normalizedCurr === 'up';
  const repCount = incremented ? previousReps + 1 : previousReps;

  return {
    phase: normalizedCurr,
    repCount,
    incremented,
  };
}
