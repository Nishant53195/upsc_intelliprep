import { create } from "zustand";

const useOnboardingStore = create(
  (set) => ({
    targetYear: "",

    optionalSubject: "",

    gsSequence: [],

    optionalSequence: [],

    completed: false,

    setTargetYear: (year) =>
      set({
        targetYear: year,
      }),

    setOptionalSubject: (
      optionalSubject
    ) =>
      set({
        optionalSubject,
      }),

    setGsSequence: (gsSequence) =>
      set({
        gsSequence,
      }),

    setOptionalSequence: (
      optionalSequence
    ) =>
      set({
        optionalSequence,
      }),

    setCompleted: (completed) =>
      set({
        completed,
      }),

    hydrateOnboarding: (data) =>
      set({
        ...data,
      }),

    resetOnboarding: () =>
      set({
        targetYear: "",
        optionalSubject: "",
        gsSequence: [],
        optionalSequence: [],
        completed: false,
      }),
  })
);

export default useOnboardingStore;