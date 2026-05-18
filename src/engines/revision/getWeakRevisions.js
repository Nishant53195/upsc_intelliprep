import {
  MEMORY_STATES,
} from "../../constants/revision";

export function getWeakRevisions(
  revisions
) {
  return revisions.filter(
    (revision) =>
      revision.memoryState ===
        MEMORY_STATES.WEAK ||
      revision.memoryState ===
        MEMORY_STATES.FORGOTTEN
  );
}