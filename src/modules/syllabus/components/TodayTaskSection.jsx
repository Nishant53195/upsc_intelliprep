function TodayTasksSection({
  tasks,
  onTaskComplete,
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
    "COMPLETED"
      ? "bg-emerald-950/40 opacity-70"
      : "bg-slate-900"
  }`}
>
            <div>
              <p
  className={`text-sm font-medium ${
    task.status ===
    "COMPLETED"
      ? "text-emerald-300 line-through"
      : "text-slate-100"
  }`}
>
                {
                  task.subtopicName
                }
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-md bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
                  {
                    task.estimatedMinutes
                  }{" "}
                  mins
                </span>

                <span className="rounded-md bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
                  {
                    task.status
                  }
                </span>
              </div>
            </div>

            <button
  onClick={() =>
    onTaskComplete(
      task.id
    )
  }
  className={`h-5 w-5 rounded-full border-2 transition ${
    task.status ===
    "COMPLETED"
      ? "border-emerald-400 bg-emerald-400"
      : "border-slate-500 hover:border-emerald-400"
  }`}
/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodayTasksSection;