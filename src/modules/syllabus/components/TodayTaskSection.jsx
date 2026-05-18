import {
  TASK_STATUS,
} from "../../../constants/scheduler";

import {
  RECALL_QUALITY,
} from "../../../constants/revision";

function TodayTasksSection({
  tasks,
  onTaskComplete,
  onRevisionComplete,
}) {
  return (
    <div className="rounded-2xl bg-slate-800 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Today's Tasks
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Daily execution queue
          </p>
        </div>

        <div className="rounded-lg bg-slate-700 px-3 py-2 text-sm text-slate-300">
          {tasks.length} Tasks
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between rounded-xl px-4 py-4 transition ${
              task.status ===
              TASK_STATUS.COMPLETED
                ? "bg-emerald-950/40 opacity-70"
                : "bg-slate-900"
            }`}
          >
            <div>
              <p
                className={`text-sm font-medium ${
                  task.status ===
                  TASK_STATUS.COMPLETED
                    ? "text-emerald-300 line-through"
                    : "text-slate-100"
                }`}
              >
                {task.subtopicName}
              </p>

             <div className="mt-2 flex items-center gap-2 flex-wrap">
  <span className="rounded-md bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
    {task.estimatedMinutes} mins
  </span>

  <span className="rounded-md bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
    {task.status}
  </span>

  {task.isStudy && (
    <span className="rounded-md bg-blue-900/40 px-2 py-1 text-[11px] text-blue-300">
      Study
    </span>
  )}

  {task.isRevision && (
  <span className="rounded-md bg-purple-900/40 px-2 py-1 text-[11px] text-purple-300">
    Revision
    {task.revisionStage
      ? ` ${task.revisionStage}`
      : ""}
  </span>
)}

  {task.isRecovery && (
    <span className="rounded-md bg-amber-900/40 px-2 py-1 text-[11px] text-amber-300">
      Recovery
    </span>
  )}
</div>
            </div>

            <div className="flex items-center gap-2">
  {task.isRevision ? (
    <div className="flex gap-1">
      <button
        onClick={() =>
          onRevisionComplete(
            task,
            RECALL_QUALITY.AGAIN
          )
        }
        className="rounded-md bg-red-900/40 px-2 py-1 text-[10px] text-red-300"
      >
        Again
      </button>

      <button
        onClick={() =>
          onRevisionComplete(
            task,
            RECALL_QUALITY.HARD
          )
        }
        className="rounded-md bg-amber-900/40 px-2 py-1 text-[10px] text-amber-300"
      >
        Hard
      </button>

      <button
        onClick={() =>
          onRevisionComplete(
            task,
            RECALL_QUALITY.GOOD
          )
        }
        className="rounded-md bg-emerald-900/40 px-2 py-1 text-[10px] text-emerald-300"
      >
        Good
      </button>

      <button
        onClick={() =>
          onRevisionComplete(
            task,
            RECALL_QUALITY.EASY
          )
        }
        className="rounded-md bg-blue-900/40 px-2 py-1 text-[10px] text-blue-300"
      >
        Easy
      </button>
    </div>
  ) : (
    <button
      onClick={() =>
        onTaskComplete(task)
      }
      disabled={
        task.status ===
        TASK_STATUS.COMPLETED
      }
      className={`h-5 w-5 rounded-full border-2 transition ${
        task.status ===
        TASK_STATUS.COMPLETED
          ? "border-emerald-400 bg-emerald-400"
          : "border-slate-500 hover:border-emerald-400"
      }`}
    />
  )}
</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodayTasksSection;