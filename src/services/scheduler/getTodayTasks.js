import dayjs from "dayjs";

import { getTasksByDate } from "../../db/repositories/scheduleRepository";

import { getSubtopicById } from "../../db/repositories/syllabusRepository";

export async function fetchTodayTasks() {
  const today =
    dayjs().format(
      "YYYY-MM-DD"
    );

  const tasks =
    await getTasksByDate(
      today
    );

  const enrichedTasks =
    await Promise.all(
      tasks.map(
        async (task) => {
          const subtopic =
            await getSubtopicById(
              task.subtopicId
            );

          return {
            ...task,

            subtopicName:
              subtopic?.name ||
              "Unknown",
          };
        }
      )
    );

  return enrichedTasks;
}