import { saveTasks } from "../../db/repositories/scheduleRepository";

import { generateInitialTasks } from "../../engines/scheduler/generateInitialTasks";

export async function initializeSchedule(
  subtopics,
  userId
) {
  const tasks =
    generateInitialTasks(
      subtopics,
      userId
    );

  await saveTasks(tasks);
}