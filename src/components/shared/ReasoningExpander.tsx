"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ReasoningExpanderProps {
  reasons: string[];
  primaryReason?: string;
  confidence?: number;
  className?: string;
}

export function ReasoningExpander({
  reasons,
  primaryReason,
  confidence,
  className,
}: ReasoningExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("space-y-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-gold-muted hover:text-gold-deep gap-1.5 h-auto py-1 px-2"
      >
        <HelpCircle className="h-3.5 w-3.5" />
        <span className="text-xs">Why this?</span>
        {isExpanded ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </Button>

      {isExpanded && (
        <div className="animate-slide-down rounded-lg bg-ivory-warm p-4 space-y-3">
          {primaryReason && (
            <p className="text-sm font-medium text-noir">{primaryReason}</p>
          )}

          {reasons.length > 0 && (
            <ul className="space-y-1.5">
              {reasons.map((reason, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-stone"
                >
                  <span className="text-success mt-0.5">✓</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          )}

          {confidence && (
            <div className="flex items-center gap-2 pt-2 border-t border-sand/50">
              <span className="text-xs text-stone">Confidence:</span>
              <span className="text-sm font-medium text-gold-muted">
                {confidence}%
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
