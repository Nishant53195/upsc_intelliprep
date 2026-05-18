import {
  MEMORY_STATES,
  REVISION_STAGES,
} from "../../constants/revision";

export function getMemoryStateAfterRevision(
  revisionStage
) {
  switch (revisionStage) {
    case REVISION_STAGES.D3:
      return MEMORY_STATES.LEARNING;

    case REVISION_STAGES.D10:
      return MEMORY_STATES.STABLE;

    case REVISION_STAGES.D30:
      return MEMORY_STATES.STABLE;

    default:
      return MEMORY_STATES.LEARNING;
  }
}