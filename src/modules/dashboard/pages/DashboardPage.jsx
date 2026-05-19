import DashboardLayout from "../components/DashboardLayout";

import PreparationStatus from "../sections/PreparationStatus";

import StudyHub from "../sections/StudyHub";

import PYQHub from "../sections/PYQHub";

import TestHub from "../sections/TestHub";

import KnowledgeGraph from "../sections/KnowledgeGraph";

import CurrentAffairsHub from "../sections/CurrentAffairsHub";

import useDashboardStore from "../../../stores/dashboardStore";

function DashboardPage() {
  const activeHub =
    useDashboardStore(
      (state) =>
        state.activeHub
    );

  return (
    <DashboardLayout>
      <div className="min-h-full">
        {activeHub ===
          "Preparation Status" && (
          <PreparationStatus />
        )}

        {activeHub ===
          "Study Hub" && (
          <StudyHub />
        )}

        {activeHub ===
          "PYQ Hub" && (
          <PYQHub />
        )}

        {activeHub ===
          "Test Hub" && (
          <TestHub />
        )}

        {activeHub ===
          "Knowledge Graph" && (
          <KnowledgeGraph />
        )}

        {activeHub ===
          "Current Affairs" && (
          <CurrentAffairsHub />
        )}
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;