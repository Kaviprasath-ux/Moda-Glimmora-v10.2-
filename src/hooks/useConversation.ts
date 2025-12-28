"use client";

import { useCallback } from "react";
import { useConversationStore } from "@/stores/conversationStore";
import * as api from "@/lib/api";

export function useConversation() {
  const {
    messages,
    isLoading,
    currentDirections,
    addMessage,
    setLoading,
    setDirections,
    clearConversation,
  } = useConversationStore();

  const sendMessage = useCallback(
    async (content: string) => {
      // Add user message
      addMessage({ role: "user", content });
      setLoading(true);

      try {
        const response = await api.sendConversation(content);

        // Add assistant response
        addMessage({
          role: "assistant",
          content: response.understanding,
          directions: response.directions,
        });

        setDirections(response.directions);

        return { success: true, response };
      } catch (error) {
        addMessage({
          role: "assistant",
          content:
            "I apologize, but I encountered an issue processing your request. Please try again.",
        });
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to send message",
        };
      } finally {
        setLoading(false);
      }
    },
    [addMessage, setLoading, setDirections]
  );

  const reset = useCallback(() => {
    clearConversation();
  }, [clearConversation]);

  return {
    messages,
    isLoading,
    currentDirections,
    sendMessage,
    reset,
  };
}
