import { create } from "zustand";
import type { WardrobeItem, WardrobeGap, WardrobeSummary } from "@/types";

interface WardrobeState {
  items: WardrobeItem[];
  gaps: WardrobeGap[];
  summary: WardrobeSummary | null;
  isLoading: boolean;
  selectedCategory: string | null;

  // Actions
  setItems: (items: WardrobeItem[]) => void;
  addItem: (item: WardrobeItem) => void;
  removeItem: (itemId: string) => void;
  setGaps: (gaps: WardrobeGap[]) => void;
  setSummary: (summary: WardrobeSummary) => void;
  setLoading: (loading: boolean) => void;
  setSelectedCategory: (category: string | null) => void;
  getFilteredItems: () => WardrobeItem[];
}

export const useWardrobeStore = create<WardrobeState>()((set, get) => ({
  items: [],
  gaps: [],
  summary: null,
  isLoading: false,
  selectedCategory: null,

  setItems: (items) => set({ items }),

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),

  setGaps: (gaps) => set({ gaps }),

  setSummary: (summary) => set({ summary }),

  setLoading: (isLoading) => set({ isLoading }),

  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

  getFilteredItems: () => {
    const state = get();
    if (!state.selectedCategory) return state.items;
    return state.items.filter(
      (item) => item.category === state.selectedCategory
    );
  },
}));
