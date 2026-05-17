import {
  getSubjects,
  getTopicsBySubject,
  getSubtopicsByTopic,
} from "../../db/repositories/syllabusRepository";

export async function fetchSubjects() {
  return await getSubjects();
}

export async function fetchTopics(
  subjectId
) {
  return await getTopicsBySubject(
    subjectId
  );
}

export async function fetchSubtopics(
  topicId
) {
  return await getSubtopicsByTopic(
    topicId
  );
}

export async function fetchFullSubject(
  subjectId
) {
  const subjectTopics =
    await fetchTopics(subjectId);

  const topicsWithSubtopics =
    await Promise.all(
      subjectTopics.map(
        async (topic) => {
          const subtopics =
            await fetchSubtopics(
              topic.id
            );

          return {
            ...topic,
            subtopics,
          };
        }
      )
    );

  return topicsWithSubtopics;
}