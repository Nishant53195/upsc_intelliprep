import { useState } from "react";

import SectionCard from "../components/SectionCard";

import HubTabs from "../components/HubTabs";

import SegmentTabs from "../components/SegmentTabs";

function PYQHub() {
  const [
    activeMode,
    setActiveMode,
  ] = useState(
    "Prelims PYQ"
  );

  return (
    <SectionCard
      title="PYQ Hub"
      subtitle="Practice and analyze previous year questions."
    >
      <div className="mb-6 flex justify-start">
        <SegmentTabs
          options={[
            "Prelims PYQ",
            "Mains PYQ",
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
          "Practice PYQ",
          "Rapid Revision",
          "Analytics",
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          "Practice PYQ",
          "Rapid Revision",
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

export default PYQHub;