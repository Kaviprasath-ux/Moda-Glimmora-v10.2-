import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-sand text-charcoal-warm",
        secondary: "bg-ivory-warm text-stone",
        success: "bg-success-soft/20 text-success",
        warning: "bg-warning-soft/20 text-warning",
        error: "bg-error-soft/20 text-error",
        gold: "bg-gold-soft/20 text-gold-deep",
        outline: "border border-sand text-stone",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
