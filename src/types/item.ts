export interface Item {
  id: string;
  name: string;
  brand: {
    id: string;
    name: string;
    universe: string;
  };
  price: {
    amount: number;
    currency: string;
  };
  images: string[];
  colors: ColorOption[];
  sizes: string[];
  category: string;
  culturalContext: CulturalContext;
  aiReasoning: AIReasoning;
  fitIntelligence: FitIntelligence;
  availabilityIntelligence: AvailabilityIntelligence;
  stylingIntelligence: StylingIntelligence;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

export interface CulturalContext {
  designPhilosophy: string;
  craftHighlights: string[];
  culturalResonance: string;
}

export interface AIReasoning {
  primaryReason: string;
  supportingReasons: string[];
  confidence: number;
}

export interface FitIntelligence {
  overallScore: number;
  breakdown: FitBreakdownItem[];
  comparisonBase: string;
}

export interface FitBreakdownItem {
  area: string;
  prediction: "Excellent" | "Good" | "Attention" | "Caution";
  note: string | null;
}

export interface AvailabilityIntelligence {
  globalProbability: number;
  sources: AvailabilitySource[];
  restockIntelligence: RestockIntelligence;
}

export interface AvailabilitySource {
  location: string;
  probability: number;
  deliveryDays: string;
}

export interface RestockIntelligence {
  probability: number;
  estimatedDays: number;
  note: string;
}

export interface StylingIntelligence {
  wardrobePairings: WardrobePairing[];
  outfitConfidence: number;
  occasions: string[];
}

export interface WardrobePairing {
  itemId: string;
  name: string;
  compatibility: number;
}

export interface Discovery {
  id: string;
  itemId: string;
  reason: string;
  fitScore: number;
  availabilityScore: number;
  item?: Item;
}
