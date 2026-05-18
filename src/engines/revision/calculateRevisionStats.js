import {
  MEMORY_STATES,
} from "../../constants/revision";

export function calculateRevisionStats(
  revisions
) {
  const total =
    revisions.length;

  const stable =
    revisions.filter(
      (revision) =>
        revision.memoryState ===
        MEMORY_STATES.STABLE
    ).length;

  const weak =
    revisions.filter(
      (revision) =>
        revision.memoryState ===
        MEMORY_STATES.WEAK
    ).length;

  const forgotten =
    revisions.filter(
      (revision) =>
        revision.memoryState ===
        MEMORY_STATES.FORGOTTEN
    ).length;

  const learning =
    revisions.filter(
      (revision) =>
        revision.memoryState ===
        MEMORY_STATES.LEARNING
    ).length;

  const stabilityScore =
    total === 0
      ? 0
      : Math.round(
          (stable / total) * 100
        );

  return {
    total,

    stable,
    weak,
    forgotten,
    learning,

    stabilityScore,
  };
}