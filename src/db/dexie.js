import Dexie from "dexie";

export const db = new Dexie("upsc_intelliprep_db");

db.version(6).stores({
  users: "id,email",

  onboarding_config:  "id,userId,completed",

   subjects: `
    id,
    type,
    paper,
    name,
    order
  `,

  topics: `
    id,
    subjectId,
    name,
    estimatedMinutes,
    importanceScore,
    currentRelevance,
    pyqFrequency,
    healthScore,
    status
  `,

  subtopics: `
  id,
  subjectId,
  topicId,
  name,
  estimatedMinutes,
  difficulty,
  status
`,

  schedule_tasks: `
  id,
  userId,
  subjectId,
  topicId,
  subtopicId,
  type,
  scheduledDate,
  estimatedMinutes,
  actualMinutes,
  status,
  intensityMode,
  createdAt
`,

  revisions: "id,userId,dueDate,status",

  weak_topics: "id,userId,topicId,severity",

  reflections: "id,userId,date",

  prelims_tests: "id,userId,createdAt",

  mains_tests: "id,userId,createdAt",

  pyqs: "id,year,paper",

  current_affairs: "id,date",

  sync_queue: "id,status,createdAt",
});