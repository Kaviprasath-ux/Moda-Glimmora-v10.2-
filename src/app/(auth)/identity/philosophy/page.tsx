"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PHILOSOPHY_OPTIONS } from "@/types/identity";
import { useIdentityStore } from "@/stores/identityStore";

export default function PhilosophyPage() {
  const router = useRouter();
  const { philosophies, setPhilosophies, completeStep } = useIdentityStore();
  const [selected, setSelected] = useState<string[]>(philosophies);

  const togglePhilosophy = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id].slice(0, 3)
    );
  };

  const handleNext = () => {
    setPhilosophies(selected);
    completeStep("philosophy");
    router.push("/identity/culture");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-display text-display-sm text-noir">
          Your Style Philosophy
        </h1>
        <p className="text-stone">
          Select up to 3 philosophies that resonate with how you approach fashion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PHILOSOPHY_OPTIONS.map((philosophy, index) => (
          <motion.button
            key={philosophy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => togglePhilosophy(philosophy.id)}
            className={cn(
              "text-left p-6 rounded-xl border-2 transition-all duration-200",
              selected.includes(philosophy.id)
                ? "border-gold-muted bg-gold-soft/10"
                : "border-sand hover:border-gold-soft/50 bg-surface-elevated"
            )}
          >
            <h3 className="font-display text-lg font-medium text-noir mb-2">
              {philosophy.name}
            </h3>
            <p className="text-sm text-stone">{philosophy.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {philosophy.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="text-xs px-2 py-0.5 rounded-full bg-sand-light text-stone"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={selected.length === 0}>
          Continue
        </Button>
      </div>
    </div>
  );
}
