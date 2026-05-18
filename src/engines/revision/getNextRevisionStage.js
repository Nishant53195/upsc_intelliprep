import { REVISION_STAGES } from "../../constants/revision";

export function getNextRevisionStage(currentStage) {
  switch (currentStage) {
    case REVISION_STAGES.D3:
      return REVISION_STAGES.D10;

    case REVISION_STAGES.D10:
      return REVISION_STAGES.D30;

    case REVISION_STAGES.D30:
      return null;

    default:
      return null;
  }
}