import {
  getPendingTasks,
  bulkUpdateTasks,
} from "../../db/repositories/scheduleRepository";

import {
  detectMissedTasks,
} from "../../engines/scheduler/detectMissedTasks";

export async function processMissedTasks() {
  // 1. Load pending tasks
  const pendingTasks =
    await getPendingTasks();

  // 2. Detect missed tasks
  const updatedTasks =
    detectMissedTasks(
      pendingTasks
    );

  // 3. Persist updates
  await bulkUpdateTasks(
    updatedTasks
  );

  return updatedTasks;
}