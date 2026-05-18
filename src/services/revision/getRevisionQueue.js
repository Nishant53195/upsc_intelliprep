import {
  fetchPendingRevisions,
} from "./getRevisions";

import {
  calculateRevisionStats,
} from "../../engines/revision/calculateRevisionStats";

export async function getRevisionQueue() {
  const revisions =
    await fetchPendingRevisions();

  const stats =
    calculateRevisionStats(
      revisions
    );

  return {
    revisions,

    stats,
  };
}