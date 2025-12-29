"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvailabilityBar } from "@/components/shared/AvailabilityBar";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import * as api from "@/lib/api";
import type { Item, Brand } from "@/types";

type Stage = "loading" | "ready" | "checking" | "confirmed";

export default function AcquirePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const itemId = searchParams.get("itemId");
  const presetSize = searchParams.get("size") || "";
  const presetColor = searchParams.get("color") || "";

  const [item, setItem] = useState<Item | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [stage, setStage] = useState<Stage>("loading");
  const [size, setSize] = useState(presetSize);
  const [color, setColor] = useState(presetColor);
  const [options, setOptions] = useState<
    { location: string; probability: number; deliveryDays: string }[]
  >([]);
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [result, setResult] = useState<{
    acquisitionId: string;
    estimatedDelivery: string;
    source: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const canCheck = useMemo(() => !!itemId && !!size && !!color, [itemId, size, color]);

  useEffect(() => {
    const run = async () => {
      if (!itemId) {
        setError("Missing itemId.");
        setStage("ready");
        return;
      }
      const data = await api.getItem(itemId);
      setItem(data);
      if (data) {
        setSize((s) => s || data.sizes[Math.floor(data.sizes.length / 2)]);
        setColor((c) => c || data.colors[0]?.name || "Default");
        const b = await api.getBrand(data.brand.id);
        setBrand(b);
      }
      setStage("ready");
    };
    run();
  }, [itemId]);

  const handleCheck = async () => {
    if (!itemId || !canCheck) return;
    setError("");
    setStage("checking");
    const res = await api.checkAvailability(itemId, size, color);
    setOptions(res.options);
    setSelectedSource(res.options[0]?.location || "");
    setStage("ready");
  };

  const handleBegin = async () => {
    if (!itemId || !selectedSource) return;
    setError("");
    setStage("checking");
    try {
      const r = await api.beginAcquisition({ itemId, size, color, source: selectedSource });
      setResult({ acquisitionId: r.acquisitionId, estimatedDelivery: r.estimatedDelivery, source: r.source });
      setStage("confirmed");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to begin acquisition");
      setStage("ready");
    }
  };

  if (stage === "loading") {
    return <LoadingIntelligence message="Preparing acquisition..." />;
  }

  if (!itemId) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <p className="text-stone">No item selected.</p>
        <Link href="/intelligence">
          <Button variant="secondary" className="mt-4">Back to Intelligence</Button>
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <p className="text-stone">Item not found.</p>
        <Link href="/intelligence">
          <Button variant="secondary" className="mt-4">Back to Intelligence</Button>
        </Link>
      </div>
    );
  }

  if (stage === "confirmed" && result) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="border-gold-soft/30">
          <CardContent className="p-8 text-center space-y-4">
            <CheckCircle2 className="h-10 w-10 text-success mx-auto" />
            <h1 className="font-display text-display-sm text-noir">Ready for checkout</h1>
            <p className="text-stone">
              ModaGlimmora guides the decision and availability pathway. Checkout happens on the brand’s official site.
            </p>
            <div className="text-sm text-noir space-y-1">
              <p><span className="text-stone">Acquisition ID:</span> {result.acquisitionId}</p>
              <p><span className="text-stone">Source:</span> {result.source}</p>
              <p><span className="text-stone">Estimated delivery:</span> {result.estimatedDelivery}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              {brand?.officialSiteUrl ? (
                <Button asChild>
                  <a
                    href={brand.officialSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Continue to {brand.name} official site
                  </a>
                </Button>
              ) : (
                <Button onClick={() => router.push(`/universes/${item.brand.id}`)}>
                  View {item.brand.name} universe
                </Button>
              )}
              <Button onClick={() => router.push(`/item/${item.id}`)} variant="secondary">
                Back to Item Intelligence
              </Button>
              <Button onClick={() => router.push("/selections")} variant="secondary">
                View Wishlist
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      <Link href={`/item/${item.id}`} className="inline-flex items-center gap-2 text-stone hover:text-noir">
        <ArrowLeft className="h-4 w-4" />
        Back to Item Intelligence
      </Link>

      <div className="space-y-1">
        <h1 className="font-display text-display-md text-noir">Begin Acquisition</h1>
        <p className="text-stone">
          We check availability pathways first. No commitment until you confirm.
        </p>
      </div>

      {error && (
        <Card className="border-error-soft/40">
          <CardContent className="p-4 text-sm text-error">{error}</CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{item.brand.name} — {item.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-stone">Size</p>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full h-10 rounded-lg border border-sand bg-surface-elevated px-3 text-sm"
              >
                {item.sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-stone">Color</p>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 rounded-lg border border-sand bg-surface-elevated px-3 text-sm"
              >
                {item.colors.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCheck} disabled={!canCheck || stage === "checking"}>
              {stage === "checking" ? "Checking..." : "Check availability pathways"}
            </Button>
            <Link href={`/passport/${item.id}`}>
              <Button variant="secondary">View Digital Passport</Button>
            </Link>
          </div>

          {options.length > 0 && (
            <div className="pt-4 border-t border-sand/50 space-y-3">
              <p className="text-sm text-noir font-medium">Recommended sourcing options</p>
              <div className="space-y-2">
                {options.map((opt) => (
                  <button
                    key={opt.location}
                    onClick={() => setSelectedSource(opt.location)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedSource === opt.location
                        ? "border-noir bg-sand-light"
                        : "border-sand hover:border-gold-soft/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-noir">{opt.location}</p>
                        <p className="text-xs text-stone">ETA: {opt.deliveryDays} days</p>
                      </div>
                      <div className="w-24">
                        <AvailabilityBar probability={opt.probability} showLabel={false} size="sm" />
                      </div>
                      <p className="text-sm text-noir w-12 text-right">{opt.probability}%</p>
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={handleBegin}
                disabled={!selectedSource || stage === "checking"}
                className="w-full"
              >
                {stage === "checking" ? "Initiating..." : "Confirm and continue to official checkout"}
              </Button>

              <p className="text-xs text-stone text-center">
                No auto-purchase, no reseller identities, no grey-market sourcing.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


