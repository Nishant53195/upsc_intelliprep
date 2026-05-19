import useOnboardingStore from "../../../stores/onboardingStore";

import OnboardingCard from "../components/OnboardingCard";

import optionalSyllabus  from "../../syllabus/data/optionalSyllabus";
import  optionalSubjects  from "../../../constants/optionalSubjects";

function PreparationStep() {
  const studyHoursPerDay =
    useOnboardingStore(
      (state) =>
        state.studyHoursPerDay
    );

  const setStudyHoursPerDay =
    useOnboardingStore(
      (state) =>
        state.setStudyHoursPerDay
    );

  const attemptYear =
    useOnboardingStore(
      (state) =>
        state.attemptYear
    );

  const setAttemptYear =
    useOnboardingStore(
      (state) =>
        state.setAttemptYear
    );

  const setPrelimsDate =
    useOnboardingStore(
      (state) =>
        state.setPrelimsDate
    );

  const setMainsDate =
    useOnboardingStore(
      (state) =>
        state.setMainsDate
    );

  const optionalSubject =
    useOnboardingStore(
      (state) =>
        state.optionalSubject
    );

  const setOptionalSubject =
    useOnboardingStore(
      (state) =>
        state.setOptionalSubject
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

  function handleYearChange(
    value
  ) {
    const year =
      Number(value);

    setAttemptYear(
      year
    );

    if (year === 2027) {
      setPrelimsDate(
        "2027-05-23"
      );

      setMainsDate(
        "2027-08-20"
      );
    }

    if (year === 2028) {
      setPrelimsDate(
        "2028-05-21"
      );

      setMainsDate(
        "2028-08-18"
      );
    }
  }

 function handleOptionalChange(
  value
) {
  setOptionalSubject(
    value
  );

  let topics = [];

  if (value === "Sociology") {
    topics =
      optionalSyllabus.flatMap(
        (paper) =>
          paper.topics || []
      );
  }

  setOptionalSequence(
    topics
  );
}

  return (
    <OnboardingCard
      title="Preparation Setup"
      description="Configure your UPSC preparation profile."
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm text-slate-400">
            Daily Study Hours
          </label>

          <select
            value={
              studyHoursPerDay
            }
            onChange={(e) =>
              setStudyHoursPerDay(
                Number(
                  e.target.value
                )
              )
            }
            className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white outline-none"
          >
            {[5, 6, 7, 8].map(
              (hour) => (
                <option
                  key={hour}
                  value={hour}
                  className="bg-[#161a22]"
                >
                  {hour} Hours
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="text-sm text-slate-400">
            Attempt Year
          </label>

          <select
            value={
              attemptYear
            }
            onChange={(e) =>
              handleYearChange(
                e.target.value
              )
            }
            className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white outline-none"
          >
            <option
              value={2027}
              className="bg-[#161a22]"
            >
              2027
            </option>

            <option
              value={2028}
              className="bg-[#161a22]"
            >
              2028
            </option>
          </select>
        </div>

        <div>
          <label className="text-sm text-slate-400">
            Optional Subject
          </label>

          <select
  value={
    optionalSubject
  }
  onChange={(e) =>
    handleOptionalChange(
      e.target.value
    )
  }
  className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white outline-none"
>
  {optionalSubjects.map(
    (subject) => (
      <option
        key={subject.name}
        value={subject.name}
        className="bg-[#161a22]"
      >
        {subject.name}
      </option>
    )
  )}
</select>
        </div>
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
  PreparationStep;