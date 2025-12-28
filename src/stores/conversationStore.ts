import { create } from "zustand";
import type { ConversationMessage, Direction } from "@/types";

interface ConversationState {
  messages: ConversationMessage[];
  isLoading: boolean;
  currentDirections: Direction[];

  // Actions
  addMessage: (message: Omit<ConversationMessage, "id" | "timestamp">) => void;
  setLoading: (loading: boolean) => void;
  setDirections: (directions: Direction[]) => void;
  clearConversation: () => void;
}

export const useConversationStore = create<ConversationState>()((set) => ({
  messages: [],
  isLoading: false,
  currentDirections: [],

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: `msg_${Date.now()}`,
          timestamp: new Date().toISOString(),
        },
      ],
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setDirections: (currentDirections) => set({ currentDirections }),

  clearConversation: () =>
    set({
      messages: [],
      currentDirections: [],
    }),
}));
