function SubjectCard({
  subject,
  expanded,
  progress,
  onToggle,
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-slate-800">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-white">
              {subject.name}
            </h2>

            <span className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-300">
              {subject.paper}
            </span>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                Progress
              </span>

              <span>
                 {progress}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-700">
              <div
  style={{
    width: `${progress}%`,
  }}
  className="h-full rounded-full bg-blue-500"
/>
            </div>
          </div>
        </div>

        <div className="ml-5 flex items-center gap-3">
          <div className="rounded-lg bg-slate-700 px-3 py-2 text-sm text-slate-300">
            {subject.type}
          </div>

          <div className="text-slate-400">
            {expanded ? "−" : "+"}
          </div>
        </div>
      </button>
    </div>
  );
}

export default SubjectCard;