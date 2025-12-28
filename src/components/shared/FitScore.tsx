"use client";

import { cn } from "@/lib/utils";

interface FitScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function FitScore({
  score,
  size = "md",
  showLabel = true,
  className,
}: FitScoreProps) {
  const sizeClasses = {
    sm: "w-10 h-10 text-xs",
    md: "w-14 h-14 text-sm",
    lg: "w-20 h-20 text-lg",
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-success-soft/20 text-success border-success-soft";
    if (score >= 75) return "bg-gold-soft/20 text-gold-deep border-gold-soft";
    if (score >= 60) return "bg-warning-soft/20 text-warning border-warning-soft";
    return "bg-error-soft/20 text-error border-error-soft";
  };

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-full border-2 font-medium",
          sizeClasses[size],
          getScoreColor(score)
        )}
      >
        {score}%
      </div>
      {showLabel && <span className="text-xs text-stone">Fit Score</span>}
    </div>
  );
}
