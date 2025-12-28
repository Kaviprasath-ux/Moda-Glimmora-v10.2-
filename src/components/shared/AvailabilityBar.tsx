"use client";

import { cn } from "@/lib/utils";
import { getProbabilityColor, getProbabilityLabel } from "@/lib/utils";

interface AvailabilityBarProps {
  probability: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AvailabilityBar({
  probability,
  showLabel = true,
  size = "md",
  className,
}: AvailabilityBarProps) {
  const heightClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs">
          <span className="text-stone">Availability</span>
          <span className="font-medium text-noir">{probability}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-sand",
          heightClasses[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            getProbabilityColor(probability)
          )}
          style={{ width: `${probability}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-stone">{getProbabilityLabel(probability)}</p>
      )}
    </div>
  );
}
