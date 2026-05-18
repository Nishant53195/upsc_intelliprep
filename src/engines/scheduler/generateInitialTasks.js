import dayjs from "dayjs";

import {
  TASK_TYPES,
} from "../../constants/scheduler";

import { buildTaskMetadata } from "./buildTaskMetadata";

export function generateInitialTasks(
  subtopics = [],
  userId
) {
  const today =
    dayjs().format("YYYY-MM-DD");

  return subtopics.map(
    (subtopic, index) => {
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
          today,

        estimatedMinutes:
          subtopic.estimatedMinutes || 60,

        actualMinutes: 0,
      };

      return buildTaskMetadata(
        baseTask,
        index
      );
    }
  );
}