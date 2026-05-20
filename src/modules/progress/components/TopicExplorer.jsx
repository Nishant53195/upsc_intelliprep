import {
  useState,
} from "react";

import { useLiveQuery }
from "dexie-react-hooks";

import { db }
from "../../../db/dexie";

function TopicExplorer({
  subject,
  onBackSubject,
}) {
  const [
    selectedTopic,
    setSelectedTopic,
  ] = useState(null);

  const topics =
    useLiveQuery(
      async () => {
        if (!subject)
          return [];

        return db.topics
          .where("subjectId")
          .equals(subject.id)
          .sortBy("order");
      },

      [subject]
    ) || [];

  const subtopics =
    useLiveQuery(
      async () => {
        if (!selectedTopic)
          return [];

        return db.subtopics
          .where("topicId")
          .equals(
            selectedTopic.id
          )
          .sortBy("order");
      },

      [selectedTopic]
    ) || [];

  return (
    <div className="mt-8">
      {/* CHIPS */}
      <div className="mb-6 flex flex-wrap gap-3">
        {/* SUBJECT CHIP */}
        <button
          onClick={() =>
            onBackSubject()
          }
          className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700"
        >
          {subject.name}
        </button>

        {/* TOPIC CHIP */}
        {selectedTopic && (
          <button
            onClick={() =>
              setSelectedTopic(
                null
              )
            }
            className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            {
              selectedTopic.name
            }
          </button>
        )}
      </div>

      {/* TOPICS VIEW */}
      {!selectedTopic && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {topics.map(
            (topic) => (
              <div
                key={topic.id}
                onClick={() =>
                  setSelectedTopic(
                    topic
                  )
                }
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {topic.name}
                </h3>
              </div>
            )
          )}
        </div>
      )}

      {/* SUBTOPICS VIEW */}
      {selectedTopic && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {subtopics.map(
            (
              subtopic
            ) => (
              <div
                key={
                  subtopic.id
                }
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-sm font-medium text-slate-700">
                  {
                    subtopic.name
                  }
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default
  TopicExplorer;