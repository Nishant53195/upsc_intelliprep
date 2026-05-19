import {
  getOnboarding,
} from "../../db/repositories/onboardingRepository";

import useOnboardingStore from "../../stores/onboardingStore";

export async function hydrateOnboarding(
  userId
) {
  try {
    const onboarding =
      await getOnboarding(
        userId
      );

    if (onboarding) {
      useOnboardingStore
        .getState()
        .hydrateOnboarding(
          onboarding
        );
    } else {
      useOnboardingStore
        .getState()
        .setHydrated(
          true
        );
    }
  } catch (error) {
    console.error(
      "Hydration failed",
      error
    );

    useOnboardingStore
      .getState()
      .setHydrated(
        true
      );
  }
}