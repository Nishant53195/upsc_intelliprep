import { Navigate } from "react-router-dom";

import useAuthStore from "../stores/authStore";

import useOnboardingStore from "../stores/onboardingStore";

import AuthLoader from "../modules/auth/components/AuthLoader";

function ProtectedRoute({
  children,
}) {
  const user =
    useAuthStore(
      (state) => state.user
    );

  const authInitialized =
    useAuthStore(
      (state) =>
        state.authInitialized
    );

  const onboardingCompleted =
    useOnboardingStore(
      (state) =>
        state.isOnboardingCompleted
    );

  const hydrated =
    useOnboardingStore(
      (state) =>
        state.hydrated
    );

  // Wait for Firebase auth restore
  if (!authInitialized) {
    return <AuthLoader />;
  }

  // Not logged in
  if (!user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // Wait for Dexie onboarding hydration
  if (!hydrated) {
    return <AuthLoader />;
  }

  // User logged in but onboarding incomplete
  if (
    !onboardingCompleted
  ) {
    return (
      <Navigate
        to="/onboarding"
        replace
      />
    );
  }

  // Everything ready
  return children;
}

export default ProtectedRoute;