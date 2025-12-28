"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIdentityStore } from "@/stores/identityStore";

export default function AgentPage() {
  const router = useRouter();
  const { philosophies, culturalAffinities, completeStep } = useIdentityStore();

  const handleComplete = () => {
    completeStep("agent");
    router.push("/intelligence");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-20 h-20 mx-auto rounded-full bg-gold-soft/20 flex items-center justify-center"
        >
          <Sparkles className="h-10 w-10 text-gold-muted" />
        </motion.div>
        <h1 className="font-display text-display-sm text-noir">
          Meet Your Fashion Agent
        </h1>
        <p className="text-stone">
          Your personal AI stylist is ready to understand your world.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-surface-elevated rounded-xl border border-sand/50 p-6 space-y-4"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-soft/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-gold-muted" />
          </div>
          <div className="space-y-2">
            <p className="text-noir">
              Hello! I&apos;m your Fashion Intelligence Agent.
            </p>
            <p className="text-stone text-sm">
              Based on what you&apos;ve shared, I understand that you appreciate:
            </p>
            <ul className="text-sm text-noir space-y-1">
              {philosophies.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="text-gold-muted">✦</span>
                  {p.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </li>
              ))}
            </ul>
            {culturalAffinities.length > 0 && (
              <>
                <p className="text-stone text-sm mt-3">
                  With influences from:
                </p>
                <ul className="text-sm text-noir space-y-1">
                  {culturalAffinities.map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <span className="text-gold-muted">✦</span>
                      {c.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-ivory-warm rounded-xl p-6 space-y-3"
      >
        <h3 className="font-medium text-noir">What I can do for you:</h3>
        <ul className="text-sm text-stone space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            Find pieces that align with your unique style philosophy
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            Identify gaps in your wardrobe and suggest solutions
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            Track availability of items you&apos;re interested in
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            Guide you through brand universes and cultural stories
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            Always explain my reasoning — you stay in control
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center pt-4"
      >
        <Button size="lg" onClick={handleComplete} className="gap-2">
          Enter Your Intelligence Hub
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
