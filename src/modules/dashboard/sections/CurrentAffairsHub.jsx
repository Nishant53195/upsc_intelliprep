import SectionCard from "../components/SectionCard";

import HubTabs from "../components/HubTabs";

function CurrentAffairsHub() {
  return (
    <SectionCard
      title="Current Affairs Hub"
      subtitle="Track and evolve dynamic current affairs."
    >
      <HubTabs
        tabs={[
          "Add Current Affairs",
          "Read Current Affairs",
          "Evolution Tracking",
          "Export",
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="h-40 rounded-3xl border border-white/10 bg-[#11151b]"
          />
        ))}
      </div>
    </SectionCard>
  );
}

export default
  CurrentAffairsHub;