import {
  completeTask,

  getTasksBySubtopic,
} from "../../db/repositories/scheduleRepository";

import {
  completeSubtopic,

  completeTopic,

  getSubtopicsByTopic,
} from "../../db/repositories/syllabusRepository";

import {
  TASK_TYPES,

  SLOT_TYPES,
} from "../../constants/scheduler";

import {
  saveTasks,
} from "../../db/repositories/scheduleRepository";

import dayjs from "dayjs";
import {
  refreshTodayTasks,
} from "./refreshTodayTasks";

export async function completeStudyTask(
  task
) {
  /*
   --------------------------
   COMPLETE TASK
   --------------------------
  */

  await completeTask(
    task.id
  );

  /*
   --------------------------
   CHECK SUBTOPIC
   --------------------------
  */

  const subtopicTasks =
    await getTasksBySubtopic(
      task.subtopicId
    );

  const allChunksCompleted =
    subtopicTasks.every(
      (task) =>
        task.completed
    );

  /*
   --------------------------
   COMPLETE SUBTOPIC
   --------------------------
  */

  if (
    allChunksCompleted
  ) {
    await completeSubtopic(
      task.subtopicId
    );

    /*
     --------------------------
     CHECK TOPIC
     --------------------------
    */

    const subtopics =
      await getSubtopicsByTopic(
        task.topicId
      );

    const allSubtopicsCompleted =
      subtopics.every(
        (subtopic) =>
          subtopic.status ===
          "COMPLETED"
      );

    /*
     --------------------------
     COMPLETE TOPIC
     --------------------------
    */

    if (
      allSubtopicsCompleted
    ) {
      await completeTopic(
        task.topicId
      );

      /*
       --------------------------
       GENERATE PYQ TASK
       --------------------------
      */

      const pyqTask = {
        id:
          crypto.randomUUID(),

        userId:
          task.userId,

        type:
          TASK_TYPES.PYQ,

        slotType:
          SLOT_TYPES.PRACTICE,

        topicId:
          task.topicId,

        subjectId:
          task.subjectId,

        scheduledDate:
          dayjs().format(
            "YYYY-MM-DD"
          ),

        estimatedMinutes:
          45,

        completed: false,

        createdAt:
          new Date(),
      };

      await saveTasks([
        pyqTask,
      ]);

      /*
 --------------------------
 REFRESH DASHBOARD
 --------------------------
*/

await refreshTodayTasks();
    }
  }
}