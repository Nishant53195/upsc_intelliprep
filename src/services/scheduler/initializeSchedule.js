import dayjs from "dayjs";

import { saveTasks }
  from "../../db/repositories/scheduleRepository";

import {
  getSubjects,
  getTopics,
  getSubtopics,
} from "../../db/repositories/syllabusRepository";

import {
  getOnboarding,
} from "../../db/repositories/onboardingRepository";

import fillStudySlots
  from "../../engines/scheduler/fillStudySlots";

import buildOrderedSubtopics
  from "../../engines/scheduler/buildOrderedSubtopics";

export async function initializeSchedule(
  userId,

  studyHours = 6
) {
  /*
   --------------------------
   FETCH MASTER DATA
   --------------------------
  */

  const [
    subjects,

    topics,

    subtopics,

    onboarding,
  ] = await Promise.all([
    getSubjects(),

    getTopics(),

    getSubtopics(),

    getOnboarding(userId),
  ]);

  /*
   --------------------------
   BUILD ORDERED GS PIPELINE
   --------------------------
  */

  const orderedGsSubtopics =
    buildOrderedSubtopics({
      subjects,

      topics,

      subtopics:
        subtopics.filter(
          (subtopic) => {
            const subject =
              subjects.find(
                (s) =>
                  s.id ===
                  subtopic.subjectId
              );

            return (
              subject?.type ===
              "GS"
            );
          }
        ),

      sequence:
        onboarding?.gsSequence ||
        [],
    });

  /*
   --------------------------
   BUILD ORDERED OPTIONAL PIPELINE
   --------------------------
  */

  const orderedOptionalSubtopics =
    buildOrderedSubtopics({
      subjects,

      topics,

      subtopics:
        subtopics.filter(
          (subtopic) => {
            const subject =
              subjects.find(
                (s) =>
                  s.id ===
                  subtopic.subjectId
              );

            return (
              subject?.type ===
              "OPTIONAL"
            );
          }
        ),

      sequence:
        onboarding?.optionalSequence ||
        [],
    });

  /*
   --------------------------
   REVISION TASKS
   --------------------------
  */

  const revisionTasks =
    [];

  /*
   --------------------------
   GENERATE TASKS
   --------------------------
  */

  const tasks =
    fillStudySlots({
      gsSubtopics:
        orderedGsSubtopics,

      optionalSubtopics:
        orderedOptionalSubtopics,

      revisionTasks,

      studyHours,

      userId,

      startDate:
        dayjs().format(
          "YYYY-MM-DD"
        ),
    });

  /*
   --------------------------
   SAVE TASKS
   --------------------------
  */

  await saveTasks(tasks);

  return tasks;
}