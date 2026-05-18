import {
  useEffect,
  useState,
} from "react";

import {
  getRevisionQueue,
} from "../services/revision/getRevisionQueue";

function RevisionPage() {
  const [
    revisionData,
    setRevisionData,
  ] = useState(null);

  useEffect(() => {
    async function load() {
      const data =
        await getRevisionQueue();

      setRevisionData(data);
    }

    load();
  }, []);

  if (!revisionData) {
    return null;
  }

  const {
    revisions,
    stats,
  } = revisionData;

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">
          Revision Intelligence
        </h1>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-slate-400">
              Stable
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-300">
              {stats.stable}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-slate-400">
              Weak
            </p>

            <p className="mt-2 text-2xl font-bold text-amber-300">
              {stats.weak}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-slate-400">
              Forgotten
            </p>

            <p className="mt-2 text-2xl font-bold text-red-300">
              {stats.forgotten}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-slate-400">
              Stability
            </p>

            <p className="mt-2 text-2xl font-bold text-blue-300">
              {stats.stabilityScore}%
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {revisions.map(
            (revision) => (
              <div
                key={revision.id}
                className="rounded-xl bg-slate-800 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {revision.subtopicId}
                  </p>

                  <span className="rounded-md bg-purple-900/40 px-2 py-1 text-xs text-purple-300">
                    {revision.revisionStage}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                  <span>
                    {revision.memoryState}
                  </span>

                  <span>
                    Due:
                    {" "}
                    {revision.dueDate}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default RevisionPage;