export default function buildOrderedSubtopics({
  subjects = [],

  topics = [],

  subtopics = [],

  sequence = [],
}) {
  const ordered = [];

  sequence.forEach(
    (sequenceSubject) => {
      const subjectTopics =
        topics
          .filter(
            (topic) =>
              topic.subjectId ===
              sequenceSubject.id
          )
          .sort(
            (a, b) =>
              (a.order || 0) -
              (b.order || 0)
          );

      subjectTopics.forEach(
        (topic) => {
          const topicSubtopics =
            subtopics
              .filter(
                (subtopic) =>
                  subtopic.topicId ===
                  topic.id
              )
              .sort(
                (a, b) =>
                  (a.order || 0) -
                  (b.order || 0)
              );

          ordered.push(
            ...topicSubtopics
          );
        }
      );
    }
  );

  return ordered;
}