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

      
    </SectionCard>
  );
}

export default
  KnowledgeGraph;