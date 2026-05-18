import dayjs from "dayjs";

import {
  TASK_GENERATION_TYPES,
  TASK_SOURCE_TYPES,
  TASK_STATUS,
  TASK_TYPES,
} from "../../constants/scheduler";

import { buildTaskMetadata } from "../scheduler/buildTaskMetadata";

export function buildRevisionTask({
  userId,

  subjectId,
  topicId,
  subtopicId,

  revisionId,

  scheduledDate,

  estimatedMinutes = 30,

  intensityMode = "NORMAL",
}) {
  const baseTask = {
    userId,

    subjectId,
    topicId,
    subtopicId,

    revisionId,

    type: TASK_TYPES.REVISION,

    scheduledDate,

    estimatedMinutes,

    actualMinutes: 0,

    intensityMode,
  };

  return {
    ...baseTask,

    ...buildTaskMetadata({
      status: TASK_STATUS.PENDING,

      generationType:
        TASK_GENERATION_TYPES.REVISION,

      sourceType:
        TASK_SOURCE_TYPES.REVISION,

      priorityScore: 0,

      carryForwardCount: 0,

      orderIndex: dayjs().valueOf(),

      isRecoveryTask: false,

      originalScheduledDate:
        scheduledDate,
    }),
  };
}