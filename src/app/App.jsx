import {
  useEffect,
} from "react";

import {
  RouterProvider,
} from "react-router-dom";

import router from "../routes";

import useAuthStore from "../stores/authStore";

import {
  hydrateOnboarding,
} from "../services/hydration/hydrateOnboarding";

import {
  hydrateAuth,
} from "../services/hydration/hydrateAuth";


import { db } from "../db/dexie";
import { regenerateScheduleFromToday } from "../engines/scheduler/regenerateScheduleFromToday";
function App() {
  const user =
    useAuthStore(
      (state) => state.user
    );

  useEffect(() => {
    window.db=db;
    window.regenerateScheduleFromToday=regenerateScheduleFromToday
    hydrateAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    hydrateOnboarding(
      user.uid
    );
  }, [user]);

  return (
    <RouterProvider
      router={router}
    />
  );
}

export default App;