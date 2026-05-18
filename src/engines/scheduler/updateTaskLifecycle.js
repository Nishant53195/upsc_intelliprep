import dayjs from "dayjs";

import {
  TASK_STATUS,
} from "../../constants/scheduler";

export function updateTaskLifecycle({
  task,
  nextStatus,
}) {
  const updatedTask = {
    ...task,
    status: nextStatus,
  };

  // Completion timestamp
  if (
    nextStatus ===
    TASK_STATUS.COMPLETED
  ) {
    updatedTask.completedAt =
      dayjs().toISOString();
  }

  // Missed task handling
  if (
    nextStatus ===
    TASK_STATUS.MISSED
  ) {
    updatedTask.isRecoveryTask =
      true;
  }

  return updatedTask;
}