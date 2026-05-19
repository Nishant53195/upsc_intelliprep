import SectionCard from "../components/SectionCard";

import HubTabs from "../components/HubTabs";

function KnowledgeGraph() {
  return (
    <SectionCard
      title="Knowledge Graph"
      subtitle="Explore intelligent topic connections."
    >
      <HubTabs
        tabs={[
          "Today's Topic",
          "Search Topic",
        ]}
      />

      <div className="h-64 rounded-3xl border border-dashed border-white/10 bg-[#11151b]" />
    </SectionCard>
  );
}

export default
  KnowledgeGraph;