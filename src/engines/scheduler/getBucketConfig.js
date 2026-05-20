import {
  DAILY_BUCKET_CONFIG,
} from "../../constants/scheduler";

export default function getBucketConfig(
  studyHours
) {
  return (
    DAILY_BUCKET_CONFIG[
      studyHours
    ] ||
    DAILY_BUCKET_CONFIG[6]
  );
}