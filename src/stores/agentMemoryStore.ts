import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MemorySource =
  | "identity_onboarding"
  | "explicit_setting"
  | "feedback"
  | "inferred";

export interface MemoryTrait {
  id: string;
  label: string;
  value: string;
  source: MemorySource;
  updatedAt: string;
}

interface AgentMemoryState {
  traits: MemoryTrait[];
  upsertTrait: (trait: Omit<MemoryTrait, "updatedAt">) => void;
  removeTrait: (id: string) => void;
  reset: () => void;
}

export const useAgentMemoryStore = create<AgentMemoryState>()(
  persist(
    (set) => ({
      traits: [],
      upsertTrait: (trait) =>
        set((state) => {
          const updatedAt = new Date().toISOString();
          const existingIdx = state.traits.findIndex((t) => t.id === trait.id);
          if (existingIdx === -1) {
            return { traits: [{ ...trait, updatedAt }, ...state.traits] };
          }
          const next = [...state.traits];
          next[existingIdx] = { ...trait, updatedAt };
          return { traits: next };
        }),
      removeTrait: (id) =>
        set((state) => ({ traits: state.traits.filter((t) => t.id !== id) })),
      reset: () => set({ traits: [] }),
    }),
    { name: "moda-agent-memory" }
  )
);


