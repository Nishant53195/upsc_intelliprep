import {
  fetchTodayTasks,
} from "./getTodayTasks";

import useScheduleStore
from "../../stores/scheduleStore";

export async function refreshTodayTasks() {
  const groupedTasks =
    await fetchTodayTasks();

  useScheduleStore
    .getState()
    .setTodayTasks(
      groupedTasks
    );
}