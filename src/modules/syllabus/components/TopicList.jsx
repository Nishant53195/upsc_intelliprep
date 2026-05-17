import { useState } from "react";
import StudyUnitCard from "./StudyUnitCard";

function TopicList({
  topics,
}) {
  const [
    expandedTopics,
    setExpandedTopics,
  ] = useState({});

  function toggleTopic(
    topicId
  ) {
    setExpandedTopics(
      (prev) => ({
        ...prev,

        [topicId]:
          !prev[topicId],
      })
    );
  }

  return (
    <div className="space-y-3 border-t border-slate-700 p-5">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="overflow-hidden rounded-xl bg-slate-900"
        >
          <button
            onClick={() =>
              toggleTopic(
                topic.id
              )
            }
            className="flex w-full items-center justify-between p-4 text-left"
          >
            <div className="flex-1">
  <div className="flex items-center gap-3">
    <h3 className="font-medium text-white">
      {topic.name}
    </h3>

    <span className="rounded-md bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
      {
        topic.estimatedMinutes
      }{" "}
      mins
    </span>
  </div>

  <div className="mt-3">
    <div className="flex items-center justify-between text-[11px] text-slate-500">
      <span>
        Topic Progress
      </span>

      <span>
        0%
      </span>
    </div>

    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
      <div className="h-full w-0 rounded-full bg-emerald-500" />
    </div>
  </div>
</div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-300">
                {topic.status}
              </div>

              <span className="text-slate-400">
                {expandedTopics[
                  topic.id
                ]
                  ? "−"
                  : "+"}
              </span>
            </div>
          </button>

          {expandedTopics[
            topic.id
          ] && (
            <div className="space-y-2 border-t border-slate-800 p-4">
              {topic.subtopics.map(
                (
                  subtopic
                ) => (
                 <StudyUnitCard
  key={subtopic.id}
  subtopic={subtopic}
/>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TopicList;