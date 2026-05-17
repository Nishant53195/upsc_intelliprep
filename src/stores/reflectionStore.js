import { create } from "zustand";

const useReflectionStore = create((set) => ({
  reflections: [],

  setReflections: (reflections) =>
    set({ reflections }),
}));

export default useReflectionStore;