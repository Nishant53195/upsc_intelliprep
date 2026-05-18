import { saveRevision } from "../../db/repositories/revisionRepository";

import { saveTasks } from "../../db/repositories/scheduleRepository";

export async function createRevision({
  revision,
  revisionTask,
}) {
  await saveRevision(revision);

  await saveTasks([revisionTask]);

  return {
    revision,
    revisionTask,
  };
}