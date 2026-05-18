import {
  useEffect,
  useState,
} from "react";

import {
  fetchSubjects,
  fetchFullSubject,
} from "../services/syllabus/getSyllabus";

import { calculateSubjectProgress }
  from "../engines/syllabus/calculateSubjectProgress";

import SubjectCard
  from "../modules/syllabus/components/SubjectCard";

import TopicList
  from "../modules/syllabus/components/TopicList";

import TodayTasksSection
  from "../modules/syllabus/components/TodayTaskSection";

import { fetchTodayTasks }
  from "../services/scheduler/getTodayTasks";

import {
  TASK_STATUS,
} from "../constants/scheduler";

import {
  updateTaskStatus,
} from "../services/scheduler/updateTaskStatus";

import {
  processMissedTasks,
} from "../services/scheduler/processMissedTasks";

function StudyPage() {
  const [subjects, setSubjects] =
    useState([]);

  const [
    expandedSubject,
    setExpandedSubject,
  ] = useState(null);

  const [
    subjectTopics,
    setSubjectTopics,
  ] = useState({});

  const [
    todayTasks,
    setTodayTasks,
  ] = useState([]);

  async function fetchStudyData() {
    try {
      // 1. Stabilize lifecycle
      await processMissedTasks();

      // 2. Load subjects
      const data =
        await fetchSubjects();

      setSubjects(data);

      // 3. Load today's tasks
      const tasks =
        await fetchTodayTasks();

      setTodayTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStudyData();
  }, []);

  async function handleToggle(
    subjectId
  ) {
    if (
      expandedSubject ===
      subjectId
    ) {
      setExpandedSubject(null);

      return;
    }

    try {
      if (
        !subjectTopics[
          subjectId
        ]
      ) {
        const topics =
          await fetchFullSubject(
            subjectId
          );

        setSubjectTopics(
          (prev) => ({
            ...prev,

            [subjectId]:
              topics,
          })
        );
      }

      setExpandedSubject(
        subjectId
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshTasks() {
    const refreshedTasks =
      await fetchTodayTasks();

    setTodayTasks(
      refreshedTasks
    );
  }

  async function handleTaskComplete(
    task
  ) {
    await updateTaskStatus(
      task,
      TASK_STATUS.COMPLETED
    );

    await refreshTasks();
  }

  async function handleRevisionComplete(
    task,
    recallQuality
  ) {
    await updateTaskStatus(
      task,
      TASK_STATUS.COMPLETED,
      recallQuality
    );

    await refreshTasks();
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">
          Study Hub
        </h1>

        <TodayTasksSection
          tasks={todayTasks}
          onTaskComplete={
            handleTaskComplete
          }
          onRevisionComplete={
            handleRevisionComplete
          }
        />

        <div className="mt-8 space-y-4">
          {subjects.map(
            (subject) => (
              <div
                key={
                  subject.id
                }
              >
                <SubjectCard
                  subject={
                    subject
                  }
                  expanded={
                    expandedSubject ===
                    subject.id
                  }
                  progress={calculateSubjectProgress(
                    subjectTopics[
                      subject.id
                    ] || []
                  )}
                  onToggle={() =>
                    handleToggle(
                      subject.id
                    )
                  }
                />

                {expandedSubject ===
                  subject.id && (
                  <TopicList
                    topics={
                      subjectTopics[
                        subject.id
                      ] || []
                    }
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyPage;