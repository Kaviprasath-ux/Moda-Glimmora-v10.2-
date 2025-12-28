"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntelligenceBadge } from "@/components/shared/IntelligenceBadge";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import * as api from "@/lib/api";
import type { Brand } from "@/types";

export default function BrandUniversePage() {
  const params = useParams();
  const brandId = params.brandId as string;
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      const data = await api.getBrand(brandId);
      setBrand(data);
      setIsLoading(false);
    };
    fetchBrand();
  }, [brandId]);

  if (isLoading) {
    return <LoadingIntelligence message="Entering universe..." />;
  }

  if (!brand) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-stone">Brand not found.</p>
        <Link href="/universes">
          <Button variant="secondary" className="mt-4">
            Back to Universes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] bg-sand-light">
        <div className="absolute inset-0 flex items-center justify-center text-stone">
          [Hero Image]
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link href="/universes" className="inline-flex items-center gap-2 text-ivory-cream/80 hover:text-ivory-cream mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Universes
            </Link>
            <h1 className="font-display text-display-lg text-ivory-cream">
              {brand.name}
            </h1>
            <p className="text-lg text-ivory-cream/80">{brand.tagline}</p>
            <p className="text-sm text-ivory-cream/60 mt-2">
              Est. {brand.founded} • {brand.origin}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="heritage" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-lg mx-auto">
            <TabsTrigger value="heritage">Heritage</TabsTrigger>
            <TabsTrigger value="craft">Craft</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
          </TabsList>

          <TabsContent value="heritage" className="space-y-8">
            {/* Philosophy */}
            <Card>
              <CardContent className="p-8">
                <blockquote className="font-display text-xl text-noir italic mb-6">
                  &ldquo;{brand.philosophy}&rdquo;
                </blockquote>
                <div className="pt-4 border-t border-sand/50">
                  <IntelligenceBadge label="Why this aligns with you" className="mb-2" />
                  <p className="text-stone">{brand.alignmentReason}</p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <div>
              <h2 className="font-display text-xl text-noir mb-6">Heritage Timeline</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-sand" />
                <div className="space-y-8">
                  {brand.universe.heritage.timeline.map((event, index) => (
                    <motion.div
                      key={event.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-12"
                    >
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-gold-soft flex items-center justify-center text-xs font-medium text-noir">
                        {event.year.toString().slice(-2)}
                      </div>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-noir">{event.title}</h3>
                            <span className="text-xs text-stone">{event.year}</span>
                          </div>
                          <p className="text-sm text-stone">{event.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="craft" className="space-y-6">
            <h2 className="font-display text-xl text-noir">Craftsmanship</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brand.universe.craftsmanship.map((craft, index) => (
                <motion.div
                  key={craft.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <div className="aspect-video bg-sand-light relative">
                      <div className="absolute inset-0 flex items-center justify-center text-stone text-sm">
                        [Video/Image]
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-noir mb-2">{craft.title}</h3>
                      <p className="text-sm text-stone">{craft.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="culture" className="space-y-6">
            <h2 className="font-display text-xl text-noir">Cultural Connections</h2>
            <div className="space-y-4">
              {brand.universe.culturalConnections.map((connection, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <p className="text-noir">{connection}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="explore" className="text-center py-12">
            <p className="text-stone mb-4">
              Explore pieces from {brand.name} that align with your style.
            </p>
            <Link href={`/discover?brand=${brand.id}`}>
              <Button className="gap-2">
                Explore {brand.name} Pieces
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </TabsContent>
        </Tabs>

        {/* Brand Concierge */}
        <Card className="mt-12 border-gold-soft/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-soft/20 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-gold-muted" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-medium text-noir mb-1">
                  {brand.name} Concierge
                </h3>
                <p className="text-sm text-stone mb-4">
                  Ask me about the house of {brand.name} — our heritage, craft, philosophy.
                  I&apos;m here to share, not to sell.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm">
                    Tell me about the heritage
                  </Button>
                  <Button variant="secondary" size="sm">
                    How are pieces made?
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
