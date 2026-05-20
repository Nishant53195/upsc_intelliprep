export default function weeklyOptionalAllocator({
  scheduledOptionalMinutes,

  targetOptionalMinutes,
}) {
  return (
    scheduledOptionalMinutes <
    targetOptionalMinutes
  );
}