import { useLiveQuery }
from "dexie-react-hooks";

import { db }
from "../../../db/dexie";

function TopicExplorer({
  subject,
}) {
  const topics =
    useLiveQuery(
      async () => {
        if (!subject)
          return [];

        // Fetch topics
        const topicList =
          await db.topics
            .where("subjectId")
            .equals(subject.id)
            .sortBy("order");

        // Attach subtopics
        const enrichedTopics =
          await Promise.all(
            topicList.map(
              async (topic) => {
                const subtopics =
                  await db.subtopics
                    .where("topicId")
                    .equals(topic.id)
                    .sortBy("order");

                return {
                  ...topic,
                  subtopics,
                };
              }
            )
          );

        return enrichedTopics;
      },

      [subject]
    ) || [];

  return (
    <div className="mt-8">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {subject.name}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Complete syllabus breakdown
        </p>
      </div>

      {/* TOPIC GRID */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            {/* TOPIC TITLE */}
            <h3 className="text-lg font-semibold text-slate-900">
              {topic.name}
            </h3>

            {/* SUBTOPICS */}
            <div className="mt-5 space-y-2">
              {topic.subtopics
                ?.length > 0 ? (
                topic.subtopics.map(
                  (
                    subtopic
                  ) => (
                    <div
                      key={
                        subtopic.id
                      }
                      className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700"
                    >
                      {
                        subtopic.name
                      }
                    </div>
                  )
                )
              ) : (
                <div className="rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-400">
                  No subtopics
                  available
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default
  TopicExplorer;