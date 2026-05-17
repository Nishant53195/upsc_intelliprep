import { useEffect } from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  loginWithGoogle,
} from "../services/firestore/auth";

import {
  getOnboarding,
} from "../db/repositories/onboardingRepository";

import useAuthStore from "../stores/authStore";

function LandingPage() {
  const navigate = useNavigate();

  const user =
    useAuthStore(
      (state) => state.user
    );

  const authInitialized =
    useAuthStore(
      (state) =>
        state.authInitialized
    );

  const setUser =
    useAuthStore(
      (state) => state.setUser
    );

  useEffect(() => {
    async function checkUser() {
      if (
        !authInitialized
      )
        return;

      if (!user) return;

      const onboarding =
        await getOnboarding(
          user.uid
        );

      if (
        onboarding?.completed
      ) {
        navigate(
          "/dashboard"
        );
      } else {
        navigate(
          "/onboarding"
        );
      }
    }

    checkUser();
  }, [
    user,
    authInitialized,
    navigate,
  ]);

  async function handleLogin() {
    try {
      const user =
        await loginWithGoogle();

      setUser(user);

      const onboarding =
        await getOnboarding(
          user.uid
        );

      if (
        onboarding?.completed
      ) {
        navigate(
          "/dashboard"
        );
      } else {
        navigate(
          "/onboarding"
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8">
        <h1 className="text-3xl font-bold">
          UPSC IntelliPrep
        </h1>

        <p className="mt-3 text-slate-400">
          Intelligent UPSC
          Preparation Operating
          System
        </p>

        <button
          onClick={handleLogin}
          className="mt-8 w-full rounded-xl bg-blue-600 px-4 py-3 font-medium hover:bg-blue-500"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default LandingPage;