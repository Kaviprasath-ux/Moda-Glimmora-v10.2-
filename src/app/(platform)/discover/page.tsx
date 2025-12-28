"use client";

import { useState } from "react";
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

const SUGGESTED_PROMPTS = [
  "Something for work",
  "Travel capsule",
  "Fill a wardrobe gap",
  "Gallery opening",
  "Evening event",
];

export default function DiscoverPage() {
  const [input, setInput] = useState("");
  const { messages, isLoading, currentDirections, sendMessage } = useConversation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage(input);
    setInput("");
  };

  const handleSuggestion = async (prompt: string) => {
    await sendMessage(prompt);
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

                              <Button size="sm" variant="secondary" className="gap-1">
                                Explore this direction
                                <ArrowRight className="h-3 w-3" />
                              </Button>
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
            {SUGGESTED_PROMPTS.map((prompt) => (
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
