import useOnboardingStore from "../../../stores/onboardingStore";

import OnboardingCard from "../components/OnboardingCard";

function GSSequenceStep() {
  const gsSequence =
    useOnboardingStore(
      (state) => state.gsSequence
    );

  const setGSSequence =
    useOnboardingStore(
      (state) => state.setGSSequence
    );

  const nextStep =
    useOnboardingStore(
      (state) => state.nextStep
    );

  const previousStep =
    useOnboardingStore(
      (state) =>
        state.previousStep
    );

  const activeSubjects =
    gsSequence.filter(
      (subject) =>
        !subject.lockedAfterPrelims
    );

  const lockedSubjects =
    gsSequence.filter(
      (subject) =>
        subject.lockedAfterPrelims
    );

  function moveUp(index) {
    if (index === 0)
      return;

    const updated = [
      ...activeSubjects,
    ];

    [
      updated[index - 1],
      updated[index],
    ] = [
      updated[index],
      updated[index - 1],
    ];

    setGSSequence([
      ...updated,
      ...lockedSubjects,
    ]);
  }

  function moveDown(index) {
    if (
      index ===
      activeSubjects.length -
        1
    )
      return;

    const updated = [
      ...activeSubjects,
    ];

    [
      updated[index + 1],
      updated[index],
    ] = [
      updated[index],
      updated[index + 1],
    ];

    setGSSequence([
      ...updated,
      ...lockedSubjects,
    ]);
  }

  return (
    <OnboardingCard
      title="GS Sequence"
      description="Arrange GS subjects."
    >
      <div className="space-y-4">
        {activeSubjects.map(
          (
            subject,
            index
          ) => (
            <div
              key={
                subject.name
              }
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4"
            >
              <p className="text-white">
                {
                  subject.name
                }
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    moveUp(
                      index
                    )
                  }
                  className="h-10 w-10 rounded-xl border border-white/10 text-white"
                >
                  ↑
                </button>

                <button
                  onClick={() =>
                    moveDown(
                      index
                    )
                  }
                  className="h-10 w-10 rounded-xl border border-white/10 text-white"
                >
                  ↓
                </button>
              </div>
            </div>
          )
        )}

        {lockedSubjects.map(
          (subject) => (
            <div
              key={
                subject.name
              }
              className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-4 opacity-70"
            >
              <p className="text-slate-400">
                {
                  subject.name
                }
              </p>

              <div className="text-xs text-slate-500">
                Locked
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={
            previousStep
          }
          className="text-slate-400"
        >
          Back
        </button>

        <button
          onClick={nextStep}
          className="rounded-2xl bg-white px-6 py-4 font-medium text-black"
        >
          Continue
        </button>
      </div>
    </OnboardingCard>
  );
}

export default
  GSSequenceStep;