"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IntelligenceBadge } from "@/components/shared/IntelligenceBadge";
import { FitScore } from "@/components/shared/FitScore";
import { AvailabilityBar } from "@/components/shared/AvailabilityBar";
import { EmptyState } from "@/components/shared/EmptyState";
import { useSelectionsStore } from "@/stores/selectionsStore";
import * as api from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import type { Item } from "@/types";

export default function SelectionsPage() {
  const { considerations, removeFromConsiderations, silentSuggestions, setSilentSuggestions } = useSelectionsStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const data = await api.getSilentSuggestions();
      setSilentSuggestions(data as { item: Item; reason: string }[]);
      setIsLoading(false);
    };
    fetchSuggestions();
  }, [setSilentSuggestions]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-display-md text-noir">Wishlist</h1>
        <p className="text-stone">Saved pieces and intelligent suggestions</p>
      </div>

      {/* Silent Suggestions */}
      {silentSuggestions.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <IntelligenceBadge label="Silent Suggestions" />
          </div>
          <p className="text-sm text-stone mb-4">
            Based on your wardrobe gaps and availability intelligence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {silentSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.item?.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-gold-soft/30 bg-gradient-to-br from-surface-elevated to-ivory-warm">
                  <CardContent className="p-4 flex gap-4">
                    <div className="w-24 h-24 bg-sand-light rounded-lg flex-shrink-0 flex items-center justify-center text-xs text-stone">
                      [Image]
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gold-muted">{suggestion.item?.brand.name}</p>
                      <p className="font-medium text-noir">{suggestion.item?.name}</p>
                      <p className="text-sm text-stone mt-1 line-clamp-2">{suggestion.reason}</p>
                      <Link href={`/item/${suggestion.item?.id}`}>
                        <Button size="sm" variant="secondary" className="mt-2 gap-1">
                          View Intelligence <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Wishlist */}
      <section>
        <h2 className="font-display text-xl text-noir mb-4">Your Wishlist</h2>

        {considerations.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            description="Save pieces you’re considering and review them here anytime"
            action={{
              label: "Discover pieces",
              onClick: () => window.location.href = "/discover",
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {considerations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <div className="aspect-[3/4] bg-sand-light relative">
                    <div className="absolute inset-0 flex items-center justify-center text-stone">
                      [Image]
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-surface-elevated/80 hover:bg-surface-elevated"
                      onClick={() => removeFromConsiderations(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <Link href={`/universes/${item.brand.id}`} className="text-xs text-gold-muted hover:text-gold-deep">
                      {item.brand.name}
                    </Link>
                    <Link href={`/item/${item.id}`}>
                      <h3 className="font-medium text-noir hover:text-gold-deep transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-noir mt-1">
                      {formatCurrency(item.price.amount, item.price.currency)}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-sand/50">
                      <FitScore score={item.fitIntelligence.overallScore} size="sm" showLabel={false} />
                      <AvailabilityBar
                        probability={item.availabilityIntelligence.globalProbability}
                        showLabel={false}
                        size="sm"
                        className="w-24"
                      />
                    </div>
                    <Link
                      href={`/acquire?itemId=${encodeURIComponent(item.id)}&size=${encodeURIComponent(item.sizes?.[Math.floor(item.sizes.length / 2)] || "")}&color=${encodeURIComponent(item.colors?.[0]?.name || "")}`}
                    >
                      <Button size="sm" className="w-full mt-3">
                        Begin Acquisition
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
