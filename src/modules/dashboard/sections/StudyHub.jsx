import { useState } from "react";

import SectionCard from "../components/SectionCard";

import HubTabs from "../components/HubTabs";

const tabs = [
  "Tasks",
  "Revisions",
  "Syllabus Progress",
  "Weak Topic Analysis",
  "Analytics",
];

function StudyHub() {
  const [activeTab] =
    useState("Tasks");

  return (
    <SectionCard
      title="Study Hub"
      subtitle="Your central UPSC operating workspace."
    >
      <HubTabs
        tabs={tabs}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-[#11151b] p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {
                    activeTab
                  }
                </p>

                <h3 className="mt-2 text-lg font-medium">
                  Placeholder
                </h3>
              </div>

              <div className="h-12 w-12 rounded-2xl bg-white/[0.05]" />
            </div>

            <div className="mt-6 h-24 rounded-2xl border border-dashed border-white/10" />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default StudyHub;