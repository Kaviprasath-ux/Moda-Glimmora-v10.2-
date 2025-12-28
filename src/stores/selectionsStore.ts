import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Item } from "@/types";

interface SelectionsState {
  considerations: Item[];
  recentlyViewed: Item[];
  silentSuggestions: { item: Item; reason: string }[];

  // Actions
  addToConsiderations: (item: Item) => void;
  removeFromConsiderations: (itemId: string) => void;
  clearConsiderations: () => void;
  isInConsiderations: (itemId: string) => boolean;
  addToRecentlyViewed: (item: Item) => void;
  setSilentSuggestions: (suggestions: { item: Item; reason: string }[]) => void;
}

export const useSelectionsStore = create<SelectionsState>()(
  persist(
    (set, get) => ({
      considerations: [],
      recentlyViewed: [],
      silentSuggestions: [],

      addToConsiderations: (item) =>
        set((state) => {
          if (state.considerations.some((i) => i.id === item.id)) {
            return state;
          }
          return {
            considerations: [...state.considerations, item],
          };
        }),

      removeFromConsiderations: (itemId) =>
        set((state) => ({
          considerations: state.considerations.filter((item) => item.id !== itemId),
        })),

      clearConsiderations: () => set({ considerations: [] }),

      isInConsiderations: (itemId) =>
        get().considerations.some((item) => item.id === itemId),

      addToRecentlyViewed: (item) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((i) => i.id !== item.id);
          return {
            recentlyViewed: [item, ...filtered].slice(0, 10),
          };
        }),

      setSilentSuggestions: (silentSuggestions) => set({ silentSuggestions }),
    }),
    {
      name: "moda-selections",
      partialize: (state) => ({
        considerations: state.considerations,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);
