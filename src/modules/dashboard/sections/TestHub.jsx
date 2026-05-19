import { useState } from "react";

import SectionCard from "../components/SectionCard";

import HubTabs from "../components/HubTabs";

import SegmentTabs from "../components/SegmentTabs";

function TestHub() {
  const [
    activeMode,
    setActiveMode,
  ] = useState(
    "Prelims Tests"
  );

  return (
    <SectionCard
      title="Test Hub"
      subtitle="Attempt and analyze UPSC tests."
    >
      <div className="mb-6 flex justify-start">
        <SegmentTabs
          options={[
            "Prelims Tests",
            "Mains Tests",
          ]}
          active={
            activeMode
          }
          setActive={
            setActiveMode
          }
        />
      </div>

      <HubTabs
        tabs={[
          "Attempt Test",
          "Feed Offline Marks",
          "Analytics",
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          "Attempt Test",
          "Feed Offline Marks",
          "Analytics",
        ].map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-white/10 bg-[#11151b] p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {
                    activeMode
                  }
                </p>

                <h3 className="mt-2 text-lg font-medium">
                  {item}
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

export default TestHub;