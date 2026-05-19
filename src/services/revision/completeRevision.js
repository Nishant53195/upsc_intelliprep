import dayjs from "dayjs";

import {
  MEMORY_STATES,
  REVISION_STATUS,
} from "../../constants/revision";

import {
  saveRevision,
  updateRevision,
} from "../../db/repositories/revisionRepository";

import { saveTasks } from "../../db/repositories/scheduleRepository";

import { generateNextRevision } from "../../engines/revision/generateNextRevision";

import {
  getRevisionById,
} from "../../db/repositories/revisionRepository";

import {
  getMemoryStateFromRecall,
} from "../../engines/revision/getMemoryStateFromRecall";

export async function completeRevision({
  revision,

  completedTask,

  recallQuality,

  intensityMode = "NORMAL",
}) {
    const latestRevision =
  await getRevisionById(
    revision.id
  );

if (
  !latestRevision ||
  latestRevision.status ===
    REVISION_STATUS.COMPLETED
) {
  return null;
}
  // 1. Mark current revision completed

  const memoryState =
  getMemoryStateFromRecall(
    recallQuality
  );

  await updateRevision(
    revision.id,
    {
      status:
        REVISION_STATUS.COMPLETED,

      completedAt:
        dayjs().format(),

      recallQuality,

      memoryState: nextMemoryState,
    }
  );

  // 2. Generate next stage
 const {
  nextRevision,
  nextRevisionTask,
  memoryState: nextMemoryState,
} = generateNextRevision({
    revision,

    completedTask,

    recallQuality,

    intensityMode,
  });

  // 3. D30 completed
  // lifecycle finished
  if (!nextRevision) {
    await updateRevision(
      revision.id,
      {
        memoryState,
      }
    );

    return null;
  }

  // 4. Persist next revision
  await saveRevision(
    nextRevision
  );

  // 5. Persist next revision task
  await saveTasks([
    nextRevisionTask,
  ]);

  return {
    nextRevision,
    nextRevisionTask,
  };
}