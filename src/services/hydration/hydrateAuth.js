import {
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";

import {
  firebaseApp,
} from "../firestore/config";

import useAuthStore from "../../stores/authStore";

const auth =
  getAuth(firebaseApp);

export function hydrateAuth() {
  onAuthStateChanged(
    auth,
    (user) => {
      const store =
        useAuthStore.getState();

      store.setUser(user);

      store.setAuthInitialized(
        true
      );
    }
  );
}