import { updateTask } from "../../db/repositories/scheduleRepository";

import { updateTaskLifecycle } from "../../engines/scheduler/updateTaskLifecycle";

import {
  TASK_STATUS,
  TASK_TYPES,
} from "../../constants/scheduler";

import {
  RECALL_QUALITY,
} from "../../constants/revision";

import { generateInitialRevision } from "../../engines/revision/generateInitialRevision";

import {
  completeRevision,
} from "../revision/completeRevision";

import { createRevision } from "../revision/createRevision";

import {
  getRevisionById,
} from "../../db/repositories/revisionRepository";

import {
  getRevisionsBySubtopic,
} from "../../db/repositories/revisionRepository";

import {
  updateRevision,
} from "../../db/repositories/revisionRepository";

import {
  REVISION_STAGES,
} from "../../constants/revision";

export async function updateTaskStatus(
  task,
  newStatus,
  recallQuality = null
) {
  // 1. Lifecycle update
  const updatedTask =
    updateTaskLifecycle({
      task,
      newStatus,
    });

  // 2. Persist lifecycle
  await updateTask(
    task.id,
    updatedTask
  );

  if (
  updatedTask.type ===
    TASK_TYPES.REVISION &&
  updatedTask.revisionId
) {
  await updateRevision(
    updatedTask.revisionId,
    {
      status:
        updatedTask.status,
    }
  );
}

  // -----------------------------------
  // STUDY TASK COMPLETION
  // Generate first D3 revision
  // -----------------------------------

  const shouldGenerateRevision =
  updatedTask.type ===
    TASK_TYPES.STUDY &&
  updatedTask.status ===
    TASK_STATUS.COMPLETED;

if (shouldGenerateRevision) {
  const existingRevisions =
    await getRevisionsBySubtopic(
      updatedTask.subtopicId
    );

  const alreadyInitialized =
    existingRevisions.some(
      (revision) =>
        revision.revisionStage ===
        REVISION_STAGES.D3
    );

  if (!alreadyInitialized) {
    const {
      revision,
      revisionTask,
    } =
      generateInitialRevision({
        completedTask:
          updatedTask,

        intensityMode:
          updatedTask.intensityMode,
      });

    await createRevision({
      revision,
      revisionTask,
    });
  }
}

  // -----------------------------------
  // REVISION TASK COMPLETION
  // Generate next revision stage
  // -----------------------------------

  const shouldCompleteRevision =
    updatedTask.type ===
      TASK_TYPES.REVISION &&
    updatedTask.status ===
      TASK_STATUS.COMPLETED &&
    updatedTask.revisionId;

  if (shouldCompleteRevision) {
    const revision =
      await getRevisionById(
        updatedTask.revisionId
      );

    if (revision) {
      await completeRevision({
        revision,

        completedTask:
          updatedTask,

        recallQuality:
  recallQuality ||
  RECALL_QUALITY.GOOD,

        intensityMode:
          updatedTask.intensityMode,
      });
    }
  }

  return updatedTask;
}