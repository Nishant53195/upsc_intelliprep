import { useState } from "react";

import SectionCard from "../components/SectionCard";
import SyllabusProgressView
from "../../progress/components/SyllabusProgressView";
import HubTabs from "../components/HubTabs";
import PageHeader from "../components/PageHeader";
const tabs = [
  "Tasks",
  "Revisions",
  "Syllabus Progress",
  "Weak Topic Analysis",
  "Analytics",
];

function StudyHub() {
  const [
  activeTab,
  setActiveTab,
] = useState("Tasks");

  return (
    
    <SectionCard>
      <HubTabs
      
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
{
  activeTab ===
    "Syllabus Progress" && (
    <SyllabusProgressView />
  )
}


    </SectionCard>
  );
}

export default StudyHub;