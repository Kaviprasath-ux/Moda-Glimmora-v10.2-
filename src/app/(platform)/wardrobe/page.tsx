"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Grid, List, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LoadingIntelligence } from "@/components/shared/LoadingIntelligence";
import { useWardrobe } from "@/hooks/useWardrobe";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";

export default function WardrobePage() {
  const { items, gaps, summary, isLoading, selectedCategory, setSelectedCategory, filteredItems } = useWardrobe();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (isLoading) {
    return <LoadingIntelligence message="Analyzing your wardrobe..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-display-md text-noir">Wardrobe Intelligence</h1>
          <p className="text-stone">Your personal style ecosystem</p>
        </div>
        <div className="flex gap-2">
          <Link href="/wardrobe/gaps">
            <Button variant="secondary" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Gap Analysis
            </Button>
          </Link>
          <Link href="/wardrobe/evolution">
            <Button variant="secondary" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Style Evolution
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-display font-semibold text-noir">{summary.totalPieces}</p>
              <p className="text-sm text-stone">Total Pieces</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-display font-semibold text-noir">{summary.outfitCombinations}</p>
              <p className="text-sm text-stone">Outfit Combinations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-stone">Utilization Rate</p>
                <p className="text-sm font-medium text-noir">{summary.utilizationRate}%</p>
              </div>
              <Progress value={summary.utilizationRate} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-stone">Style Coherence</p>
                <p className="text-sm font-medium text-noir">{summary.styleCoherenceScore}%</p>
              </div>
              <Progress value={summary.styleCoherenceScore} indicatorClassName="bg-gold-muted" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              {summary && (
                <span className="ml-1 text-xs opacity-70">
                  ({summary.categoryBreakdown[category] || 0})
                </span>
              )}
            </Button>
          ))}
        </div>
        <div className="flex gap-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Wardrobe Items */}
      <div className={cn(
        viewMode === "grid"
          ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
          : "space-y-3"
      )}>
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {viewMode === "grid" ? (
              <Card className="overflow-hidden hover:shadow-moda-lg transition-shadow cursor-pointer">
                <div className="aspect-square bg-sand-light relative">
                  <div className="absolute inset-0 flex items-center justify-center text-stone text-xs">
                    [Image]
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-xs text-stone">{item.brand}</p>
                  <p className="text-sm font-medium text-noir truncate">{item.name}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-stone">
                    <span>{item.wearCount} wears</span>
                    <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="hover:shadow-moda-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-sand-light rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-stone">{item.brand}</p>
                    <p className="font-medium text-noir">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-stone">
                      <span>{item.wearCount} wears</span>
                      <span>{item.outfitCount} outfits</span>
                      <span>Last worn: {item.lastWorn}</span>
                    </div>
                  </div>
                  <Badge variant="secondary">{item.category}</Badge>
                </CardContent>
              </Card>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
