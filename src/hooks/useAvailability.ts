"use client";

import { useState, useCallback, useEffect } from "react";
import * as api from "@/lib/api";
import type { AvailabilityAlert } from "@/types";

export function useAvailability() {
  const [alerts, setAlerts] = useState<AvailabilityAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAlerts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getAvailabilityAlerts();
      setAlerts(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const subscribeToItem = useCallback(async (itemId: string) => {
    try {
      await api.subscribeToAvailability(itemId);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Subscription failed",
      };
    }
  }, []);

  const checkItemAvailability = useCallback(
    async (itemId: string, size: string, color: string) => {
      setIsLoading(true);
      try {
        const result = await api.checkAvailability(itemId, size, color);
        return { success: true, data: result };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Check failed",
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return {
    alerts,
    isLoading,
    fetchAlerts,
    subscribeToItem,
    checkItemAvailability,
  };
}
