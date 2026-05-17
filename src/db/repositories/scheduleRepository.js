import { db } from "../dexie";

export async function saveTasks(
  tasks
) {
  console.log("SAVING TASKS", tasks);

await db.schedule_tasks.bulkPut(
  tasks
);
}

export async function getTasksByDate(
  date
) {
  return await db.schedule_tasks
    .where("scheduledDate")
    .equals(date)
    .toArray();
}

export async function updateTaskStatus(
  taskId,
  status
) {
  await db.schedule_tasks.update(
    taskId,
    {
      status,
    }
  );
}