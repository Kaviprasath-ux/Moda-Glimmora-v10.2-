"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useIdentityStore } from "@/stores/identityStore";
import { PROACTIVITY_LABELS } from "@/lib/constants";

export default function PreferencesPage() {
  const router = useRouter();
  const { agentPreferences, setAgentPreferences, completeStep } = useIdentityStore();

  const [enabled, setEnabled] = useState(agentPreferences.enabled ?? true);
  const [proactivity, setProactivity] = useState(agentPreferences.proactivityLevel ?? 50);
  const [availabilityAlerts, setAvailabilityAlerts] = useState(agentPreferences.availabilityAlerts ?? true);
  const [styleInsights, setStyleInsights] = useState(agentPreferences.styleEvolutionInsights ?? true);

  const handleNext = () => {
    setAgentPreferences({
      enabled,
      proactivityLevel: proactivity,
      availabilityAlerts,
      styleEvolutionInsights: styleInsights,
      silentSelectionsEnabled: false,
      communicationFrequency: "weekly",
    });
    completeStep("preferences");
    router.push("/identity/agent");
  };

  const getProactivityLabel = (value: number) => {
    const keys = Object.keys(PROACTIVITY_LABELS).map(Number).sort((a, b) => a - b);
    const closest = keys.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
    return PROACTIVITY_LABELS[closest];
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-display text-display-sm text-noir">
          AI Agent Preferences
        </h1>
        <p className="text-stone">
          Configure how your fashion agent interacts with you.
        </p>
      </div>

      <div className="space-y-6">
        {/* Enable Agent */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated border border-sand/50">
          <div>
            <h3 className="font-medium text-noir">Enable Fashion Agent</h3>
            <p className="text-sm text-stone">Get personalized style intelligence</p>
          </div>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>

        {/* Proactivity Level */}
        <div className="space-y-4 p-4 rounded-xl bg-surface-elevated border border-sand/50">
          <div>
            <h3 className="font-medium text-noir">Agent Proactivity</h3>
            <p className="text-sm text-stone">How often should your agent reach out?</p>
          </div>
          <div className="space-y-3">
            <Slider
              value={[proactivity]}
              onValueChange={([value]) => setProactivity(value)}
              max={100}
              step={25}
              disabled={!enabled}
            />
            <div className="flex justify-between text-xs text-stone">
              <span>Minimal</span>
              <span className="font-medium text-noir">{getProactivityLabel(proactivity)}</span>
              <span>Very Proactive</span>
            </div>
          </div>
        </div>

        {/* Availability Alerts */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated border border-sand/50">
          <div>
            <h3 className="font-medium text-noir">Availability Alerts</h3>
            <p className="text-sm text-stone">Get notified when saved items become available</p>
          </div>
          <Switch
            checked={availabilityAlerts}
            onCheckedChange={setAvailabilityAlerts}
            disabled={!enabled}
          />
        </div>

        {/* Style Evolution Insights */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated border border-sand/50">
          <div>
            <h3 className="font-medium text-noir">Style Evolution Insights</h3>
            <p className="text-sm text-stone">Receive insights about your evolving style</p>
          </div>
          <Switch
            checked={styleInsights}
            onCheckedChange={setStyleInsights}
            disabled={!enabled}
          />
        </div>
      </div>

      <div className="bg-ivory-warm rounded-xl p-4">
        <p className="text-xs text-stone text-center">
          You can change these preferences anytime in your account settings.
          Your agent learns from your feedback and adjusts over time.
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}
