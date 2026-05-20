import {
  useEffect,
  useState,
} from "react";

import {
  refreshTodayTasks,
} from "../../../services/scheduler/refreshTodayTasks";

import SectionCard
from "../components/SectionCard";

import HubTabs
from "../components/HubTabs";

import SyllabusProgressView
from "../../progress/components/SyllabusProgressView";

import TodayTaskCards
from "../components/TodayTaskCards";

import {
  fetchTodayTasks,
} from "../../../services/scheduler/getTodayTasks";

import useScheduleStore
from "../../../stores/scheduleStore";

function StudyHub() {
  const [
    activeTab,

    setActiveTab,
  ] = useState(
    "Tasks"
  );

  const setTasks =
    useScheduleStore(
      (state) =>
        state.setTasks
    );

  useEffect(() => {
    async function loadTasks() {
      const groupedTasks =
        await fetchTodayTasks();

      setTasks(
        groupedTasks
      );

       refreshTodayTasks();
    }

    loadTasks();
  }, []);

  const tabs = [
    "Tasks",

    "Syllabus Progress",
  ];

  return (
    <SectionCard>
      <HubTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={
          setActiveTab
        }
      />

      <div className="mt-6">
        {activeTab ===
          "Tasks" && (
          <TodayTaskCards />
        )}

        {activeTab ===
          "Syllabus Progress" && (
          <SyllabusProgressView />
        )}
      </div>
    </SectionCard>
  );
}

export default
  StudyHub;