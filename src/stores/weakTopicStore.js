import { create } from "zustand";

const useWeakTopicStore = create((set) => ({
  weakTopics: [],

  setWeakTopics: (weakTopics) =>
    set({ weakTopics }),
}));

export default useWeakTopicStore;