import dayjs from "dayjs";
import {
  scoreRecoveryTasks,
} from "./scoreRecoveryTasks";

export function injectRecoveryTasks({
  todayTasks = [],
  missedTasks = [],
  recoveryLimit = 2,
}) {
  const today =
    dayjs().format(
      "YYYY-MM-DD"
    );

  // Prevent repeated injection
  const eligibleRecoveryTasks =
  missedTasks.filter(
    (task) =>
      task.status ===
        "MISSED" &&
      !task.recoveryInjectedAt
  );

// Score recovery workload
const scoredRecoveryTasks =
  scoreRecoveryTasks(
    eligibleRecoveryTasks
  );

// Highest priority first
const prioritizedRecoveryTasks =
  scoredRecoveryTasks.sort(
    (a, b) =>
      b.recoveryScore -
      a.recoveryScore
  );

  // Select limited recovery tasks
  const recoveryTasks =
    prioritizedRecoveryTasks
      .slice(0, recoveryLimit)
      .map((task) => ({
        ...task,

        scheduledDate:
          today,

        isRecoveryTask: true,

        recoveryInjectedAt:
          dayjs().toISOString(),
      }));

  return [
    ...recoveryTasks,
    ...todayTasks,
  ];
}