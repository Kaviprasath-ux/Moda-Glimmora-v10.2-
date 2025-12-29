import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FashionIdentity, BodyIntelligence, AgentPreferences } from "@/types";

interface IdentityState {
  currentStep: number;
  completedSteps: string[];
  philosophies: string[];
  culturalAffinities: string[];
  bodyIntelligence: Partial<BodyIntelligence>;
  occasionPriorities: string[];
  colorPreferences: {
    primary: string[];
    accent: string[];
    avoid: string[];
  };
  agentPreferences: Partial<AgentPreferences>;

  // Actions
  setCurrentStep: (step: number) => void;
  completeStep: (stepId: string) => void;
  setPhilosophies: (philosophies: string[]) => void;
  setCulturalAffinities: (affinities: string[]) => void;
  setBodyIntelligence: (data: Partial<BodyIntelligence>) => void;
  setOccasionPriorities: (priorities: string[]) => void;
  setColorPreferences: (preferences: {
    primary: string[];
    accent: string[];
    avoid: string[];
  }) => void;
  setAgentPreferences: (preferences: Partial<AgentPreferences>) => void;
  reset: () => void;
  getIdentity: () => Partial<FashionIdentity>;
}

const initialState = {
  currentStep: 0,
  completedSteps: [] as string[],
  philosophies: [] as string[],
  culturalAffinities: [] as string[],
  bodyIntelligence: {} as Partial<BodyIntelligence>,
  occasionPriorities: [] as string[],
  colorPreferences: {
    primary: [] as string[],
    accent: [] as string[],
    avoid: [] as string[],
  },
  agentPreferences: {} as Partial<AgentPreferences>,
};

export const useIdentityStore = create<IdentityState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),

      completeStep: (stepId) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(stepId)
            ? state.completedSteps
            : [...state.completedSteps, stepId],
        })),

      setPhilosophies: (philosophies) => set({ philosophies }),

      setCulturalAffinities: (culturalAffinities) => set({ culturalAffinities }),

      setBodyIntelligence: (data) =>
        set((state) => ({
          bodyIntelligence: { ...state.bodyIntelligence, ...data },
        })),

      setOccasionPriorities: (occasionPriorities) => set({ occasionPriorities }),

      setColorPreferences: (colorPreferences) => set({ colorPreferences }),

      setAgentPreferences: (preferences) =>
        set((state) => ({
          agentPreferences: { ...state.agentPreferences, ...preferences },
        })),

      reset: () => set(initialState),

      getIdentity: () => {
        const state = get();
        return {
          philosophies: state.philosophies,
          culturalAffinities: state.culturalAffinities,
          occasionPriorities: state.occasionPriorities,
          colorPreferences: state.colorPreferences,
          confidenceLevel: 50,
          brandAffinities: [],
        };
      },
    }),
    {
      name: "moda-identity",
      partialize: (state) => ({
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        philosophies: state.philosophies,
        culturalAffinities: state.culturalAffinities,
        bodyIntelligence: state.bodyIntelligence,
        occasionPriorities: state.occasionPriorities,
        colorPreferences: state.colorPreferences,
        agentPreferences: state.agentPreferences,
      }),
    }
  )
);
