"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import * as api from "@/lib/api";
import type { Item } from "@/types";

export default function PassportPage() {
  const params = useParams();
  const itemId = params.itemId as string;
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const data = await api.getItem(itemId);
      setItem(data);
      setIsLoading(false);
    };
    run();
  }, [itemId]);

  if (isLoading) return <LoadingIntelligence message="Loading digital passport..." />;

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-stone">Item not found.</p>
        <Link href="/intelligence">
          <Button variant="secondary" className="mt-4">Back to Intelligence</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      <Link href={`/item/${item.id}`} className="inline-flex items-center gap-2 text-stone hover:text-noir">
        <ArrowLeft className="h-4 w-4" />
        Back to Item Intelligence
      </Link>

      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-gold-muted" />
        <h1 className="font-display text-display-md text-noir">Digital Fashion Passport</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{item.brand.name} — {item.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-stone">Provenance</p>
              <p className="text-noir">Brand-issued verification: Available on integration</p>
            </div>
            <div>
              <p className="text-xs text-stone">Authenticity signals</p>
              <p className="text-noir">Packaging + receipt + serial mapping supported</p>
            </div>
            <div>
              <p className="text-xs text-stone">Ownership</p>
              <p className="text-noir">User-controlled • exportable • deletable</p>
            </div>
            <div>
              <p className="text-xs text-stone">Compliance</p>
              <p className="text-noir">Audit logging always on</p>
            </div>
          </div>

          <div className="pt-4 border-t border-sand/50 space-y-2">
            <p className="text-xs text-stone">Important</p>
            <p className="text-stone leading-relaxed">
              Passport verification requires brand/issuer integration and cannot be inferred from
              browsing behavior.
            </p>
          </div>

          <Link href={`/acquire?itemId=${encodeURIComponent(item.id)}`}>
            <Button className="w-full">Continue to Acquisition</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}


