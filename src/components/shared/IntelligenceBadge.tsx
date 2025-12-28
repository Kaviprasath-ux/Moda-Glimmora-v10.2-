"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntelligenceBadgeProps {
  label?: string;
  className?: string;
}

export function IntelligenceBadge({
  label = "AI Intelligence",
  className,
}: IntelligenceBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-gold-muted",
        className
      )}
    >
      <Sparkles className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
  );
}
