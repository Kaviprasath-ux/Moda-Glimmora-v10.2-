import { Item, Discovery } from "@/types";

export const mockItems: Item[] = [
  {
    id: "item_001",
    name: "Sculptural Wool Coat",
    brand: {
      id: "brand_celine",
      name: "Celine",
      universe: "/universes/celine",
    },
    price: {
      amount: 2450,
      currency: "EUR",
    },
    images: [
      "/items/celine-coat-1.jpg",
      "/items/celine-coat-2.jpg",
      "/items/celine-coat-3.jpg",
    ],
    colors: [
      { id: "noir", name: "Noir", hex: "#1A1816" },
      { id: "camel", name: "Camel", hex: "#C9A962" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Outerwear",
    culturalContext: {
      designPhilosophy:
        "This piece represents Celine's commitment to architectural form and material excellence. The sculptural shoulder creates presence without volume.",
      craftHighlights: ["Double-faced wool", "Hand-finished seams", "Made in Italy"],
      culturalResonance:
        "Rooted in the Parisian tradition of elevating simplicity to statement.",
    },
    aiReasoning: {
      primaryReason: "Architectural silhouette matches your style philosophy",
      supportingReasons: [
        "Parisian design house aligns with your cultural affinity",
        "Fills identified wardrobe gap: structured outerwear",
        "Neutral color integrates with 85% of your wardrobe",
        "Appropriate for: Work, Evening, Gallery (your occasions)",
      ],
      confidence: 92,
    },
    fitIntelligence: {
      overallScore: 94,
      breakdown: [
        { area: "Shoulders", prediction: "Excellent", note: "Structured fit ideal for your frame" },
        { area: "Bust", prediction: "Good", note: "Comfortable ease" },
        { area: "Waist", prediction: "Excellent", note: "Clean line preserved" },
        { area: "Length", prediction: "Attention", note: "May be 2cm long for your height" },
      ],
      comparisonBase: "Based on 847 similar profiles who own this piece",
    },
    availabilityIntelligence: {
      globalProbability: 78,
      sources: [
        { location: "Paris", probability: 94, deliveryDays: "5-7" },
        { location: "Milan", probability: 88, deliveryDays: "6-8" },
        { location: "London", probability: 72, deliveryDays: "5-6" },
        { location: "New York", probability: 45, deliveryDays: "3-4" },
        { location: "Tokyo", probability: 62, deliveryDays: "8-10" },
      ],
      restockIntelligence: {
        probability: 67,
        estimatedDays: 21,
        note: "Based on historical restock patterns",
      },
    },
    stylingIntelligence: {
      wardrobePairings: [
        { itemId: "wardrobe_001", name: "Silk Blouse", compatibility: 95 },
        { itemId: "wardrobe_003", name: "Wool Trousers", compatibility: 92 },
        { itemId: "wardrobe_007", name: "Leather Boots", compatibility: 88 },
      ],
      outfitConfidence: 91,
      occasions: ["Work", "Evening", "Gallery Opening"],
    },
  },
  {
    id: "item_002",
    name: "Cashmere Crewneck",
    brand: {
      id: "brand_loro",
      name: "Loro Piana",
      universe: "/universes/loro-piana",
    },
    price: {
      amount: 1650,
      currency: "EUR",
    },
    images: ["/items/loro-cashmere-1.jpg"],
    colors: [
      { id: "cream", name: "Cream", hex: "#FAF8F5" },
      { id: "oatmeal", name: "Oatmeal", hex: "#D4CBBF" },
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Knitwear",
    culturalContext: {
      designPhilosophy:
        "Loro Piana's dedication to the world's finest raw materials. Baby cashmere sourced ethically, crafted into pieces meant to last decades.",
      craftHighlights: ["Baby cashmere", "12-gauge knit", "Made in Italy"],
      culturalResonance:
        "The Italian tradition of material excellence over visible branding.",
    },
    aiReasoning: {
      primaryReason: "Fills knitwear gap in your wardrobe",
      supportingReasons: [
        "Aligns with your neutral color preference",
        "Versatile for Work, Weekend, Travel occasions",
        "Loro Piana matches your quiet luxury philosophy",
      ],
      confidence: 87,
    },
    fitIntelligence: {
      overallScore: 91,
      breakdown: [
        { area: "Shoulders", prediction: "Good", note: "Relaxed fit as intended" },
        { area: "Bust", prediction: "Excellent", note: null },
        { area: "Length", prediction: "Excellent", note: null },
      ],
      comparisonBase: "Based on 523 similar profiles",
    },
    availabilityIntelligence: {
      globalProbability: 65,
      sources: [
        { location: "Milan", probability: 92, deliveryDays: "5-7" },
        { location: "Paris", probability: 78, deliveryDays: "6-8" },
      ],
      restockIntelligence: {
        probability: 82,
        estimatedDays: 14,
        note: "High restock frequency for core piece",
      },
    },
    stylingIntelligence: {
      wardrobePairings: [
        { itemId: "wardrobe_003", name: "Wool Trousers", compatibility: 94 },
        { itemId: "wardrobe_005", name: "Midi Skirt", compatibility: 89 },
      ],
      outfitConfidence: 88,
      occasions: ["Work", "Weekend", "Travel"],
    },
  },
  {
    id: "item_003",
    name: "Margaux Tote",
    brand: {
      id: "brand_therow",
      name: "The Row",
      universe: "/universes/the-row",
    },
    price: {
      amount: 3890,
      currency: "EUR",
    },
    images: ["/items/margaux-1.jpg", "/items/margaux-2.jpg"],
    colors: [
      { id: "black", name: "Black", hex: "#1A1816" },
      { id: "cognac", name: "Cognac", hex: "#8B4513" },
    ],
    sizes: ["One Size"],
    category: "Accessories",
    culturalContext: {
      designPhilosophy:
        "The Row's commitment to quiet luxury. The Margaux represents understated elegance through impeccable construction.",
      craftHighlights: ["Full-grain leather", "Hand-stitched handles", "Made in Italy"],
      culturalResonance:
        "An accessory that speaks through quality, not logos.",
    },
    aiReasoning: {
      primaryReason: "Fills structured tote gap in your accessories",
      supportingReasons: [
        "Perfect for work and travel occasions",
        "The Row aligns with your quiet luxury philosophy",
        "Timeless investment piece",
      ],
      confidence: 89,
    },
    fitIntelligence: {
      overallScore: 100,
      breakdown: [
        { area: "Size", prediction: "Excellent", note: "Perfect for daily essentials" },
      ],
      comparisonBase: "Based on usage patterns",
    },
    availabilityIntelligence: {
      globalProbability: 42,
      sources: [
        { location: "Milan", probability: 78, deliveryDays: "5-7" },
        { location: "Los Angeles", probability: 45, deliveryDays: "4-5" },
      ],
      restockIntelligence: {
        probability: 55,
        estimatedDays: 45,
        note: "Limited production, longer restock cycles",
      },
    },
    stylingIntelligence: {
      wardrobePairings: [
        { itemId: "wardrobe_001", name: "Silk Blouse", compatibility: 96 },
        { itemId: "wardrobe_003", name: "Wool Trousers", compatibility: 94 },
      ],
      outfitConfidence: 95,
      occasions: ["Work", "Travel", "Professional"],
    },
  },
  {
    id: "item_004",
    name: "Tailored Wool Trousers",
    brand: {
      id: "brand_jilsander",
      name: "Jil Sander",
      universe: "/universes/jil-sander",
    },
    price: {
      amount: 890,
      currency: "EUR",
    },
    images: ["/items/jilsander-trousers-1.jpg"],
    colors: [
      { id: "charcoal", name: "Charcoal", hex: "#4A453D" },
      { id: "navy", name: "Navy", hex: "#2C3E50" },
    ],
    sizes: ["34", "36", "38", "40", "42"],
    category: "Bottoms",
    culturalContext: {
      designPhilosophy:
        "Jil Sander's pursuit of pure form. These trousers embody the minimalist philosophy through precise tailoring.",
      craftHighlights: ["Italian wool", "Precision tailoring", "Clean seams"],
      culturalResonance:
        "German efficiency meets Italian craftsmanship.",
    },
    aiReasoning: {
      primaryReason: "Complements your architectural minimalism philosophy",
      supportingReasons: [
        "Versatile workwear piece",
        "Works with 78% of your existing wardrobe",
        "Charcoal fills a color gap in your bottoms",
      ],
      confidence: 85,
    },
    fitIntelligence: {
      overallScore: 88,
      breakdown: [
        { area: "Waist", prediction: "Excellent", note: "True to size" },
        { area: "Hips", prediction: "Good", note: "Comfortable ease" },
        { area: "Length", prediction: "Attention", note: "May need hemming" },
      ],
      comparisonBase: "Based on 412 similar profiles",
    },
    availabilityIntelligence: {
      globalProbability: 72,
      sources: [
        { location: "Milan", probability: 88, deliveryDays: "4-6" },
        { location: "Munich", probability: 82, deliveryDays: "3-5" },
        { location: "Paris", probability: 65, deliveryDays: "5-7" },
      ],
      restockIntelligence: {
        probability: 78,
        estimatedDays: 18,
        note: "Core item with regular restocking",
      },
    },
    stylingIntelligence: {
      wardrobePairings: [
        { itemId: "wardrobe_001", name: "Silk Blouse", compatibility: 92 },
        { itemId: "wardrobe_002", name: "Cashmere Sweater", compatibility: 90 },
      ],
      outfitConfidence: 87,
      occasions: ["Work", "Evening", "Professional"],
    },
  },
  {
    id: "item_005",
    name: "Silk Scarf",
    brand: {
      id: "brand_hermes",
      name: "Hermes",
      universe: "/universes/hermes",
    },
    price: {
      amount: 450,
      currency: "EUR",
    },
    images: ["/items/hermes-scarf-1.jpg"],
    colors: [
      { id: "burgundy", name: "Burgundy", hex: "#722F37" },
      { id: "navy", name: "Navy", hex: "#2C3E50" },
    ],
    sizes: ["90cm"],
    category: "Accessories",
    culturalContext: {
      designPhilosophy:
        "Each Hermes carre is a piece of wearable art, with designs that tell stories and colors that layer meaning.",
      craftHighlights: ["Twill silk", "Up to 45 screens per design", "Hand-rolled edges"],
      culturalResonance:
        "A century of storytelling through silk.",
    },
    aiReasoning: {
      primaryReason: "Adds accent color per your preferences",
      supportingReasons: [
        "Burgundy is in your accent palette",
        "Versatile accessory for multiple occasions",
        "Heritage house aligns with craft appreciation",
      ],
      confidence: 82,
    },
    fitIntelligence: {
      overallScore: 100,
      breakdown: [
        { area: "Size", prediction: "Excellent", note: "Classic 90cm format" },
      ],
      comparisonBase: "Universal sizing",
    },
    availabilityIntelligence: {
      globalProbability: 88,
      sources: [
        { location: "Paris", probability: 95, deliveryDays: "4-6" },
        { location: "London", probability: 88, deliveryDays: "3-5" },
        { location: "New York", probability: 82, deliveryDays: "4-6" },
      ],
      restockIntelligence: {
        probability: 92,
        estimatedDays: 7,
        note: "Core accessory with high availability",
      },
    },
    stylingIntelligence: {
      wardrobePairings: [
        { itemId: "wardrobe_001", name: "Silk Blouse", compatibility: 88 },
        { itemId: "wardrobe_004", name: "Navy Blazer", compatibility: 92 },
      ],
      outfitConfidence: 85,
      occasions: ["Work", "Evening", "Weekend"],
    },
  },
];

export const mockDiscoveries: Discovery[] = [
  {
    id: "disc_001",
    itemId: "item_001",
    reason: "Architectural silhouette + wardrobe gap",
    fitScore: 94,
    availabilityScore: 78,
  },
  {
    id: "disc_002",
    itemId: "item_002",
    reason: "Quiet luxury philosophy match",
    fitScore: 91,
    availabilityScore: 65,
  },
  {
    id: "disc_003",
    itemId: "item_004",
    reason: "Complements your minimalist wardrobe",
    fitScore: 88,
    availabilityScore: 72,
  },
  {
    id: "disc_004",
    itemId: "item_005",
    reason: "Accent color from your palette",
    fitScore: 100,
    availabilityScore: 88,
  },
];
