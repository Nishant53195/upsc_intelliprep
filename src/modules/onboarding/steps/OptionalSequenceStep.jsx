import useOnboardingStore from "../../../stores/onboardingStore";

import OnboardingCard from "../components/OnboardingCard";

function OptionalSequenceStep() {
  const optionalSequence =
    useOnboardingStore(
      (state) =>
        state.optionalSequence
    );

  const setOptionalSequence =
    useOnboardingStore(
      (state) =>
        state.setOptionalSequence
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

  function moveUp(index) {
    if (index === 0)
      return;

    const updated = [
      ...optionalSequence,
    ];

    [
      updated[index - 1],
      updated[index],
    ] = [
      updated[index],
      updated[index - 1],
    ];

    setOptionalSequence(
      updated
    );
  }

  function moveDown(index) {
    if (
      index ===
      optionalSequence.length -
        1
    )
      return;

    const updated = [
      ...optionalSequence,
    ];

    [
      updated[index + 1],
      updated[index],
    ] = [
      updated[index],
      updated[index + 1],
    ];

    setOptionalSequence(
      updated
    );
  }

  return (
    <OnboardingCard
      title="Optional Sequence"
      description="Arrange optional chapters."
    >
      <div className="space-y-4">
        {optionalSequence.map(
          (
            chapter,
            index
          ) => (
            <div
              key={
                chapter.id
              }
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4"
            >
              <p className="text-white">
                {
                  chapter.name
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
          Initialize
        </button>
      </div>
    </OnboardingCard>
  );
}

export default
  OptionalSequenceStep;