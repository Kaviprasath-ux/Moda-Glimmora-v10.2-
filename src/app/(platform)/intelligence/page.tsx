"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, AlertCircle, TrendingUp, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IntelligenceBadge } from "@/components/shared/IntelligenceBadge";
import { AvailabilityBar } from "@/components/shared/AvailabilityBar";
import { FitScore } from "@/components/shared/FitScore";
import { ReasoningExpander } from "@/components/shared/ReasoningExpander";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import { useFashionAgent } from "@/hooks/useFashionAgent";
import { useWardrobe } from "@/hooks/useWardrobe";
import { useAvailability } from "@/hooks/useAvailability";
import * as api from "@/lib/api";
import { getTimeGreeting, cn } from "@/lib/utils";
import type { Discovery, Item, BrandRecommendation, Brand } from "@/types";
import { useDiscoveryPreferencesStore } from "@/stores/discoveryPreferencesStore";
import { useCalendarStore } from "@/stores/calendarStore";

export default function IntelligenceHubPage() {
  const { insight, isLoading: agentLoading } = useFashionAgent();
  const { gaps } = useWardrobe();
  const { alerts } = useAvailability();
  const { preferences } = useDiscoveryPreferencesStore();
  const { events, selectedEventId } = useCalendarStore();
  const [discoveries, setDiscoveries] = useState<(Discovery & { item?: Item })[]>([]);
  const [brandRecs, setBrandRecs] = useState<(BrandRecommendation & { brand?: Brand })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dismissInsight, setDismissInsight] = useState(false);
  const [dismissAlert, setDismissAlert] = useState(false);
  const [dismissGap, setDismissGap] = useState(false);
  const [showIntelligenceBar, setShowIntelligenceBar] = useState(true);

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

  const buildOccasionPrefill = () => {
    if (!preferences.occasion) return null;
    const parts: string[] = [];
    parts.push(`I need an outfit for: ${preferences.occasion}.`);
    if (preferences.deliveryUrgency) {
      parts.push(`Delivery urgency: ${preferences.deliveryUrgency}.`);
    }
    if (preferences.budgetMin != null || preferences.budgetMax != null) {
      parts.push(`Budget: ${preferences.budgetMin ?? "—"} to ${preferences.budgetMax ?? "—"}.`);
    }
    parts.push("Give me two directions and one safe choice + one expressive choice.");
    return parts.join(" ");
  };

  const occasionPrefill = buildOccasionPrefill();

  const selectedEvent =
    (selectedEventId && events.find((e) => e.id === selectedEventId)) || null;
  const nextEvent =
    selectedEvent ||
    events.find((e) => Date.parse(e.start) > Date.now()) ||
    null;

  const inferOccasionFromEvent = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("meeting") || t.includes("client") || t.includes("office") || t.includes("work")) {
      return "Work & Professional";
    }
    if (t.includes("wedding") || t.includes("gala") || t.includes("ceremony") || t.includes("black tie")) {
      return "Special Occasions";
    }
    if (t.includes("flight") || t.includes("travel") || t.includes("airport") || t.includes("trip")) {
      return "Weekend & Travel";
    }
    if (t.includes("dinner") || t.includes("event") || t.includes("gallery") || t.includes("performance")) {
      return "Evening & Cultural";
    }
    return "Evening & Cultural";
  };

  const buildCalendarPrefill = () => {
    if (!nextEvent) return null;
    const inferredOccasion = inferOccasionFromEvent(nextEvent.title);
    const when = new Date(nextEvent.start).toLocaleString();
    const parts: string[] = [];
    parts.push(`I have an upcoming event: ${nextEvent.title}.`);
    parts.push(`When: ${when}.`);
    if (nextEvent.location) parts.push(`Location: ${nextEvent.location}.`);
    parts.push(`Occasion: ${inferredOccasion}.`);
    if (preferences.deliveryUrgency) parts.push(`Delivery urgency: ${preferences.deliveryUrgency}.`);
    if (preferences.budgetMin != null || preferences.budgetMax != null) {
      parts.push(`Budget: ${preferences.budgetMin ?? "—"} to ${preferences.budgetMax ?? "—"}.`);
    }
    parts.push("Give me two outfit directions and one safe choice + one expressive choice.");
    return { inferredOccasion, text: parts.join(" ") };
  };

  const calendarPrefill = buildCalendarPrefill();

  return (
    <div className="relative">
      {/* Grain overlay (visual only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient intelligence bar (sticky under header) */}
      {showIntelligenceBar && (
        <div className="sticky top-16 z-40 animate-slide-down">
          <div className="bg-gradient-to-r from-sapphire-deep via-sapphire-mist to-sapphire-deep">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-soft/15 to-transparent opacity-50" />
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-3 flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold-soft animate-intelligence-pulse" />
                  <p className="text-ivory-cream text-sm">
                    Your style profile updated —{" "}
                    <span className="text-gold-soft">new insights available</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-ivory-cream/80 hover:text-ivory-cream hover:bg-white/10"
                    onClick={() => {
                      const el = document.getElementById("agent-insight");
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    View insights →
                  </Button>
                  <button
                    className="text-ivory-cream/60 hover:text-ivory-cream transition-colors"
                    onClick={() => setShowIntelligenceBar(false)}
                    aria-label="Dismiss"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-[2] pt-6 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-8">
          {/* Discovery preferences bar */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-ivory-warm rounded-2xl border border-sand/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-medium text-charcoal-deep text-sm mb-0.5 font-body">
                  Discovery preferences
                </h2>
                <p className="text-xs text-greige">
                  {preferences.occasion ? `Occasion: ${preferences.occasion}` : "Occasion: Any"} •{" "}
                  {preferences.budgetMin || preferences.budgetMax
                    ? `Budget: ${preferences.budgetMin ?? "—"}–${preferences.budgetMax ?? "—"}`
                    : "Budget: Any"}{" "}
                  • Delivery: {preferences.deliveryUrgency}
                </p>
              </div>
              <Link href="/discover">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 px-5 rounded-lg border-sand hover:border-charcoal-warm hover:bg-parchment"
                >
                  Adjust
                </Button>
              </Link>
            </div>
          </motion.section>

          {/* Event preparation banner */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gradient-to-r from-charcoal-deep via-charcoal-warm to-charcoal-deep rounded-2xl p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-muted/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-gold-soft" />
                </div>
                <div>
                  <h3 className="font-medium text-ivory-cream text-sm mb-0.5 font-body">
                    Event preparation
                  </h3>
                  <p className="text-ivory-cream/60 text-xs">
                    {nextEvent
                      ? `Next: ${nextEvent.title} • ${new Date(nextEvent.start).toLocaleString()}`
                      : preferences.occasion
                        ? "Occasion-aware styling directions, fit confidence, and an acquisition path if availability is uncertain."
                        : "Connect your calendar (or set an occasion) to prepare for upcoming events."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {calendarPrefill ? (
                  <Link
                    href={`/discover?occasion=${encodeURIComponent(calendarPrefill.inferredOccasion)}&prefill=${encodeURIComponent(calendarPrefill.text)}`}
                  >
                    <Button
                      size="sm"
                      className="h-10 px-6 rounded-lg bg-gold-muted text-noir hover:bg-gold-soft tracking-[0.1em] uppercase text-xs font-medium"
                    >
                      Prepare
                    </Button>
                  </Link>
                ) : preferences.occasion && occasionPrefill ? (
                  <Link href={`/discover?prefill=${encodeURIComponent(occasionPrefill)}`}>
                    <Button
                      size="sm"
                      className="h-10 px-6 rounded-lg bg-gold-muted text-noir hover:bg-gold-soft tracking-[0.1em] uppercase text-xs font-medium"
                    >
                      Prepare
                    </Button>
                  </Link>
                ) : (
                  <Link href="/account/calendar">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-10 px-6 rounded-lg border-sand/60 bg-transparent text-ivory-cream hover:bg-white/10 hover:text-ivory-cream"
                    >
                      Connect calendar
                    </Button>
                  </Link>
                )}
                <Link href="/account/calendar" className="text-ivory-cream/70 text-xs hover:text-ivory-cream transition-colors">
                  View all events
                </Link>
              </div>
            </div>
          </motion.section>

      {/* Agent Insight */}
      {!dismissInsight && (
        <motion.div
        id="agent-insight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="rounded-2xl p-6 lg:p-8 border border-gold-soft/20 bg-gradient-to-br from-champagne/50 via-ivory-warm to-parchment/50 shadow-moda-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-soft to-gold-muted flex items-center justify-center flex-shrink-0 shadow-moda-md">
                <Sparkles className="h-5 w-5 text-noir" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gold-deep text-[10px] tracking-[0.15em] uppercase font-medium font-body">
                    Fashion Agent Insight
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-muted animate-intelligence-pulse" />
                </div>
                <p className="font-display text-xl lg:text-2xl text-charcoal-deep">
                  {insight?.greeting || getTimeGreeting() + ", there."}
                </p>
                <p className="text-charcoal-warm leading-relaxed">{insight?.insight}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    size="sm"
                    className="h-10 px-5 rounded-lg bg-charcoal-deep text-ivory-cream hover:bg-noir tracking-[0.1em] uppercase text-xs"
                    onClick={() => {
                      const el = document.getElementById("aligned-discoveries");
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    Yes, show me aligned pieces
                  </Button>
                  <Link href={`/discover?prefill=${encodeURIComponent(insight?.suggestion || "Show me aligned pieces for this week")}`}>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-10 px-5 rounded-lg border border-charcoal-deep text-charcoal-deep hover:bg-charcoal-deep hover:text-ivory-cream tracking-[0.1em] uppercase text-xs"
                    >
                      Tell me more
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-10 px-4 text-xs text-greige hover:text-charcoal-warm hover:bg-sand-light"
                    onClick={() => setDismissInsight(true)}
                  >
                    Not now
                  </Button>
                </div>
              </div>
            </div>
        </div>
        </motion.div>
      )}

      {/* Wardrobe Intelligence */}
      {gaps.length > 0 && !dismissGap && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-full bg-azure-whisper flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-sapphire-deep" />
            </div>
            <h2 className="font-display text-xl text-noir">Wardrobe Intelligence</h2>
          </div>

          <div className="rounded-2xl p-5 lg:p-6 border border-sand/30 bg-ivory-warm shadow-moda-sm">
            <h3 className="font-display text-lg text-charcoal-deep mb-1.5">Gap Detected</h3>
            <p className="text-charcoal-warm leading-relaxed mb-5">{gaps[0]?.reasoning}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/wardrobe/gaps">
                <Button className="h-10 px-5 rounded-lg bg-charcoal-deep text-ivory-cream hover:bg-noir tracking-[0.1em] uppercase text-xs">
                  Explore Options
                </Button>
              </Link>
              <Button
                variant="secondary"
                className="h-10 px-5 rounded-lg border border-sand text-charcoal-deep hover:border-charcoal-warm tracking-[0.1em] uppercase text-xs"
                onClick={() => setDismissGap(true)}
              >
                Dismiss
              </Button>
              <Link
                href={`/discover?prefill=${encodeURIComponent(
                  `Explain this wardrobe gap and suggest a solution path. Gap: ${gaps[0]?.category} — ${gaps[0]?.description}`
                )}`}
              >
                <Button variant="ghost" className="h-10 px-3 text-xs text-greige hover:text-gold-muted">
                  Why this gap?
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {/* Availability Intelligence */}
      {alerts.length > 0 && !dismissAlert && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-full bg-success/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <h2 className="font-display text-xl text-noir">Availability Intelligence</h2>
          </div>

          <div className="rounded-2xl p-5 lg:p-6 border border-sand/30 bg-ivory-warm shadow-moda-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-greige uppercase tracking-wider mb-0.5 font-body">
                  {alerts[0]?.itemName}
                </p>
                <p className="text-sm text-charcoal-warm">
                  Previously: {alerts[0]?.previousProbability}% → Now:{" "}
                  <span className="font-medium text-success">
                    {alerts[0]?.currentProbability}% in {alerts[0]?.bestSource.location}
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/item/${alerts[0]?.itemId}`}>
                  <Button className="h-10 px-5 rounded-lg bg-charcoal-deep text-ivory-cream hover:bg-noir tracking-[0.1em] uppercase text-xs">
                    View Intelligence
                  </Button>
                </Link>
                <Link href={`/acquire?itemId=${encodeURIComponent(alerts[0]?.itemId || "")}`}>
                  <Button
                    variant="secondary"
                    className="h-10 px-5 rounded-lg border border-charcoal-deep text-charcoal-deep hover:bg-charcoal-deep hover:text-ivory-cream tracking-[0.1em] uppercase text-xs"
                  >
                    Begin Acquisition
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="h-10 px-3 text-xs text-greige hover:text-charcoal-warm"
                  onClick={() => setDismissAlert(true)}
                >
                  Not interested
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Style-Aligned Discoveries */}
      <motion.section
        id="aligned-discoveries"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl text-noir">Style-Aligned Discoveries</h2>
          <Link
            href={`/discover?prefill=${encodeURIComponent(
              "Explain why these discoveries are aligned for me. Be brief and specific."
            )}`}
          >
            <Button variant="ghost" size="sm" className="text-gold-muted hover:text-gold-deep">
              Why these? <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {discoveries.slice(0, 4).map((discovery, index) => (
            <motion.div
              key={discovery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link href={`/item/${discovery.itemId}`}>
                <Card className="group overflow-hidden rounded-xl bg-parchment border border-sand/30 hover:shadow-moda-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="relative aspect-[3/4] bg-sand-light overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-stone text-xs">
                      [Image]
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                      <div className="w-full py-2.5 bg-charcoal-deep/95 text-ivory-cream text-[10px] tracking-[0.15em] uppercase rounded-lg text-center">
                        Quick View
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <div className="space-y-1">
                      <p className="text-[10px] text-greige tracking-wider uppercase font-body">
                        {discovery.item?.brand.name}
                      </p>
                      <p className="font-display text-sm lg:text-base text-noir leading-tight">
                        {discovery.item?.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <FitScore score={discovery.fitScore} size="sm" showLabel={false} />
                      <AvailabilityBar
                        probability={discovery.availabilityScore}
                        size="sm"
                        showLabel={false}
                        className="flex-1"
                      />
                    </div>
                    <div className="pt-1">
                      <button
                        type="button"
                        className={cn(
                          "inline-flex items-center gap-1 text-[10px] text-gold-muted hover:text-gold-deep transition-colors font-body",
                          "pointer-events-none"
                        )}
                      >
                        Why this?
                      </button>
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
        <div className="mb-6">
          <h2 className="font-display text-2xl text-noir mb-1">Universe Recommendations</h2>
          <p className="text-sm text-greige font-body">
            Based on your philosophy, explore these brand universes:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {brandRecs.slice(0, 2).map((rec, index) => (
            <Link key={rec.brandId} href={`/universes/${rec.brandId}`}>
              <div className="group bg-parchment rounded-2xl overflow-hidden hover:shadow-moda-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[16/9] overflow-hidden bg-sand-light">
                  <div className="absolute inset-0 flex items-center justify-center text-stone text-xs">
                    [Brand Image]
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/50 via-noir/10 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-charcoal-deep mb-1">
                    {rec.brand?.name}
                  </h3>
                  <p className="text-greige text-sm mb-3 font-body">{rec.reason}</p>
                  <div className="inline-flex items-center gap-2 text-gold-muted text-xs tracking-wider uppercase font-body group-hover:text-gold-deep transition-colors">
                    Enter Universe <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>
        </div>
      </div>
    </div>
  );
}
