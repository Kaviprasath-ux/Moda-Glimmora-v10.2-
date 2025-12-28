"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import * as api from "@/lib/api";
import type { Brand } from "@/types";

export default function UniversesPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await api.getBrands();
      setBrands(data);
      setIsLoading(false);
    };
    fetchBrands();
  }, []);

  if (isLoading) {
    return <LoadingIntelligence message="Loading brand universes..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-display text-display-md text-noir mb-2">
          Brand Universes
        </h1>
        <p className="text-stone max-w-xl mx-auto">
          Explore the cultural heritage, craftsmanship, and philosophy of luxury houses.
          Culture first, commerce silent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/universes/${brand.id}`}>
              <Card className="universe-card h-full">
                <div className="aspect-[4/3] bg-sand-light relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-stone">
                    [Brand Image]
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-noir/60 to-transparent p-4">
                    <h3 className="font-display text-xl font-semibold text-ivory-cream">
                      {brand.name}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm text-gold-muted">{brand.tagline}</p>
                  <p className="text-sm text-stone line-clamp-2">
                    {brand.philosophy.slice(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone">
                      Est. {brand.founded} • {brand.origin}
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1 text-gold-muted">
                      Enter <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
