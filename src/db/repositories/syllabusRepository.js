import { db } from "../dexie";

export async function saveSubjects(subjects) {
  await db.subjects.bulkPut(subjects);
}

export async function saveTopics(topics) {
  await db.topics.bulkPut(topics);
}

export async function saveSubtopics(subtopics) {
  await db.subtopics.bulkPut(subtopics);
}

export async function getSubjects() {
  return await db.subjects.toArray();
}

export async function getTopicsBySubject(subjectId) {
  return await db.topics
    .where("subjectId")
    .equals(subjectId)
    .toArray();
}

export async function getSubtopicsByTopic(topicId) {
  return await db.subtopics
    .where("topicId")
    .equals(topicId)
    .toArray();
}

export async function getSubtopicById(
  subtopicId
) {
  return await db.subtopics.get(
    subtopicId
  );
}