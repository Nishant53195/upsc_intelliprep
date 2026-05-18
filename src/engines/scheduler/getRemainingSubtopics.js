import {
  getSubtopicsByTopic,
} from "../../db/repositories/syllabusRepository";

import {
  TASK_STATUS,
} from "../../constants/scheduler";

export async function getRemainingSubtopics(
  topics = []
) {
  const remainingSubtopics = [];

  for (const topic of topics) {
    const subtopics =
      await getSubtopicsByTopic(
        topic.id
      );

    // IMPORTANT:
    // Remaining syllabus detection
    // depends ONLY on
    // syllabus completion state.
    //
    // Revision tasks,
    // memory state,
    // execution queue
    // MUST NEVER affect
    // syllabus regeneration.
    const incompleteSubtopics =
      subtopics.filter(
        (subtopic) =>
          subtopic.status !==
          TASK_STATUS.COMPLETED
      );

    remainingSubtopics.push(
      ...incompleteSubtopics
    );
  }

  return remainingSubtopics;
}