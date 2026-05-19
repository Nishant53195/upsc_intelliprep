import useOnboardingStore from "../stores/onboardingStore";

import OnboardingLayout from "../modules/onboarding/components/OnboardingLayout";

import OnboardingSidebar from "../modules/onboarding/components/OnboardingSidebar";

import WelcomeStep from "../modules/onboarding/steps/WelcomeStep";

import PreparationStep from "../modules/onboarding/steps/PreparationStep";

import GSSequenceStep from "../modules/onboarding/steps/GSSequenceStep";

import OptionalSequenceStep from "../modules/onboarding/steps/OptionalSequenceStep";

import InitializationStep from "../modules/onboarding/steps/InitializationStep";

function OnboardingPage() {
  const currentStep =
    useOnboardingStore(
      (state) =>
        state.currentStep
    );

  function renderStep() {
    switch (
      currentStep
    ) {
      case 1:
        return (
          <WelcomeStep />
        );

      case 2:
        return (
          <PreparationStep />
        );

      case 3:
        return (
          <GSSequenceStep />
        );

      case 4:
        return (
          <OptionalSequenceStep />
        );

      case 5:
        return (
          <InitializationStep />
        );

      default:
        return (
          <WelcomeStep />
        );
    }
  }

  return (
    <OnboardingLayout
      sidebar={
        <OnboardingSidebar
          currentStep={
            currentStep
          }
        />
      }
    >
      {renderStep()}
    </OnboardingLayout>
  );
}

export default
  OnboardingPage;