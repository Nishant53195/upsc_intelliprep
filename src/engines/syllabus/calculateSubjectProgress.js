export function calculateSubjectProgress(
  topics = []
) {
  let totalSubtopics = 0;

  let completedSubtopics = 0;

  topics.forEach((topic) => {
    topic.subtopics.forEach(
      (subtopic) => {
        totalSubtopics += 1;

        if (
          subtopic.status ===
          "COMPLETED"
        ) {
          completedSubtopics += 1;
        }
      }
    );
  });

  if (!totalSubtopics) {
    return 0;
  }

  return Math.round(
    (completedSubtopics /
      totalSubtopics) *
      100
  );
}