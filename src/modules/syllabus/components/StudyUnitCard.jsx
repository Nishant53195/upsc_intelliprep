function StudyUnitCard({
  subtopic,
}) {
  return (
    <button className="flex w-full items-center justify-between rounded-xl bg-slate-800 px-4 py-4 text-left transition hover:bg-slate-700">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-100">
          {subtopic.name}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-slate-700 px-2 py-1 text-[11px] text-slate-300">
            {
              subtopic.estimatedMinutes
            }{" "}
            mins
          </span>

          <span className="rounded-md bg-slate-700 px-2 py-1 text-[11px] text-slate-300">
            Difficulty{" "}
            {
              subtopic.difficulty
            }
          </span>

          <span className="rounded-md bg-slate-700 px-2 py-1 text-[11px] text-slate-300">
            {subtopic.status}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="rounded-lg bg-slate-700 px-3 py-2 text-xs text-slate-300">
            Study
          </div>

          <div className="rounded-lg bg-slate-700 px-3 py-2 text-xs text-slate-300">
            Revise
          </div>
        </div>
      </div>

      <div className="ml-4 flex items-center gap-3">
        <div className="h-5 w-5 rounded-full border-2 border-slate-500" />

        <div className="text-slate-500">
          →
        </div>
      </div>
    </button>
  );
}

export default StudyUnitCard;