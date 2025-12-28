"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_NAME, IDENTITY_STEPS } from "@/lib/constants";
import { Progress } from "@/components/ui/progress";

export default function IdentityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const currentStepIndex = IDENTITY_STEPS.findIndex(
    (step) => pathname.includes(step.id)
  );
  const progress = ((currentStepIndex + 1) / IDENTITY_STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Header */}
      <header className="border-b border-sand/50 bg-surface-base">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold-muted" />
              <span className="font-display text-xl font-semibold text-noir">
                {SITE_NAME}
              </span>
            </Link>
            <span className="text-sm text-stone">
              Step {currentStepIndex + 1} of {IDENTITY_STEPS.length}
            </span>
          </div>

          <Progress value={progress} className="h-1" />

          {/* Step indicators */}
          <div className="hidden md:flex justify-between mt-4">
            {IDENTITY_STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-2 text-xs",
                    isCompleted && "text-success",
                    isCurrent && "text-noir font-medium",
                    !isCompleted && !isCurrent && "text-stone"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                      isCompleted && "bg-success text-ivory-cream",
                      isCurrent && "bg-gold-muted text-noir",
                      !isCompleted && !isCurrent && "bg-sand text-stone"
                    )}
                  >
                    {isCompleted ? <Check className="h-3 w-3" /> : index + 1}
                  </div>
                  <span className="hidden lg:inline">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
