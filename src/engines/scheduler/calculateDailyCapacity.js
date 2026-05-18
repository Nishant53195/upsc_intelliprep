export function calculateDailyCapacity({
  intensityMode = "NORMAL",
  recoveryTaskCount = 0,
}) {
  let baseCapacity = 300;

  // Intensity adjustment
  if (intensityMode === "LIGHT") {
    baseCapacity = 180;
  }

  if (intensityMode === "HEAVY") {
    baseCapacity = 420;
  }

  // Recovery workload penalty
  const recoveryPenalty =
    recoveryTaskCount * 20;

  const adjustedCapacity =
    baseCapacity -
    recoveryPenalty;

  // Prevent impossible schedules
  return Math.max(
    adjustedCapacity,
    120
  );
}