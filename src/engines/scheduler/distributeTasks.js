import dayjs from "dayjs";

import {
  TASK_TYPES,
} from "../../constants/scheduler";

import { buildTaskMetadata }
  from "./buildTaskMetadata";

export function distributeTasks({
  subtopics = [],
  userId,
  startDate,
  dailyCapacity = 300,
}) {
  const generatedTasks = [];

  let currentDate =
    dayjs(startDate);

  let usedCapacity = 0;

  subtopics.forEach(
    (subtopic, index) => {
      const estimatedMinutes =
        subtopic.estimatedMinutes || 60;

      if (
        usedCapacity +
          estimatedMinutes >
        dailyCapacity
      ) {
        currentDate =
          currentDate.add(1, "day");

        usedCapacity = 0;
      }

      const baseTask = {
        userId,

        subjectId:
          subtopic.subjectId,

        topicId:
          subtopic.topicId,

        subtopicId:
          subtopic.id,

        type:
          TASK_TYPES.STUDY,

        scheduledDate:
          currentDate.format(
            "YYYY-MM-DD"
          ),

        estimatedMinutes,

        actualMinutes: 0,
      };

      generatedTasks.push(
        buildTaskMetadata(
          baseTask,
          index
        )
      );

      usedCapacity +=
        estimatedMinutes;
    }
  );

  return generatedTasks;
}