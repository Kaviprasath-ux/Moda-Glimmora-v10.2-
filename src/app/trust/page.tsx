import { Card, CardContent } from "@/components/ui/card";
import { TrustBadgeGrid } from "@/components/shared/TrustBadge";

export const metadata = {
  title: "Trust Principles",
};

export default function TrustPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-10">
      <div className="text-center space-y-2">
        <h1 className="font-display text-display-md text-noir">Trust Principles</h1>
        <p className="text-stone">
          Explainable intelligence. Reversible choices. Human control.
        </p>
      </div>

      <TrustBadgeGrid className="max-w-4xl mx-auto" />

      <Card className="border-sand/50">
        <CardContent className="p-6 text-sm text-stone leading-relaxed">
          We intentionally surface “why” (reasoning), “how likely” (availability probability), and
          “how to undo” (preferences, memory reset). Every user-facing autonomy is opt-in and can be
          disabled.
        </CardContent>
      </Card>
    </div>
  );
}


