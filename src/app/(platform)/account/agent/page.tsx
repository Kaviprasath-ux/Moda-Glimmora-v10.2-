"use client";

import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { PROACTIVITY_LABELS } from "@/lib/constants";
import { useFashionAgent } from "@/hooks/useFashionAgent";

export default function AccountAgentPage() {
  const { preferences, updatePreferences, resetMemory } = useFashionAgent();
  const [isResetting, setIsResetting] = useState(false);

  const getProactivityLabel = (value: number) => {
    const keys = Object.keys(PROACTIVITY_LABELS).map(Number).sort((a, b) => a - b);
    const closest = keys.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
    return PROACTIVITY_LABELS[closest];
  };

  if (!preferences) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <p className="text-stone">Loading agent preferences…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-gold-muted" />
        <h1 className="font-display text-display-md text-noir">AI Agent</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-noir">Enable Fashion Agent</p>
              <p className="text-sm text-stone">Personalized intelligence and guidance</p>
            </div>
            <Switch
              checked={preferences.enabled}
              onCheckedChange={(enabled) => updatePreferences({ enabled })}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-noir">Proactivity</p>
                <p className="text-sm text-stone">How often the agent reaches out</p>
              </div>
              <span className="text-sm text-noir">
                {getProactivityLabel(preferences.proactivityLevel)}
              </span>
            </div>
            <Slider
              value={[preferences.proactivityLevel]}
              onValueChange={([value]) => updatePreferences({ proactivityLevel: value })}
              max={100}
              step={25}
              disabled={!preferences.enabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-noir">Availability Alerts</p>
              <p className="text-sm text-stone">When saved items become more obtainable</p>
            </div>
            <Switch
              checked={preferences.availabilityAlerts}
              onCheckedChange={(availabilityAlerts) => updatePreferences({ availabilityAlerts })}
              disabled={!preferences.enabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-noir">Style Evolution Insights</p>
              <p className="text-sm text-stone">Periodic insights about your style drift</p>
            </div>
            <Switch
              checked={preferences.styleEvolutionInsights}
              onCheckedChange={(styleEvolutionInsights) =>
                updatePreferences({ styleEvolutionInsights })
              }
              disabled={!preferences.enabled}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-gold-soft/30">
        <CardHeader>
          <CardTitle className="text-base">Reversibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-stone">
            You can reset the agent’s learned memory at any time. This does not delete your account.
          </p>
          <Button
            variant="secondary"
            className="gap-2"
            disabled={isResetting}
            onClick={async () => {
              setIsResetting(true);
              await resetMemory();
              setIsResetting(false);
            }}
          >
            <RefreshCw className="h-4 w-4" />
            Reset Agent Memory
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


