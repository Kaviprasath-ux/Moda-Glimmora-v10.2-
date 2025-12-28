"use client";

import { useState, useCallback, useEffect } from "react";
import * as api from "@/lib/api";
import type { AgentInsight, StyleEvolution, AgentPreferences } from "@/types";

export function useFashionAgent() {
  const [insight, setInsight] = useState<AgentInsight | null>(null);
  const [evolution, setEvolution] = useState<StyleEvolution | null>(null);
  const [preferences, setPreferences] = useState<AgentPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInsight = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getAgentInsight();
      setInsight(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchEvolution = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getStyleEvolution();
      setEvolution(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPreferences = useCallback(async () => {
    try {
      const data = await api.getAgentPreferences();
      setPreferences(data);
    } catch (error) {
      console.error("Failed to fetch agent preferences:", error);
    }
  }, []);

  const updatePreferences = useCallback(
    async (data: Partial<AgentPreferences>) => {
      try {
        const updated = await api.updateAgentPreferences(data);
        setPreferences(updated);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Update failed",
        };
      }
    },
    []
  );

  const resetMemory = useCallback(async () => {
    try {
      const result = await api.resetAgentMemory();
      return { success: true, message: result.message };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Reset failed",
      };
    }
  }, []);

  useEffect(() => {
    fetchInsight();
    fetchPreferences();
  }, [fetchInsight, fetchPreferences]);

  return {
    insight,
    evolution,
    preferences,
    isLoading,
    fetchInsight,
    fetchEvolution,
    updatePreferences,
    resetMemory,
  };
}
