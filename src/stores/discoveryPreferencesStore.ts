import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DeliveryUrgency = "flexible" | "soon" | "urgent";

export interface DiscoveryPreferences {
  occasion: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
  deliveryUrgency: DeliveryUrgency;
}

interface DiscoveryPreferencesState {
  preferences: DiscoveryPreferences;
  setPreferences: (data: Partial<DiscoveryPreferences>) => void;
  resetPreferences: () => void;
}

const initialPreferences: DiscoveryPreferences = {
  occasion: null,
  budgetMin: null,
  budgetMax: null,
  deliveryUrgency: "flexible",
};

export const useDiscoveryPreferencesStore = create<DiscoveryPreferencesState>()(
  persist(
    (set) => ({
      preferences: initialPreferences,
      setPreferences: (data) =>
        set((state) => ({
          preferences: { ...state.preferences, ...data },
        })),
      resetPreferences: () => set({ preferences: initialPreferences }),
    }),
    {
      name: "moda-discovery-preferences",
      partialize: (state) => ({ preferences: state.preferences }),
    }
  )
);


