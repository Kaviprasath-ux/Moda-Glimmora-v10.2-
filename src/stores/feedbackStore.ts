import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FeedbackType = "reasoning_helpful";

export interface FeedbackEntry {
  itemId: string;
  type: FeedbackType;
  value: "up" | "down";
  timestamp: string;
}

interface FeedbackState {
  entries: FeedbackEntry[];
  record: (entry: Omit<FeedbackEntry, "timestamp">) => void;
  getLatestForItem: (itemId: string, type: FeedbackType) => FeedbackEntry | null;
  clear: () => void;
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set, get) => ({
      entries: [],
      record: (entry) =>
        set((state) => ({
          entries: [
            {
              ...entry,
              timestamp: new Date().toISOString(),
            },
            ...state.entries,
          ].slice(0, 200),
        })),
      getLatestForItem: (itemId, type) =>
        get().entries.find((e) => e.itemId === itemId && e.type === type) ?? null,
      clear: () => set({ entries: [] }),
    }),
    { name: "moda-feedback" }
  )
);


