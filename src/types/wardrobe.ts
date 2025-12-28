export interface WardrobeItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  color: string;
  image: string;
  addedAt: string;
  lastWorn: string;
  wearCount: number;
  outfitCount: number;
  costPerWear: number;
  acquisition: {
    source: "ModaGlimmora" | "Existing" | "Gift";
    date: string | null;
  };
}

export interface WardrobeGap {
  id: string;
  category: string;
  description: string;
  priority: "high" | "medium" | "low";
  impact: {
    newOutfits: number;
    occasions: string[];
  };
  reasoning: string;
  suggestedItems: string[];
  pairingsWith: string[];
  suggestions?: any[];
}

export interface WardrobeSummary {
  totalPieces: number;
  outfitCombinations: number;
  utilizationRate: number;
  styleCoherenceScore: number;
  categoryBreakdown: Record<string, number>;
  mostWorn: WardrobeUsageStat[];
  underutilized: WardrobeUsageStat[];
}

export interface WardrobeUsageStat {
  id: string;
  name: string;
  wearCount: number;
  lastWorn?: string;
}

export interface OutfitCombination {
  id: string;
  name: string;
  items: string[];
  occasions: string[];
  confidence: number;
  createdAt: string;
}
