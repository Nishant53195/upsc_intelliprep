const steps = [
  "Welcome",
  "Preparation Config",
  "GS Sequence",
  "Optional Sequence",
  "Initialization",
];

function OnboardingSidebar({
  currentStep,
}) {
  return (
    <div className="flex h-full flex-col justify-between p-10">
      <div>
        <h1 className="text-5xl font-black tracking-tight">
          UPSC
        </h1>

        <h1 className="mt-1 text-5xl font-black tracking-tight">
          IntelliPrep
        </h1>

        <p className="mt-4 text-slate-300">
          System Initialization
        </p>

        <div className="mt-16 space-y-6">
          {steps.map(
            (
              step,
              index
            ) => {
              const active =
                currentStep ===
                index + 1;

              return (
                <div
                  key={step}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm ${
                      active
                        ? "border-white bg-white text-black shadow-lg shadow-black/20"
                        : "border-white/10 text-slate-300"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <p
                      className={`text-sm ${
                        active
                          ? "text-white"
                          : "text-slate-300"
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="text-sm text-slate-400">
        IntelliPrep OS v1.0
      </div>
    </div>
  );
}

export default
  OnboardingSidebar;