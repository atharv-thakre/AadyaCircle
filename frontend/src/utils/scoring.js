export function computeWeightedScore(checks) {
  const validChecks = checks.filter((check) => typeof check.weight === 'number' && check.weight > 0);
  if (!validChecks.length) {
    return { score: 0, failedMessages: ['Unable to score current frame.'] };
  }

  const totalWeight = validChecks.reduce((sum, check) => sum + check.weight, 0);
  const passedWeight = validChecks.reduce((sum, check) => (check.ok ? sum + check.weight : sum), 0);

  const score = Math.round((passedWeight / totalWeight) * 100);
  const failedMessages = validChecks.filter((check) => !check.ok).map((check) => check.message);

  return {
    score,
    failedMessages,
  };
}
