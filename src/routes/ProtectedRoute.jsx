import { Navigate } from "react-router-dom";

import useAuthStore from "../stores/authStore";

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

  if (!authInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;