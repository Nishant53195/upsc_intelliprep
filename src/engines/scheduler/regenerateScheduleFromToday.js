import dayjs from "dayjs";

import {
  deleteTasksAfterDate,
  bulkUpdateTasks,
} from "../../db/repositories/scheduleRepository";

import {
  getSubjects,
  getTopicsBySubject,
} from "../../db/repositories/syllabusRepository";

import { getMissedTasks }
  from "./getMissedTasks";

import { getRemainingSubtopics }
  from "./getRemainingSubtopics";

import { distributeTasks } from "./distributeTasks.js";

import { deduplicateTasks }
  from "./deduplicateTasks";

import {
  calculateDailyCapacity,
} from "./calculateDailyCapacity";

export async function regenerateScheduleFromToday({
  userId,
   intensityMode = "NORMAL",
}) {
  const today =
    dayjs().format(
      "YYYY-MM-DD"
    );

  // 1. Recovery Tasks
  const missedTasks =
    await getMissedTasks();

  // 2. Adaptive Capacity
  const adaptiveCapacity =
  calculateDailyCapacity({
    intensityMode,

    recoveryTaskCount:
      missedTasks.length,
  });
  // 3. Remove Future Schedule
  await deleteTasksAfterDate(
    today
  );

  // 4. Load Full Syllabus
  const subjects =
    await getSubjects();

  const allTopics = [];

  for (const subject of subjects) {
    const topics =
      await getTopicsBySubject(
        subject.id
      );

    allTopics.push(...topics);
  }

  // 5. Detect Remaining Units
  const remainingSubtopics =
    await getRemainingSubtopics(
      allTopics
    );

  // 6. Redistribute Remaining Work
  const regeneratedTasks =
    distributeTasks({
      subtopics:
        remainingSubtopics,

      userId,

      startDate: today,

      dailyCapacity:
        adaptiveCapacity,
    });

  // 7. Merge Recovery + New Tasks
  const mergedTasks = [
    ...missedTasks,
    ...regeneratedTasks,
  ];

  // 8. Deduplicate
  const finalTasks =
    deduplicateTasks(
      mergedTasks
    );

  // 9. Persist
  await bulkUpdateTasks(
    finalTasks
  );

  return {
    regenerated: true,

    adaptiveCapacity,

    recoveredTasks:
      missedTasks.length,

    regeneratedTasks:
      regeneratedTasks.length,

    totalTasks:
      finalTasks.length,
  };
}