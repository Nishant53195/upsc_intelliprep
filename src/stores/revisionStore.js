import { create } from "zustand";

const useRevisionStore = create((set) => ({
  revisions: [],

  setRevisions: (revisions) => set({ revisions }),
}));

export default useRevisionStore;