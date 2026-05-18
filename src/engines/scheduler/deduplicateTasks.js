export function deduplicateTasks(
  tasks = []
) {
  const seenSubtopics =
    new Set();

  return tasks.filter((task) => {
    if (
      seenSubtopics.has(
        task.subtopicId
      )
    ) {
      return false;
    }

    seenSubtopics.add(
      task.subtopicId
    );

    return true;
  });
}