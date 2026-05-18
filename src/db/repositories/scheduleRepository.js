import dayjs from "dayjs";

import { db } from "../dexie";

export async function saveTasks(
  tasks = []
) {
  console.log(
    "SAVING TASKS",
    tasks
  );

  return await db.schedule_tasks
    .bulkPut(tasks);
}

export async function getTasksByDate(
  date
) {
  const tasks =
    await db.schedule_tasks
      .where("scheduledDate")
      .equals(date)
      .toArray();

  return tasks.sort(
    (a, b) =>
      a.orderIndex -
      b.orderIndex
  );
}

export async function getAllTasks() {
  const tasks =
    await db.schedule_tasks
      .toArray();

  return tasks.sort(
    (a, b) => {
      if (
        a.scheduledDate ===
        b.scheduledDate
      ) {
        return (
          a.orderIndex -
          b.orderIndex
        );
      }

      return (
        new Date(
          a.scheduledDate
        ) -
        new Date(
          b.scheduledDate
        )
      );
    }
  );
}

export async function updateTask(
  task
) {
  return await db.schedule_tasks
    .put(task);
}

export async function getPendingTasks() {
  return await db.schedule_tasks
    .where("status")
    .equals("PENDING")
    .toArray();
}

export async function getMissedTasks() {
  const today =
    dayjs().format(
      "YYYY-MM-DD"
    );

  return await db.schedule_tasks
    .filter(
      (task) =>
        task.status ===
          "PENDING" &&
        task.scheduledDate <
          today
    )
    .toArray();
}

export async function bulkUpdateTasks(
  tasks = []
) {
  return await db.schedule_tasks
    .bulkPut(tasks);
}

export async function deleteTasksAfterDate(
  date
) {
  const tasks =
    await db.schedule_tasks
      .filter(
        (task) =>
          task.scheduledDate >=
          date
      )
      .toArray();

  const ids = tasks.map(
    (task) => task.id
  );

  return await db.schedule_tasks
    .bulkDelete(ids);
}

export async function getMissedTasksForRecovery() {
  return await db.schedule_tasks
    .where("status")
    .equals("MISSED")
    .toArray();
}