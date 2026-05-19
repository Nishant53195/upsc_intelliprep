import {
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

import LandingPage from "../pages/LandingPage";
import OnboardingPage from "../pages/OnboardingPage";
import DashboardPage from "../modules/dashboard/pages/DashboardPage";
import StudyPage from "../pages/StudyPage";
import RevisionPage from "../pages/RevisionPage";

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
        <DashboardPage />
     
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

{
  path: "/revision",
  element: (
    <ProtectedRoute>
      <AppLayout>
        <RevisionPage />
      </AppLayout>
    </ProtectedRoute>
  ),
},
]);

export default router;