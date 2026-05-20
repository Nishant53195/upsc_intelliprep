import dayjs from "dayjs";

import {
  TASK_TYPES,
  SLOT_TYPES,
} from "../../constants/scheduler";

import chunkSubtopic
  from "./chunkSubtopic";

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
      let remainingMinutes =
        subtopic.estimatedMinutes ||
        60;

      let chunkIndex = 1;

      while (
        remainingMinutes > 0
      ) {
        const remainingCapacity =
          dailyCapacity -
          usedCapacity;

        if (
          remainingCapacity <= 0
        ) {
          currentDate =
            currentDate.add(
              1,
              "day"
            );

          usedCapacity = 0;

          continue;
        }

        const {
          chunkMinutes,

          leftoverMinutes,
        } = chunkSubtopic({
          remainingMinutes,

          availableMinutes:
            remainingCapacity,
        });

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

          slotType:
            subtopic.paper ===
            "OPTIONAL"
              ? SLOT_TYPES.OPTIONAL
              : SLOT_TYPES.GS,

          scheduledDate:
            currentDate.format(
              "YYYY-MM-DD"
            ),

          estimatedMinutes:
            chunkMinutes,

          actualMinutes: 0,

          chunkMinutes,

          chunkIndex,

          isChunked:
            subtopic
              .estimatedMinutes >
            dailyCapacity,
        };

        generatedTasks.push(
          buildTaskMetadata(
            baseTask,
            index
          )
        );

        usedCapacity +=
          chunkMinutes;

        remainingMinutes =
          leftoverMinutes;

        chunkIndex += 1;

        if (
          usedCapacity >=
          dailyCapacity
        ) {
          currentDate =
            currentDate.add(
              1,
              "day"
            );

          usedCapacity = 0;
        }
      }
    }
  );

  return generatedTasks;
}