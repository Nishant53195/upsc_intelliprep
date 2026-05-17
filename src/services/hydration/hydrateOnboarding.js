import {
  getOnboarding,
} from "../../db/repositories/onboardingRepository";

import useOnboardingStore from "../../stores/onboardingStore";

export async function hydrateOnboarding(
  userId
) {
  const onboarding =
    await getOnboarding(userId);

  if (!onboarding) return;

  useOnboardingStore
    .getState()
    .hydrateOnboarding(
      onboarding
    );
}