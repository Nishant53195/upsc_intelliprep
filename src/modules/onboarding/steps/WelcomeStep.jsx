import useOnboardingStore from "../../../stores/onboardingStore";

import OnboardingCard from "../components/OnboardingCard";

function WelcomeStep() {
  const name =
    useOnboardingStore(
      (state) => state.name
    );

  const setName =
    useOnboardingStore(
      (state) => state.setName
    );

  const nextStep =
    useOnboardingStore(
      (state) => state.nextStep
    );

  return (
    <OnboardingCard
      title="Welcome to IntelliPrep"
      description="Your intelligent UPSC preparation system."
    >
      <div>
        <label className="text-sm text-slate-400">
          Your Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Enter your name"
          className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white outline-none placeholder:text-slate-500"
        />
      </div>

      <div className="mt-10 flex justify-end">
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
  WelcomeStep;