import { getMissedTasks as getMissedTasksFromDB }
  from "../../db/repositories/scheduleRepository";

export async function getMissedTasks() {
  const missedTasks =
    await getMissedTasksFromDB();

  return missedTasks.map((task) => ({
    ...task,

    isRecoveryTask: true,

    carryForwardCount:
      (task.carryForwardCount || 0) + 1,
  }));
}