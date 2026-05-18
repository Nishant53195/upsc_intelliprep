import {
  getSubtopicById,
} from "../../db/repositories/syllabusRepository";

export async function enrichRevisionQueue(
  revisions = []
) {
  return Promise.all(
    revisions.map(
      async (revision) => {
        const subtopic =
          await getSubtopicById(
            revision.subtopicId
          );

        return {
          ...revision,

          subtopicName:
            subtopic?.name ||
            "Unknown",
        };
      }
    )
  );
}