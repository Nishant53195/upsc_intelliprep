import dayjs from "dayjs";

import {
  TASK_STATUS,
  TASK_TYPES,
} from "../../constants/scheduler";

export function detectMissedTasks(
  tasks = []
) {
  const today =
    dayjs().format(
      "YYYY-MM-DD"
    );

  return tasks.map((task) => {
    const isMissed =
      task.status ===
        TASK_STATUS.PENDING &&
      task.scheduledDate <
        today;

    if (!isMissed) {
      return task;
    }

    // Revision lifecycle
    if (
      task.type ===
      TASK_TYPES.REVISION
    ) {
      return {
        ...task,

        status:
          TASK_STATUS.MISSED,

        isRecoveryTask: true,
      };
    }

    // Study / Recovery / Others
    return {
      ...task,

      status:
        TASK_STATUS.MISSED,

      isRecoveryTask: true,
    };
  });
}