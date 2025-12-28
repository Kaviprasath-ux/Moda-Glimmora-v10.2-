"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Bell, ThumbsUp, ThumbsDown, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IntelligenceBadge } from "@/components/shared/IntelligenceBadge";
import { AvailabilityBar } from "@/components/shared/AvailabilityBar";
import { FitScore } from "@/components/shared/FitScore";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import { useSelectionsStore } from "@/stores/selectionsStore";
import * as api from "@/lib/api";
import { formatCurrency, getFitPredictionColor, cn } from "@/lib/utils";
import type { Item } from "@/types";

export default function ItemPage() {
  const params = useParams();
  const itemId = params.itemId as string;
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToConsiderations, isInConsiderations } = useSelectionsStore();

  useEffect(() => {
    const fetchItem = async () => {
      const data = await api.getItem(itemId);
      setItem(data);
      if (data) {
        setSelectedSize(data.sizes[Math.floor(data.sizes.length / 2)]);
      }
      setIsLoading(false);
    };
    fetchItem();
  }, [itemId]);

  if (isLoading) {
    return <LoadingIntelligence message="Loading intelligence..." />;
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-stone">Item not found.</p>
        <Link href="/intelligence">
          <Button variant="secondary" className="mt-4">
            Back to Intelligence Hub
          </Button>
        </Link>
      </div>
    );
  }

  const inConsiderations = isInConsiderations(item.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/intelligence" className="inline-flex items-center gap-2 text-stone hover:text-noir mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-[3/4] bg-sand-light rounded-xl mb-4 relative">
            <div className="absolute inset-0 flex items-center justify-center text-stone">
              [Image Gallery]
            </div>
          </div>
          <div className="flex gap-2">
            {item.images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-16 h-16 rounded-lg bg-sand-light cursor-pointer",
                  index === 0 && "ring-2 ring-gold-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <Link href={`/universes/${item.brand.id}`} className="text-sm text-gold-muted hover:text-gold-deep">
              {item.brand.name}
            </Link>
            <h1 className="font-display text-display-sm text-noir mt-1">
              {item.name}
            </h1>
            <p className="text-lg text-noir mt-2">
              {formatCurrency(item.price.amount, item.price.currency)}
            </p>
          </div>

          <p className="text-stone">{item.culturalContext.designPhilosophy}</p>

          {/* Color Selection */}
          <div>
            <label className="text-sm font-medium text-noir block mb-2">Color</label>
            <div className="flex gap-2">
              {item.colors.map((color, index) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(index)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all",
                    selectedColor === index ? "border-noir" : "border-sand"
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <label className="text-sm font-medium text-noir block mb-2">Size</label>
            <div className="flex flex-wrap gap-2">
              {item.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-colors",
                    selectedSize === size
                      ? "border-noir bg-noir text-ivory-cream"
                      : "border-sand hover:border-gold-soft"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Intelligence Panels */}
      <div className="space-y-6">
        {/* AI Reasoning */}
        <Card className="intelligence-panel">
          <CardHeader className="intelligence-panel-header">
            <CardTitle className="flex items-center gap-2 text-base">
              <IntelligenceBadge label="AI Reasoning — Why this for you" />
            </CardTitle>
          </CardHeader>
          <CardContent className="intelligence-panel-body">
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-noir">
                <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                {item.aiReasoning.primaryReason}
              </li>
              {item.aiReasoning.supportingReasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2 text-stone">
                  <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-4 border-t border-sand/50">
              <span className="text-sm text-stone">
                Confidence: <span className="font-medium text-noir">{item.aiReasoning.confidence}%</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-stone">Was this helpful?</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fit Intelligence */}
        <Card className="intelligence-panel">
          <CardHeader className="intelligence-panel-header">
            <CardTitle className="text-base">Fit Intelligence</CardTitle>
          </CardHeader>
          <CardContent className="intelligence-panel-body">
            <div className="flex items-center gap-6 mb-6">
              <FitScore score={item.fitIntelligence.overallScore} size="lg" />
              <div className="flex-1">
                <div className="h-3 bg-sand rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full transition-all"
                    style={{ width: `${item.fitIntelligence.overallScore}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {item.fitIntelligence.breakdown.map((area) => (
                <div key={area.area} className="flex items-center justify-between">
                  <span className="text-sm text-noir">{area.area}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-medium", getFitPredictionColor(area.prediction))}>
                      {area.prediction === "Excellent" && <Check className="inline h-4 w-4" />}
                      {area.prediction === "Attention" && <AlertTriangle className="inline h-4 w-4" />}
                      {" "}{area.prediction}
                    </span>
                    {area.note && <span className="text-xs text-stone">({area.note})</span>}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone mt-4 pt-4 border-t border-sand/50">
              {item.fitIntelligence.comparisonBase}
            </p>
          </CardContent>
        </Card>

        {/* Availability Intelligence */}
        <Card className="intelligence-panel">
          <CardHeader className="intelligence-panel-header">
            <CardTitle className="text-base">Availability Intelligence</CardTitle>
          </CardHeader>
          <CardContent className="intelligence-panel-body">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-stone">Global Probability</span>
                <span className="text-lg font-medium text-noir">
                  {item.availabilityIntelligence.globalProbability}%
                </span>
              </div>
              <AvailabilityBar
                probability={item.availabilityIntelligence.globalProbability}
                showLabel={false}
                size="lg"
              />
            </div>
            <div className="space-y-3">
              {item.availabilityIntelligence.sources.map((source) => (
                <div key={source.location} className="flex items-center justify-between">
                  <span className="text-sm text-noir">{source.location}</span>
                  <div className="flex items-center gap-4">
                    <AvailabilityBar
                      probability={source.probability}
                      showLabel={false}
                      size="sm"
                      className="w-24"
                    />
                    <span className="text-sm text-noir w-12">{source.probability}%</span>
                    <span className="text-xs text-stone">{source.deliveryDays} days</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-sand/50">
              <p className="text-sm text-stone">
                Restock probability: {item.availabilityIntelligence.restockIntelligence.probability}% within {item.availabilityIntelligence.restockIntelligence.estimatedDays} days
              </p>
              <Button variant="secondary" size="sm" className="mt-2 gap-1">
                <Bell className="h-3 w-3" />
                Notify me of changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Styling Intelligence */}
        <Card className="intelligence-panel">
          <CardHeader className="intelligence-panel-header">
            <CardTitle className="text-base">Styling Intelligence</CardTitle>
          </CardHeader>
          <CardContent className="intelligence-panel-body">
            <p className="text-sm text-stone mb-4">From your wardrobe, this pairs with:</p>
            <div className="flex gap-4 mb-4">
              {item.stylingIntelligence.wardrobePairings.map((pairing) => (
                <div key={pairing.itemId} className="text-center">
                  <div className="w-20 h-20 bg-sand-light rounded-lg mb-2 flex items-center justify-center text-xs text-stone">
                    [Image]
                  </div>
                  <p className="text-xs text-noir">{pairing.name}</p>
                  <p className="text-xs text-gold-muted">{pairing.compatibility}%</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-sand/50">
              <span className="text-sm text-stone">Complete outfit confidence</span>
              <span className="text-lg font-medium text-noir">
                {item.stylingIntelligence.outfitConfidence}%
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {item.stylingIntelligence.occasions.map((occasion) => (
                <Badge key={occasion} variant="secondary">{occasion}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="sticky bottom-4 mt-8">
        <Card className="shadow-moda-xl">
          <CardContent className="p-4 flex gap-4">
            <Button className="flex-1" size="lg">
              Begin Acquisition
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => addToConsiderations(item)}
            >
              <Heart className={cn("h-4 w-4 mr-2", inConsiderations && "fill-current")} />
              {inConsiderations ? "Saved" : "Save to Considerations"}
            </Button>
          </CardContent>
        </Card>
        <p className="text-xs text-stone text-center mt-2">
          &ldquo;Begin Acquisition&rdquo; checks real-time availability — no commitment until you confirm.
        </p>
      </div>
    </div>
  );
}
