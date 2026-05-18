import { saveTasks } from "../../db/repositories/scheduleRepository";
import dayjs from "dayjs";
import { generateInitialTasks } from "../../engines/scheduler/generateInitialTasks";
import { distributeTasks } from "../../engines/scheduler/distributeTasks.js";
export async function initializeSchedule(
  subtopics,
  userId
) {
  const tasks =
  distributeTasks({
    subtopics,
    userId,
    startDate: dayjs().format("YYYY-MM-DD"),
    dailyCapacity: 300,
  });

  await saveTasks(tasks);
}