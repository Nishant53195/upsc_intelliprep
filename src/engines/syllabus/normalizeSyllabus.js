import {
  TOPIC_STATUS,
  SUBTOPIC_STATUS,
} from "../../constants/syllabus";

export function normalizeSyllabus(syllabusData) {
  const subjects = [];
  const topics = [];
  const subtopics = [];

  syllabusData.forEach((subject, subjectIndex) => {
    subjects.push({
      id: subject.id,
      type: subject.type,
      paper: subject.paper,
      name: subject.name,
      order: subjectIndex,
    });

    subject.topics.forEach((topic) => {
      let totalEstimatedMinutes = 0;

      topics.push({
        id: topic.id,
        subjectId: subject.id,
        name: topic.name,

        estimatedMinutes: 0,

        importanceScore: 0,
        currentRelevance: 0,
        pyqFrequency: 0,
        healthScore: 100,

        status: TOPIC_STATUS.NOT_STARTED,
      });

      topic.subtopics.forEach((subtopic) => {
        totalEstimatedMinutes += subtopic.estimatedMinutes;

        subtopics.push({
  id: subtopic.id,

  subjectId:
    subject.id,

  topicId:
    topic.id,

  name: subtopic.name,

  estimatedMinutes:
    subtopic.estimatedMinutes,

  difficulty:
    subtopic.difficulty,

  status:
    SUBTOPIC_STATUS.NOT_STARTED,
});
      });

      const topicIndex = topics.findIndex(
        (t) => t.id === topic.id
      );

      if (topicIndex !== -1) {
        topics[topicIndex].estimatedMinutes =
          totalEstimatedMinutes;
      }
    });
  });

  return {
    subjects,
    topics,
    subtopics,
  };
}