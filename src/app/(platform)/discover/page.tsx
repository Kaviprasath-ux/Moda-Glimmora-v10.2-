"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Mic, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { IntelligenceBadge } from "@/components/shared/IntelligenceBadge";
import { FitScore } from "@/components/shared/FitScore";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import { useConversation } from "@/hooks/useConversation";
import Link from "next/link";
import * as api from "@/lib/api";
import type { Brand } from "@/types";
import { useDiscoveryPreferencesStore } from "@/stores/discoveryPreferencesStore";
import { OCCASION_OPTIONS } from "@/types/identity";

const SUGGESTED_PROMPTS = [
  "Something for work",
  "Travel capsule",
  "Fill a wardrobe gap",
  "Gallery opening",
  "Evening event",
];

export default function DiscoverPage() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get("brand");
  const prefill = searchParams.get("prefill");
  const qpOccasion = searchParams.get("occasion");
  const qpBudgetMin = searchParams.get("budgetMin");
  const qpBudgetMax = searchParams.get("budgetMax");
  const qpDelivery = searchParams.get("delivery");
  const [input, setInput] = useState("");
  const { messages, isLoading, currentDirections, sendMessage } = useConversation();
  const { preferences, setPreferences } = useDiscoveryPreferencesStore();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [didSeed, setDidSeed] = useState(false);
  const [didApplyQueryPrefs, setDidApplyQueryPrefs] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!brandId) return;
      const data = await api.getBrand(brandId);
      setBrand(data);
    };
    run();
  }, [brandId]);

  useEffect(() => {
    if (didApplyQueryPrefs) return;
    const patch: any = {};
    if (qpOccasion) patch.occasion = qpOccasion;
    if (qpBudgetMin) patch.budgetMin = parseInt(qpBudgetMin);
    if (qpBudgetMax) patch.budgetMax = parseInt(qpBudgetMax);
    if (qpDelivery && ["flexible", "soon", "urgent"].includes(qpDelivery)) {
      patch.deliveryUrgency = qpDelivery;
    }
    if (Object.keys(patch).length > 0) {
      setPreferences(patch);
    }
    setDidApplyQueryPrefs(true);
  }, [didApplyQueryPrefs, qpBudgetMax, qpBudgetMin, qpDelivery, qpOccasion, setPreferences]);

  const constraintsPrefix = useMemo(() => {
    const parts: string[] = [];
    if (preferences.occasion) parts.push(`occasion=${preferences.occasion}`);
    if (preferences.budgetMin != null || preferences.budgetMax != null) {
      parts.push(`budget=${preferences.budgetMin ?? "?"}-${preferences.budgetMax ?? "?"}`);
    }
    if (preferences.deliveryUrgency) parts.push(`delivery=${preferences.deliveryUrgency}`);
    if (brand?.name) parts.push(`brand=${brand.name}`);
    return parts.length ? `[Constraints: ${parts.join(", ")}] ` : "";
  }, [brand?.name, preferences]);

  const prompts = useMemo(() => {
    if (!preferences.occasion) return SUGGESTED_PROMPTS;
    const o = preferences.occasion.toLowerCase();
    if (o.includes("work")) return ["Client meeting", "Office week refresh", "Smart professional capsule"];
    if (o.includes("evening")) return ["Gallery opening", "Evening event", "Dinner with presence"];
    if (o.includes("travel")) return ["Travel capsule", "Day-to-evening travel look", "Airport to dinner"];
    if (o.includes("special")) return ["Wedding guest look", "Gala-ready but restrained", "Special occasion outfit"];
    return SUGGESTED_PROMPTS;
  }, [preferences.occasion]);

  useEffect(() => {
    if (didSeed) return;
    if (prefill && messages.length === 0) {
      setDidSeed(true);
      void sendMessage(`${constraintsPrefix}${prefill}`);
      return;
    }
    if (!brand) return;
    if (messages.length > 0) return;
    setDidSeed(true);
    void sendMessage(`${constraintsPrefix}Explore pieces from ${brand.name}. Culture-first, commerce-silent.`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, didSeed, messages.length, prefill, constraintsPrefix, sendMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage(`${constraintsPrefix}${input}`);
    setInput("");
  };

  const handleSuggestion = async (prompt: string) => {
    await sendMessage(`${constraintsPrefix}${prompt}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="font-display text-display-md text-noir mb-2">
          Conversational Discovery
        </h1>
        <p className="text-stone">
          Tell me what you&apos;re looking for, in your words
        </p>
      </div>

      {/* Preferences */}
      <Card className="mb-6">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-noir font-medium">Discovery Preferences</p>
            {brand && (
              <span className="text-xs px-2 py-1 rounded-full bg-sand-light text-stone">
                Universe: {brand.name}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <p className="text-xs text-stone">Occasion</p>
              <select
                value={preferences.occasion ?? ""}
                onChange={(e) => setPreferences({ occasion: e.target.value || null })}
                className="w-full h-10 rounded-lg border border-sand bg-surface-elevated px-3 text-sm"
              >
                <option value="">Any</option>
                {OCCASION_OPTIONS.map((o) => (
                  <option key={o.id} value={o.name}>{o.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-stone">Budget (min)</p>
              <input
                type="number"
                value={preferences.budgetMin ?? ""}
                onChange={(e) => setPreferences({ budgetMin: e.target.value ? parseInt(e.target.value) : null })}
                placeholder="e.g., 500"
                className="w-full h-10 rounded-lg border border-sand bg-surface-elevated px-3 text-sm"
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-stone">Budget (max)</p>
              <input
                type="number"
                value={preferences.budgetMax ?? ""}
                onChange={(e) => setPreferences({ budgetMax: e.target.value ? parseInt(e.target.value) : null })}
                placeholder="e.g., 2500"
                className="w-full h-10 rounded-lg border border-sand bg-surface-elevated px-3 text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <p className="text-xs text-stone">Delivery urgency</p>
              <select
                value={preferences.deliveryUrgency}
                onChange={(e) => setPreferences({ deliveryUrgency: e.target.value as any })}
                className="w-full h-10 rounded-lg border border-sand bg-surface-elevated px-3 text-sm"
              >
                <option value="flexible">Flexible</option>
                <option value="soon">Soon</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="md:col-span-2 text-xs text-stone flex items-center">
              These preferences shape your discovery experience.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversation */}
      <div className="space-y-6 mb-8">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={message.role === "user" ? "text-right" : ""}
            >
              {message.role === "user" ? (
                <div className="inline-block max-w-[80%] text-left">
                  <Card className="bg-noir text-ivory-cream">
                    <CardContent className="p-4">
                      <p>{message.content}</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="border-gold-soft/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gold-soft/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-4 w-4 text-gold-muted" />
                      </div>
                      <div className="flex-1">
                        <IntelligenceBadge label="Fashion Agent" className="mb-2" />
                        <p className="text-noir">{message.content}</p>
                      </div>
                    </div>

                    {/* Directions */}
                    {message.directions && message.directions.length > 0 && (
                      <div className="space-y-4 mt-6">
                        {message.directions.map((direction, index) => (
                          <Card key={direction.id} className="bg-ivory-warm border-sand/50">
                            <CardContent className="p-4">
                              <h4 className="font-medium text-noir mb-1">
                                Direction {index + 1}: {direction.title}
                              </h4>
                              <p className="text-sm text-stone mb-3">
                                {direction.description}
                              </p>

                              {direction.items && direction.items.length > 0 && (
                                <div className="flex gap-3 mb-3">
                                  {direction.items.slice(0, 2).map((item: any) => (
                                    <Link
                                      key={item.id}
                                      href={`/item/${item.id}`}
                                      className="w-20"
                                    >
                                      <div className="aspect-square bg-sand-light rounded-lg mb-1 flex items-center justify-center text-xs text-stone">
                                        [Img]
                                      </div>
                                      <FitScore
                                        score={item.fitIntelligence?.overallScore || 90}
                                        size="sm"
                                        showLabel={false}
                                      />
                                    </Link>
                                  ))}
                                  {direction.items.length > 0 && (
                                    <span className="text-xs text-stone self-center">
                                      {direction.items.length} items aligned
                                    </span>
                                  )}
                                </div>
                              )}

                              {direction.items && direction.items.length > 0 ? (
                                <Link href={`/item/${direction.items[0].id}`}>
                                  <Button size="sm" variant="secondary" className="gap-1">
                                    Explore this direction
                                    <ArrowRight className="h-3 w-3" />
                                  </Button>
                                </Link>
                              ) : (
                                <Button size="sm" variant="secondary" className="gap-1" disabled>
                                  Explore this direction
                                  <ArrowRight className="h-3 w-3" />
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <Card className="border-gold-soft/30">
            <CardContent className="p-6">
              <LoadingIntelligence message="Considering your style..." />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-4 space-y-4">
        <form onSubmit={handleSubmit}>
          <Card className="shadow-moda-lg">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe what you're looking for..."
                  className="flex-1 min-h-[60px] resize-none"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button type="button" size="icon" variant="secondary" disabled>
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>

        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {prompts.map((prompt) => (
              <Button
                key={prompt}
                variant="secondary"
                size="sm"
                onClick={() => handleSuggestion(prompt)}
                disabled={isLoading}
              >
                {prompt}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
