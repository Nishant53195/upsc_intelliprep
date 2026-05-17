import { create } from "zustand";

const useSyncStore = create((set) => ({
  syncing: false,

  setSyncing: (syncing) =>
    set({ syncing }),
}));

export default useSyncStore;