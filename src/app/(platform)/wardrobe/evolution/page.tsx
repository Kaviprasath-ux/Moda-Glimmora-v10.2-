"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import * as api from "@/lib/api";
import type { StyleEvolution } from "@/types";

export default function WardrobeEvolutionPage() {
  const [evolution, setEvolution] = useState<StyleEvolution | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const data = await api.getStyleEvolution();
      setEvolution(data);
      setIsLoading(false);
    };
    run();
  }, []);

  if (isLoading) return <LoadingIntelligence message="Mapping your style evolution..." />;

  if (!evolution) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-stone">No evolution data yet.</p>
        <Link href="/wardrobe">
          <Button variant="secondary" className="mt-4">Back to Wardrobe</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/wardrobe" className="inline-flex items-center gap-2 text-stone hover:text-noir mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Wardrobe
      </Link>

      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-gold-muted" />
        <h1 className="font-display text-display-md text-noir">Style Evolution</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <p className="text-xs text-stone">Current phase</p>
          <p className="font-display text-xl text-noir">{evolution.currentPhase}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {evolution.evolutionPath.map((period, idx) => (
          <motion.div key={period.period} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <Card>
              <CardContent className="p-6 space-y-2">
                <p className="font-medium text-noir">{period.period}</p>
                <p className="text-sm text-stone">{period.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {period.dominantElements.map((el) => (
                    <span key={el} className="text-xs px-2 py-1 rounded-full bg-sand-light text-stone">
                      {el}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-xs text-stone mb-2">Emerging interests</p>
            <ul className="text-sm text-noir space-y-1">
              {evolution.emergingInterests.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs text-stone mb-2">Insights</p>
            <ul className="text-sm text-noir space-y-1">
              {evolution.insights.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


