import dayjs from "dayjs";

import {
  getTasksByDate,
  getMissedTasksForRecovery,
  bulkUpdateTasks,
} from "../../db/repositories/scheduleRepository";

import {
  getSubtopicById,
} from "../../db/repositories/syllabusRepository";

import {
  injectRecoveryTasks,
} from "../../engines/scheduler/injectRecoveryTasks";

import {
  TASK_TYPES,
} from "../../constants/scheduler";

import {
  getRevisionById,
} from "../../db/repositories/revisionRepository";

import {
  getRevisionPriority,
} from "../../engines/revision/getRevisionPriority";

export async function fetchTodayTasks() {
  const today =
    dayjs().format(
      "YYYY-MM-DD"
    );

  // 1. Fetch today's tasks
  const todayTasks =
    await getTasksByDate(
      today
    );

  // 2. Fetch recovery candidates
  const missedTasks =
    await getMissedTasksForRecovery();

  // 3. Inject recovery queue
  const executionQueue =
    injectRecoveryTasks({
      todayTasks,
      missedTasks,
      recoveryLimit: 2,
    });

  const injectedRecoveryTasks =
    executionQueue.filter(
      (task) =>
        task.isRecoveryTask &&
        task.recoveryInjectedAt
    );

  if (
    injectedRecoveryTasks.length > 0
  ) {
    await bulkUpdateTasks(
      injectedRecoveryTasks
    );
  }

  // 4. Enrich tasks
  const enrichedTasks =
    await Promise.all(
      executionQueue.map(
        async (task) => {
          const subtopic =
            await getSubtopicById(
              task.subtopicId
            );
            let revision = null;

if (
  task.type ===
    TASK_TYPES.REVISION &&
  task.revisionId
) {
  revision =
    await getRevisionById(
      task.revisionId
    );
}

          return {
  ...task,

  subtopicName:
    subtopic?.name ||
    "Unknown",

  revisionStage:
    revision?.revisionStage ||
    null,

  isRevision:
    task.type ===
    TASK_TYPES.REVISION,

  isStudy:
    task.type ===
    TASK_TYPES.STUDY,

  isRecovery:
    task.type ===
    TASK_TYPES.RECOVERY,
};
        }
      )
    );

enrichedTasks.sort(
  (a, b) => {
    // Revision priority
    if (
      a.isRevision &&
      b.isRevision
    ) {
      return (
        getRevisionPriority(
          a.revisionStage
        ) -
        getRevisionPriority(
          b.revisionStage
        )
      );
    }

    // Study first
    if (a.isStudy) return -1;
    if (b.isStudy) return 1;

    return 0;
  }
);

  return enrichedTasks;
}