import dayjs from "dayjs";

import {
  REVISION_INTERVALS,
} from "../../constants/revision";

export function calculateNextRevisionDate(
  stage,
  fromDate
) {
  const interval =
    REVISION_INTERVALS[stage];

  if (!interval) {
    return null;
  }

  return dayjs(fromDate)
    .add(interval, "day")
    .format("YYYY-MM-DD");
}