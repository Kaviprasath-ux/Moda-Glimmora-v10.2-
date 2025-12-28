"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingIntelligenceProps {
  message?: string;
  className?: string;
}

export function LoadingIntelligence({
  message = "Processing intelligence...",
  className,
}: LoadingIntelligenceProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6",
        className
      )}
    >
      <div className="relative mb-4">
        <Sparkles className="h-8 w-8 text-gold-muted animate-intelligence-pulse" />
        <div className="absolute inset-0 h-8 w-8 bg-gold-soft/20 rounded-full animate-ping" />
      </div>
      <p className="text-sm text-stone animate-pulse">{message}</p>
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-5 w-5 animate-spin rounded-full border-2 border-sand border-t-gold-muted",
        className
      )}
    />
  );
}
