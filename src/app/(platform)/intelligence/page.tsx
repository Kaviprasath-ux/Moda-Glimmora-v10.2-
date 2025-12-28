"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IntelligenceBadge } from "@/components/shared/IntelligenceBadge";
import { AvailabilityBar } from "@/components/shared/AvailabilityBar";
import { FitScore } from "@/components/shared/FitScore";
import { ReasoningExpander } from "@/components/shared/ReasoningExpander";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import { useFashionAgent } from "@/hooks/useFashionAgent";
import { useWardrobe } from "@/hooks/useWardrobe";
import { useAvailability } from "@/hooks/useAvailability";
import * as api from "@/lib/api";
import { formatCurrency, getTimeGreeting } from "@/lib/utils";
import type { Discovery, Item, BrandRecommendation, Brand } from "@/types";

export default function IntelligenceHubPage() {
  const { insight, isLoading: agentLoading } = useFashionAgent();
  const { gaps } = useWardrobe();
  const { alerts } = useAvailability();
  const [discoveries, setDiscoveries] = useState<(Discovery & { item?: Item })[]>([]);
  const [brandRecs, setBrandRecs] = useState<(BrandRecommendation & { brand?: Brand })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [discoveriesData, brandsData] = await Promise.all([
        api.getStyleAlignedDiscoveries(),
        api.getBrandRecommendations(),
      ]);
      setDiscoveries(discoveriesData);
      setBrandRecs(brandsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading || agentLoading) {
    return <LoadingIntelligence message="Preparing your intelligence..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Agent Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-gold-soft/30 bg-gradient-to-br from-surface-elevated to-ivory-warm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-soft/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-gold-muted" />
              </div>
              <div className="flex-1 space-y-3">
                <IntelligenceBadge label="Fashion Agent Insight" />
                <p className="font-display text-lg text-noir">
                  {insight?.greeting || getTimeGreeting() + ", there."}
                </p>
                <p className="text-stone">{insight?.insight}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm">Yes, show me aligned pieces</Button>
                  <Button size="sm" variant="secondary">Tell me more</Button>
                  <Button size="sm" variant="ghost">Not now</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Wardrobe Intelligence */}
      {gaps.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-display text-xl text-noir mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-gold-muted" />
            Wardrobe Intelligence
          </h2>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-noir mb-2">Gap Detected</h3>
              <p className="text-stone mb-4">{gaps[0]?.reasoning}</p>
              <div className="flex flex-wrap gap-2">
                <Link href="/wardrobe/gaps">
                  <Button size="sm">Explore Options</Button>
                </Link>
                <Button size="sm" variant="secondary">Dismiss</Button>
                <Button size="sm" variant="ghost">Why this gap?</Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      )}

      {/* Availability Intelligence */}
      {alerts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-xl text-noir mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gold-muted" />
            Availability Intelligence
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-noir">{alerts[0]?.itemName}</h3>
              </div>
              <p className="text-sm text-stone mb-3">
                Previously: {alerts[0]?.previousProbability}% probability → Now: {alerts[0]?.currentProbability}% in {alerts[0]?.bestSource.location}
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href={`/item/${alerts[0]?.itemId}`}>
                  <Button size="sm">View Intelligence</Button>
                </Link>
                <Button size="sm" variant="secondary">Begin Acquisition</Button>
                <Button size="sm" variant="ghost">Not interested</Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      )}

      {/* Style-Aligned Discoveries */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-noir">Style-Aligned Discoveries</h2>
          <Button variant="ghost" size="sm" className="text-gold-muted">
            Why these?
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {discoveries.slice(0, 4).map((discovery, index) => (
            <motion.div
              key={discovery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link href={`/item/${discovery.itemId}`}>
                <Card className="overflow-hidden hover:shadow-moda-lg transition-shadow cursor-pointer">
                  <div className="aspect-[3/4] bg-sand-light relative">
                    <div className="absolute inset-0 flex items-center justify-center text-stone">
                      [Image]
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <p className="text-sm text-stone">{discovery.item?.brand.name}</p>
                      <p className="font-medium text-noir">{discovery.item?.name}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <FitScore score={discovery.fitScore} size="sm" showLabel={false} />
                      <AvailabilityBar
                        probability={discovery.availabilityScore}
                        size="sm"
                        showLabel={false}
                        className="w-20"
                      />
                    </div>
                    <ReasoningExpander
                      reasons={discovery.item?.aiReasoning.supportingReasons || []}
                      primaryReason={discovery.reason}
                      confidence={discovery.item?.aiReasoning.confidence}
                    />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Universe Recommendations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-display text-xl text-noir mb-4">Universe Recommendations</h2>
        <p className="text-stone mb-4">Based on your philosophy, explore these brand universes:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {brandRecs.slice(0, 2).map((rec, index) => (
            <Link key={rec.brandId} href={`/universes/${rec.brandId}`}>
              <Card className="overflow-hidden hover:shadow-moda-lg transition-shadow cursor-pointer">
                <div className="aspect-video bg-sand-light relative">
                  <div className="absolute inset-0 flex items-center justify-center text-stone">
                    [Brand Image]
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display text-lg font-medium text-noir mb-1">
                    {rec.brand?.name}
                  </h3>
                  <p className="text-sm text-stone mb-3">{rec.reason}</p>
                  <Button variant="ghost" size="sm" className="gap-1 px-0 text-gold-muted">
                    Enter Universe <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
