"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CULTURE_OPTIONS } from "@/types/identity";
import { useIdentityStore } from "@/stores/identityStore";

export default function CulturePage() {
  const router = useRouter();
  const { culturalAffinities, setCulturalAffinities, completeStep } = useIdentityStore();
  const [selected, setSelected] = useState<string[]>(culturalAffinities);

  const toggleCulture = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id].slice(0, 2)
    );
  };

  const handleNext = () => {
    setCulturalAffinities(selected);
    completeStep("culture");
    router.push("/identity/body");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-display text-display-sm text-noir">
          Cultural Affinity
        </h1>
        <p className="text-stone">
          Select up to 2 cultural aesthetics that inspire your style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CULTURE_OPTIONS.map((culture, index) => (
          <motion.button
            key={culture.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => toggleCulture(culture.id)}
            className={cn(
              "text-left p-6 rounded-xl border-2 transition-all duration-200",
              selected.includes(culture.id)
                ? "border-gold-muted bg-gold-soft/10"
                : "border-sand hover:border-gold-soft/50 bg-surface-elevated"
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-display text-lg font-medium text-noir">
                {culture.name}
              </h3>
              <span className="text-xs text-stone">{culture.region}</span>
            </div>
            <p className="text-sm text-stone">{culture.description}</p>
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
