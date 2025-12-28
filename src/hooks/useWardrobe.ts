"use client";

import { useCallback, useEffect } from "react";
import { useWardrobeStore } from "@/stores/wardrobeStore";
import * as api from "@/lib/api";
import type { WardrobeItem } from "@/types";

export function useWardrobe() {
  const {
    items,
    gaps,
    summary,
    isLoading,
    selectedCategory,
    setItems,
    addItem,
    removeItem,
    setGaps,
    setSummary,
    setLoading,
    setSelectedCategory,
    getFilteredItems,
  } = useWardrobeStore();

  const fetchWardrobe = useCallback(async () => {
    setLoading(true);
    try {
      const [wardrobeItems, wardrobeGaps, wardrobeSummary] = await Promise.all([
        api.getWardrobe(),
        api.getWardrobeGaps(),
        api.getWardrobeSummary(),
      ]);
      setItems(wardrobeItems);
      setGaps(wardrobeGaps);
      setSummary(wardrobeSummary);
    } finally {
      setLoading(false);
    }
  }, [setItems, setGaps, setSummary, setLoading]);

  const addToWardrobe = useCallback(
    async (item: WardrobeItem) => {
      try {
        await api.addToWardrobe(item);
        addItem(item);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to add item",
        };
      }
    },
    [addItem]
  );

  useEffect(() => {
    fetchWardrobe();
  }, [fetchWardrobe]);

  return {
    items,
    gaps,
    summary,
    isLoading,
    selectedCategory,
    filteredItems: getFilteredItems(),
    fetchWardrobe,
    addToWardrobe,
    removeItem,
    setSelectedCategory,
  };
}
