import { nanoid } from "nanoid";
import dayjs from "dayjs";
import {
  TASK_STATUS,
  TASK_TYPES,
  INTENSITY_MODES,
} from "../../constants/scheduler";

export function generateInitialTasks(
  subtopics = [],
  userId
) {
  const today =
  dayjs().format(
    "YYYY-MM-DD"
  );

  return subtopics.map(
    (subtopic) => ({
      id: nanoid(),

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
        subtopic.estimatedMinutes,

      actualMinutes: 0,

      status:
        TASK_STATUS.PENDING,

      intensityMode:
        INTENSITY_MODES.NORMAL,

      createdAt:
        new Date().toISOString(),
    })
  );
}