import { AvailabilityAlert, StyleEvolution } from "@/types";

export const mockAvailabilityAlerts: AvailabilityAlert[] = [
  {
    id: "alert_001",
    itemId: "item_003",
    itemName: "The Row Margaux Bag",
    previousProbability: 12,
    currentProbability: 78,
    bestSource: {
      location: "Milan",
      probability: 92,
      deliveryDays: "5-7",
    },
    timestamp: new Date().toISOString(),
    userInterest: "expressed",
  },
  {
    id: "alert_002",
    itemId: "item_005",
    itemName: "Hermes Silk Scarf",
    previousProbability: 45,
    currentProbability: 88,
    bestSource: {
      location: "Paris",
      probability: 95,
      deliveryDays: "4-6",
    },
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    userInterest: "saved",
  },
  {
    id: "alert_003",
    itemId: "item_001",
    itemName: "Celine Sculptural Coat",
    previousProbability: 55,
    currentProbability: 94,
    bestSource: {
      location: "Paris",
      probability: 94,
      deliveryDays: "5-7",
    },
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    userInterest: "viewed",
  },
];

export const mockStyleEvolution: StyleEvolution = {
  currentPhase: "Architectural Minimalism",
  evolutionPath: [
    {
      period: "6 months ago",
      description: "Classic Minimalist",
      dominantElements: ["Clean lines", "Neutral palette", "Structured basics"],
    },
    {
      period: "3 months ago",
      description: "Refined Minimalist",
      dominantElements: ["Quality materials", "Subtle textures", "Earth tones"],
    },
    {
      period: "Current",
      description: "Architectural Minimalism",
      dominantElements: [
        "Sculptural silhouettes",
        "Material excellence",
        "Parisian influence",
      ],
    },
  ],
  emergingInterests: [
    "Structured outerwear",
    "Japanese minimalism",
    "Artisanal craftsmanship",
  ],
  insights: [
    "You're increasingly drawn to pieces that make a statement through form rather than embellishment",
    "Your color palette is expanding toward warmer earth tones",
    "Brand loyalty is forming around houses with strong craft heritage",
  ],
};
