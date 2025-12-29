"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import * as api from "@/lib/api";
import type { WardrobeGap, Item } from "@/types";

export default function WardrobeGapsPage() {
  const [gaps, setGaps] = useState<(WardrobeGap & { suggestions?: Item[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const data = await api.getWardrobeGaps();
      setGaps(data as (WardrobeGap & { suggestions?: Item[] })[]);
      setIsLoading(false);
    };
    run();
  }, []);

  if (isLoading) return <LoadingIntelligence message="Analyzing wardrobe gaps..." />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/wardrobe" className="inline-flex items-center gap-2 text-stone hover:text-noir mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Wardrobe
      </Link>

      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="h-5 w-5 text-gold-muted" />
        <h1 className="font-display text-display-md text-noir">Gap Analysis</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gaps.map((gap, index) => (
          <motion.div
            key={gap.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{gap.category}</span>
                  <Badge variant="secondary">{gap.priority}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-stone">{gap.description}</p>
                <p className="text-sm text-noir">{gap.reasoning}</p>
                <div className="text-xs text-stone">
                  Unlocks {gap.impact.newOutfits} new outfits •{" "}
                  {gap.impact.occasions.join(", ")}
                </div>

                {gap.suggestions && gap.suggestions.length > 0 && (
                  <div className="pt-2 border-t border-sand/50">
                    <p className="text-xs text-stone mb-2">Suggested pieces</p>
                    <div className="flex flex-wrap gap-2">
                      {gap.suggestions.slice(0, 3).map((item) => (
                        <Link key={item.id} href={`/item/${item.id}`}>
                          <Button size="sm" variant="secondary">
                            View Intelligence
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


