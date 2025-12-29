"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useIdentityStore } from "@/stores/identityStore";
import { useAgentMemoryStore } from "@/stores/agentMemoryStore";
import { useFeedbackStore } from "@/stores/feedbackStore";

export default function AccountMemoryPage() {
  const identity = useIdentityStore();
  const { traits, upsertTrait, removeTrait, reset } = useAgentMemoryStore();
  const { entries, clear: clearFeedback } = useFeedbackStore();
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  const seeded = useMemo(() => traits.length > 0, [traits.length]);

  useEffect(() => {
    if (seeded) return;
    // Seed a minimal “what the agent knows” set from onboarding.
    if (identity.philosophies.length > 0) {
      upsertTrait({
        id: "philosophies",
        label: "Style philosophies",
        value: identity.philosophies.join(", "),
        source: "identity_onboarding",
      });
    }
    if (identity.culturalAffinities.length > 0) {
      upsertTrait({
        id: "culture",
        label: "Cultural affinities",
        value: identity.culturalAffinities.join(", "),
        source: "identity_onboarding",
      });
    }
    if (identity.agentPreferences.enabled !== undefined) {
      upsertTrait({
        id: "agent_enabled",
        label: "Agent enabled",
        value: identity.agentPreferences.enabled ? "Yes" : "No",
        source: "identity_onboarding",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seeded]);

  const addTrait = () => {
    if (!newLabel.trim() || !newValue.trim()) return;
    const id = `custom_${newLabel.toLowerCase().replace(/\s+/g, "_")}`;
    upsertTrait({
      id,
      label: newLabel.trim(),
      value: newValue.trim(),
      source: "explicit_setting",
    });
    setNewLabel("");
    setNewValue("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-gold-muted" />
        <h1 className="font-display text-display-md text-noir">Agent Memory</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">What the agent knows</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {traits.length === 0 ? (
            <p className="text-sm text-stone">
              No saved traits yet. Complete onboarding or add one below.
            </p>
          ) : (
            <div className="space-y-2">
              {traits.map((t) => (
                <div
                  key={t.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg border border-sand/50 bg-surface-elevated"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-noir">{t.label}</p>
                    <p className="text-sm text-stone">{t.value}</p>
                    <p className="text-xs text-stone mt-1">
                      Source: {t.source.replace(/_/g, " ")} • Updated:{" "}
                      {new Date(t.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeTrait(t.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-sand/50 space-y-3">
            <p className="text-sm font-medium text-noir">Add a memory trait</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Trait (e.g., 'Avoids loud logos')"
              />
              <Input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Value (e.g., 'Yes')"
              />
            </div>
            <Button variant="secondary" onClick={addTrait} disabled={!newLabel.trim() || !newValue.trim()}>
              Add trait
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gold-soft/30">
        <CardHeader>
          <CardTitle className="text-base">Reversibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-stone">
            Clear the agent’s learned memory and feedback.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              className="gap-2"
              onClick={() => {
                reset();
                clearFeedback();
              }}
            >
              <RefreshCw className="h-4 w-4" />
              Reset memory + feedback
            </Button>
          </div>
          <p className="text-xs text-stone">
            Feedback entries stored: {entries.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


