"use client";

import { Lock, Brain, Sparkles, BarChart3, RefreshCw, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type TrustPrinciple =
  | "data-yours"
  | "ai-control"
  | "no-dark-patterns"
  | "explainable"
  | "reversible"
  | "human-in-loop";

interface TrustBadgeProps {
  principle: TrustPrinciple;
  showDescription?: boolean;
  className?: string;
}

const TRUST_CONFIG: Record<
  TrustPrinciple,
  { icon: React.ReactNode; title: string; description: string }
> = {
  "data-yours": {
    icon: <Lock className="h-4 w-4" />,
    title: "Your data stays yours",
    description: "Full control over your fashion intelligence data",
  },
  "ai-control": {
    icon: <Brain className="h-4 w-4" />,
    title: "AI you control",
    description: "Adjust proactivity, reset memory, set boundaries",
  },
  "no-dark-patterns": {
    icon: <Sparkles className="h-4 w-4" />,
    title: "No dark patterns",
    description: "No urgency tricks, no artificial scarcity",
  },
  explainable: {
    icon: <BarChart3 className="h-4 w-4" />,
    title: "Explainable intelligence",
    description: "Understand why every recommendation is made",
  },
  reversible: {
    icon: <RefreshCw className="h-4 w-4" />,
    title: "Reversible always",
    description: "Undo any action, remove any data",
  },
  "human-in-loop": {
    icon: <Users className="h-4 w-4" />,
    title: "Human-in-the-loop",
    description: "AI proposes, you decide",
  },
};

export function TrustBadge({
  principle,
  showDescription = false,
  className,
}: TrustBadgeProps) {
  const config = TRUST_CONFIG[principle];

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        showDescription ? "flex-col sm:flex-row" : "",
        className
      )}
    >
      <div className="flex items-center gap-2 text-gold-muted">
        {config.icon}
        <span className="text-sm font-medium text-noir">{config.title}</span>
      </div>
      {showDescription && (
        <p className="text-sm text-stone">{config.description}</p>
      )}
    </div>
  );
}

export function TrustBadgeGrid({ className }: { className?: string }) {
  const principles: TrustPrinciple[] = [
    "data-yours",
    "ai-control",
    "no-dark-patterns",
    "explainable",
    "reversible",
    "human-in-loop",
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 gap-4",
        className
      )}
    >
      {principles.map((principle) => (
        <TrustBadge key={principle} principle={principle} showDescription />
      ))}
    </div>
  );
}
