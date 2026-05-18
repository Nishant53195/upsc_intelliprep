import {
  getPendingRevisions,
  getRevisionsBySubtopic,
} from "../../db/repositories/revisionRepository";

export async function fetchPendingRevisions() {
  return getPendingRevisions();
}

export async function fetchSubtopicRevisions(
  subtopicId
) {
  return getRevisionsBySubtopic(
    subtopicId
  );
}