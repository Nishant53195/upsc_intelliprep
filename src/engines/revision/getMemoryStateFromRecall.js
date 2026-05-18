import {
  MEMORY_STATES,
  RECALL_QUALITY,
} from "../../constants/revision";

export function getMemoryStateFromRecall(
  recallQuality
) {
  switch (recallQuality) {
    case RECALL_QUALITY.AGAIN:
      return MEMORY_STATES.FORGOTTEN;

    case RECALL_QUALITY.HARD:
      return MEMORY_STATES.WEAK;

    case RECALL_QUALITY.GOOD:
      return MEMORY_STATES.STABLE;

    case RECALL_QUALITY.EASY:
      return MEMORY_STATES.STABLE;

    default:
      return MEMORY_STATES.LEARNING;
  }
}