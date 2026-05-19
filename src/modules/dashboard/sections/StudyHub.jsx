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

      
    </SectionCard>
  );
}

export default StudyHub;