"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntelligenceIndicatorProps {
  isActive?: boolean;
  message?: string;
  className?: string;
}

export function IntelligenceIndicator({
  isActive = false,
  message = "AI Processing",
  className,
}: IntelligenceIndicatorProps) {
  if (!isActive) return null;

  return (
    <div
      className={cn(
        "fixed top-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-noir text-ivory-cream shadow-moda-lg",
        className
      )}
    >
      <Sparkles className="h-4 w-4 text-gold-soft animate-intelligence-pulse" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
