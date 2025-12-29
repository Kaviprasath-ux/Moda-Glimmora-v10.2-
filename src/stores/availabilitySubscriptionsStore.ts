import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AvailabilitySubscription {
  itemId: string;
  threshold: number;
  createdAt: string;
}

interface AvailabilitySubscriptionsState {
  subscriptions: Record<string, AvailabilitySubscription>;
  subscribe: (itemId: string, threshold: number) => void;
  unsubscribe: (itemId: string) => void;
  getSubscription: (itemId: string) => AvailabilitySubscription | null;
  clear: () => void;
}

export const useAvailabilitySubscriptionsStore =
  create<AvailabilitySubscriptionsState>()(
    persist(
      (set, get) => ({
        subscriptions: {},
        subscribe: (itemId, threshold) =>
          set((state) => ({
            subscriptions: {
              ...state.subscriptions,
              [itemId]: { itemId, threshold, createdAt: new Date().toISOString() },
            },
          })),
        unsubscribe: (itemId) =>
          set((state) => {
            const next = { ...state.subscriptions };
            delete next[itemId];
            return { subscriptions: next };
          }),
        getSubscription: (itemId) => get().subscriptions[itemId] ?? null,
        clear: () => set({ subscriptions: {} }),
      }),
      {
        name: "moda-availability-subs",
      }
    )
  );


