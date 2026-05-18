import {
  REVISION_INTERVALS,
  REVISION_STAGES,
} from "../../constants/revision";

import { buildRevision } from "./buildRevision";
import { buildRevisionTask } from "./buildRevisionTask";
import { calculateNextRevisionDate } from "./calculateNextRevisionDate";

export function generateInitialRevision({
  completedTask,

  intensityMode = "NORMAL",
}) {
  const revisionStage = REVISION_STAGES.D3;

  const dueDate = calculateNextRevisionDate(
    revisionStage,
    completedTask.scheduledDate
  );

  const revision = buildRevision({
    userId: completedTask.userId,

    subjectId: completedTask.subjectId,
    topicId: completedTask.topicId,
    subtopicId: completedTask.subtopicId,

    sourceTaskId: completedTask.id,
    linkedScheduleTaskId: null,

    revisionStage,

    dueDate,

    intervalDays:
      REVISION_INTERVALS[revisionStage],
  });

  const revisionTask = buildRevisionTask({
    userId: completedTask.userId,

    subjectId: completedTask.subjectId,
    topicId: completedTask.topicId,
    subtopicId: completedTask.subtopicId,

    revisionId: revision.id,

    scheduledDate: dueDate,

    intensityMode,
  });

  revision.linkedScheduleTaskId =
    revisionTask.id;

  return {
    revision,
    revisionTask,
  };
}