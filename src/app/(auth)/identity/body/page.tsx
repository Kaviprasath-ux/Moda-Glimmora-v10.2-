"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIdentityStore } from "@/stores/identityStore";
import { FIT_PREFERENCE_OPTIONS, SIZE_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function BodyPage() {
  const router = useRouter();
  const { bodyIntelligence, setBodyIntelligence, completeStep } = useIdentityStore();

  const [height, setHeight] = useState(bodyIntelligence.height?.value?.toString() || "");
  const [sizes, setSizes] = useState({
    top: bodyIntelligence.usualSizes?.top || "",
    bottom: bodyIntelligence.usualSizes?.bottom || "",
    dress: bodyIntelligence.usualSizes?.dress || "",
    shoe: bodyIntelligence.usualSizes?.shoe || "",
  });
  const [fitPrefs, setFitPrefs] = useState({
    tops: bodyIntelligence.fitPreferences?.tops || "Regular",
    bottoms: bodyIntelligence.fitPreferences?.bottoms || "Regular",
    dresses: bodyIntelligence.fitPreferences?.dresses || "Regular",
    outerwear: bodyIntelligence.fitPreferences?.outerwear || "Regular",
  });

  const handleNext = () => {
    setBodyIntelligence({
      height: { value: parseInt(height) || 0, unit: "cm" },
      usualSizes: sizes,
      fitPreferences: fitPrefs as any,
      fitConcerns: [],
    });
    completeStep("body");
    router.push("/identity/wardrobe");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-display text-display-sm text-noir">
          Body Intelligence
        </h1>
        <p className="text-stone">
          Help us understand your fit preferences for better recommendations.
        </p>
      </div>

      {/* Height */}
      <div className="space-y-3">
        <Label>Height (cm)</Label>
        <Input
          type="number"
          placeholder="e.g., 168"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="max-w-[200px]"
        />
      </div>

      {/* Usual Sizes */}
      <div className="space-y-3">
        <Label>Usual Sizes</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.keys(sizes) as Array<keyof typeof sizes>).map((category) => (
            <div key={category} className="space-y-2">
              <span className="text-sm text-stone capitalize">{category}</span>
              <select
                value={sizes[category]}
                onChange={(e) => setSizes((prev) => ({ ...prev, [category]: e.target.value }))}
                className="w-full h-10 rounded-lg border border-sand bg-surface-elevated px-3 text-sm"
              >
                <option value="">Select</option>
                {SIZE_OPTIONS[category].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Fit Preferences */}
      <div className="space-y-3">
        <Label>Fit Preferences</Label>
        <div className="space-y-4">
          {(Object.keys(fitPrefs) as Array<keyof typeof fitPrefs>).map((category) => (
            <div key={category} className="space-y-2">
              <span className="text-sm text-stone capitalize">{category}</span>
              <div className="flex flex-wrap gap-2">
                {FIT_PREFERENCE_OPTIONS.map((pref) => (
                  <button
                    key={pref}
                    onClick={() => setFitPrefs((prev) => ({ ...prev, [category]: pref }))}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-colors",
                      fitPrefs[category] === pref
                        ? "bg-gold-muted text-noir"
                        : "bg-sand-light text-stone hover:bg-sand"
                    )}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}
