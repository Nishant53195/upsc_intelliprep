import {
  useState,
} from "react";
import useOrderedSubjects
from "../hooks/useOrderedSubjects";

import TopicExplorer
from "./TopicExplorer";

function SyllabusProgressView() {

      const [
    activePaper,
    setActivePaper,
  ] = useState("GS1");

  
const papers = [
  {
    label: "GS I",
    value: "GS1",
  },

  {
    label: "GS II",
    value: "GS2",
  },

  {
    label: "GS III",
    value: "GS3",
  },

  {
    label: "GS IV",
    value: "GS4",
  },

  {
    label: "Optional",
    value: "OPTIONAL",
  },
];

  const subjects =
  useOrderedSubjects(
    activePaper
  );

  const [
  selectedSubject,
  setSelectedSubject,
] = useState(null);



  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        {papers.map((paper) => (
          <button
            key={paper.label}
            onClick={() =>
              setActivePaper(
                paper.value
              )
            }
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              activePaper ===
              paper.value
                ? "bg-indigo-500 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {paper.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
  {subjects?.map(
    (subject) => (
      <div
  key={subject.id}
  onClick={() =>
    setSelectedSubject(subject)
  }
  className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
>
        <h3 className="text-lg font-semibold text-slate-900">
          {subject.name}
        </h3>

        
      </div>
    )
  )}
</div>
{
  selectedSubject && (
    <TopicExplorer
      subject={
        selectedSubject
      }
    />
  )
}
    </div>
  );
}

export default
  SyllabusProgressView;