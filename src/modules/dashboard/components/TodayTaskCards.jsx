import {
  useState,
} from "react";

import useScheduleStore
from "../../../stores/scheduleStore";

import {
  completeStudyTask,
} from "../../../services/scheduler/completeStudyTask";

function TodayTaskCards() {
  const {
    gsTasks,

    optionalTasks,

    revisionTasks,

    practiceTasks,
  } = useScheduleStore();

  const [
    expandedSection,

    setExpandedSection,
  ] = useState(null);

  const sections = [
    {
      key: "gs",

      title: "GS Tasks",

      tasks: gsTasks,
    },

    {
      key: "optional",

      title:
        "Optional Tasks",

      tasks:
        optionalTasks,
    },

    {
      key: "revision",

      title:
        "Revision Tasks",

      tasks:
        revisionTasks,
    },

    {
      key: "practice",

      title:
        "Practice Tasks",

      tasks:
        practiceTasks,
    },
  ];

  function toggleSection(
    key
  ) {
    setExpandedSection(
      expandedSection ===
        key
        ? null
        : key
    );
  }

  return (
    <div className="space-y-4">
      {sections.map(
        (section) => {
          const pendingCount =
            section.tasks.filter(
              (task) =>
                !task.completed
            ).length;

          const expanded =
            expandedSection ===
            section.key;

          return (
            <div
              key={section.key}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {/* HEADER */}
              <button
                onClick={() =>
                  toggleSection(
                    section.key
                  )
                }
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {
                      section.title
                    }
                  </h2>

                  <div className="flex h-7 min-w-7 items-center justify-center rounded-full bg-indigo-500 px-2 text-xs font-bold text-white">
                    {
                      pendingCount
                    }
                  </div>
                </div>

                <div className="text-slate-400">
                  {expanded
                    ? "−"
                    : "+"}
                </div>
              </button>

              {/* TASKS */}
              {expanded && (
                <div className="border-t border-slate-100 px-5 py-4">
                  {section.tasks
                    .length ===
                  0 ? (
                    <div className="text-sm text-slate-500">
                      No task for
                      today
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {section.tasks.map(
                        (
                          task
                        ) => (
                          <div
                            key={
                              task.id
                            }
                            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-medium text-slate-900">
                                  {
                                    task.subtopicName
                                  }
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                  {
                                    task.estimatedMinutes
                                  }
                                  {" "}
                                  mins
                                </p>
                              </div>

                              {task.isRecovery && (
                                <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                  Recovery
                                </div>
                              )}
                            </div>
                            <button
  onClick={async () => {
    await completeStudyTask(
      task
    );
  }}
  className="mt-3 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white"
>
  Complete
</button>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}

export default
  TodayTaskCards;