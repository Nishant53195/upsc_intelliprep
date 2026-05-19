import {
  MEMORY_STATES,
  REVISION_INTERVALS,
  REVISION_STAGES,
  REVISION_STATUS,
} from "../../constants/revision";
import { buildRevisionTask } from "./buildRevisionTask";

import { getNextRevisionStage } from "./getNextRevisionStage";

import { calculateNextRevisionDate } from "./calculateNextRevisionDate";

import {
  getMemoryStateAfterRevision,
} from "./getMemoryStateAfterRevision";

export function generateNextRevision({
  revision,

  completedTask,

  recallQuality,

  intensityMode = "NORMAL",
}) {
  const nextStage =
    getNextRevisionStage(
      revision.revisionStage
    );

  // D30 completed
  // memory stabilized
  if (!nextStage) {
    return {
      nextRevision: null,
      nextRevisionTask: null,

      memoryState:
        MEMORY_STATES.STABLE,
    };
  }

  const dueDate =
    calculateNextRevisionDate(
      nextStage,
      completedTask.scheduledDate
    );

  const nextRevision =
    buildRevisionTask({
      userId: revision.userId,

      subjectId:
        revision.subjectId,

      topicId:
        revision.topicId,

      subtopicId:
        revision.subtopicId,

      sourceTaskId:
        revision.sourceTaskId,

      linkedScheduleTaskId:
        null,

      revisionStage:
        nextStage,

      dueDate,

      intervalDays:
        REVISION_INTERVALS[
          nextStage
        ],
    });

  nextRevision.revisionCount =
    revision.revisionCount + 1;

 nextRevision.memoryState =
  getMemoryStateAfterRevision(
    nextStage
  );

  const nextRevisionTask =
    buildRevisionTask({
      userId: revision.userId,

      subjectId:
        revision.subjectId,

      topicId:
        revision.topicId,

      subtopicId:
        revision.subtopicId,

      revisionId:
        nextRevision.id,

      scheduledDate:
        dueDate,

      intensityMode,
    });

  nextRevision.linkedScheduleTaskId =
    nextRevisionTask.id;

  return {
    nextRevision,

    nextRevisionTask,

    memoryState:
      MEMORY_STATES.LEARNING,
  };
}