import getBucketConfig
from "./getBucketConfig";

export default function generateDailySlots({
  studyHours,
}) {
  const config =
    getBucketConfig(
      studyHours
    );

  const totalMinutes =
    studyHours * 60;

  const revisionMinutes =
    config.revisionMinutes;

  const practiceMinutes =
    config.practiceMinutes;

  const optionalMinutes =
    90;

  const gsMinutes =
    totalMinutes -
    revisionMinutes -
    practiceMinutes -
    optionalMinutes;

  return {
    revisionMinutes,

    practiceMinutes,

    optionalMinutes,

    gsMinutes,
  };
}