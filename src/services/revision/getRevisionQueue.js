import {
  fetchPendingRevisions,
} from "./getRevisions";

import {
  enrichRevisionQueue,
} from "./enrichRevisionQueue";

import {
  calculateRevisionStats,
} from "../../engines/revision/calculateRevisionStats";

export async function getRevisionQueue() {
  const revisions =
    await fetchPendingRevisions();

  const enrichedRevisions =
  await enrichRevisionQueue(
    revisions
  );

const stats =
  calculateRevisionStats(
    enrichedRevisions
  );
  return {
    revisions:
   enrichedRevisions,

    stats,
  };
}