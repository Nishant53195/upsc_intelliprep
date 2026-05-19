import { useEffect, useRef, useState } from "react";

import useOnboardingStore from "../../../stores/onboardingStore";
import {
  saveOnboarding,
} from "../../../db/repositories/onboardingRepository";

import useAuthStore from "../../../stores/authStore";
import OnboardingCard from "../components/OnboardingCard";
import { useNavigate } from "react-router-dom";
import {
  initializeSyllabus,
} from "../../../services/syllabus/initializeSyllabus";

import {
  initializeSchedule,
} from "../../../services/scheduler/initializeSchedule";

function InitializationStep() {

    const navigate = useNavigate();
  const [logs, setLogs] =
    useState([]);

  const hasInitialized =
    useRef(false);

    const completeOnboarding =
  useOnboardingStore(
    (state) =>
      state.completeOnboarding
  );

  const name =
    useOnboardingStore(
      (state) => state.name
    );

    const user =
  useAuthStore(
    (state) => state.user
  );

const attemptYear =
  useOnboardingStore(
    (state) =>
      state.attemptYear
  );

const optionalSubject =
  useOnboardingStore(
    (state) =>
      state.optionalSubject
  );

const gsSequence =
  useOnboardingStore(
    (state) =>
      state.gsSequence
  );

const optionalSequence =
  useOnboardingStore(
    (state) =>
      state.optionalSequence
  );

  async function runInitialization() {
    const steps = [
      "Loading UPSC Core Engine...",
      "Loading GS Sequence...",
      "Loading Optional Sequence...",
      "Initializing Revision Engine...",
      "Initializing Scheduler Engine...",
      "Preparing Smart Analytics...",
      "Syncing User Configuration...",
      "Finalizing IntelliPrep OS...",
      "System Ready.",
    ];

    for (
      let i = 0;
      i < steps.length;
      i++
    ) {
      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            700
          )
      );

      setLogs((prev) => [
        ...prev,
        steps[i],
      ]);
    }
  }

  useEffect(() => {
    if (
      hasInitialized.current
    )
      return;

    hasInitialized.current =
      true;

    runInitialization();
  }, []);

  return (
    <OnboardingCard
      title="Initializing IntelliPrep"
      description={`Setting up your intelligent UPSC system${
        name
          ? `, ${name}`
          : ""
      }`}
    >
      <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
        <div className="space-y-3 font-mono text-sm text-green-400">
          {logs.map(
            (log, index) => (
              <div
                key={index}
              >
                {">"} {log}
              </div>
            )
          )}
        </div>
      </div>

      {logs.length === 9 && (
        <div className="mt-8 flex justify-end">
        <button
  onClick={async () => {
  // 1. Save onboarding config
  await saveOnboarding({
    id: crypto.randomUUID(),

    userId: user.uid,

    completed: true,

    name,

    attemptYear,

    optionalSubject,

    gsSequence,

    optionalSequence,
  });

  // 2. Initialize syllabus
  const normalizedData =
    await initializeSyllabus();

  // 3. Initialize schedule
  await initializeSchedule(
    normalizedData.subtopics,
    user.uid
  );

  // 4. Mark onboarding complete
  completeOnboarding();

  // 5. Navigate dashboard
  navigate("/dashboard");
}}
  className="rounded-2xl bg-white px-6 py-4 font-medium text-black"
>
  Enter Dashboard
</button>
        </div>
      )}
    </OnboardingCard>
  );
}

export default
  InitializationStep;