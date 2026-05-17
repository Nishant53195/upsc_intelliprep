import { create } from "zustand";

const useScheduleStore = create((set) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  clearTasks: () => set({ tasks: [] }),
}));

export default useScheduleStore;