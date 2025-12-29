"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import * as api from "@/lib/api";
import type { FashionIdentity } from "@/types";

export default function AccountIdentityPage() {
  const [identity, setIdentity] = useState<FashionIdentity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const data = await api.getFashionIdentity();
      setIdentity(data);
      setIsLoading(false);
    };
    run();
  }, []);

  if (isLoading) return <LoadingIntelligence message="Loading your fashion identity..." />;

  if (!identity) return <div className="container mx-auto px-4 py-8">No identity data.</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      <h1 className="font-display text-display-md text-noir">Fashion Identity</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-xs text-stone">Philosophies</p>
            <p className="text-noir">{identity.philosophies.join(", ") || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-stone">Cultural affinities</p>
            <p className="text-noir">{identity.culturalAffinities.join(", ") || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-stone">Occasion priorities</p>
            <p className="text-noir">{identity.occasionPriorities.join(", ") || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-stone">Confidence level</p>
            <p className="text-noir">{identity.confidenceLevel}%</p>
          </div>

          <p className="text-xs text-stone pt-3 border-t border-sand/50">
            To update your identity, revisit the onboarding flow.
          </p>
          <Button variant="secondary" onClick={() => (window.location.href = "/identity/philosophy")}>
            Re-run onboarding
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


