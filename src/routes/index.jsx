import {
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

import LandingPage from "../pages/LandingPage";
import OnboardingPage from "../pages/OnboardingPage";
import DashboardPage from "../pages/DashboardPage";
import StudyPage from "../pages/StudyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },

 {
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <AppLayout>
        <DashboardPage />
      </AppLayout>
    </ProtectedRoute>
  ),
},

 {
  path: "/study",
  element: (
    <ProtectedRoute>
      <AppLayout>
        <StudyPage />
      </AppLayout>
    </ProtectedRoute>
  ),
},
]);

export default router;