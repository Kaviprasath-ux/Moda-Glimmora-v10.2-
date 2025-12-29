import { ConversationResponse } from "@/types";

export const mockConversationResponses: Record<string, ConversationResponse> = {
  "gallery opening": {
    understanding:
      "I understand. For a gallery opening, you want statement presence without losing your quiet luxury aesthetic — artistic context alignment and confidence without costume.",
    directions: [
      {
        id: "dir_001",
        title: "Sculptural Silhouette",
        description:
          "A structured piece that creates visual interest through form rather than embellishment.",
        suggestedItems: ["item_001", "item_004"],
      },
      {
        id: "dir_002",
        title: "Material Statement",
        description: "Let the fabric speak — luxurious material in a simple cut.",
        suggestedItems: ["item_002"],
      },
      {
        id: "dir_003",
        title: "Considered Color",
        description:
          "A departure from your usual neutrals — burgundy or forest green in your signature silhouettes.",
        suggestedItems: ["item_005"],
      },
    ],
    followUp:
      "Would you like me to explore any of these directions, or shall we refine further?",
  },

  work: {
    understanding:
      "You're looking to strengthen your professional wardrobe. Based on your identity, you prefer authority through understatement rather than power dressing.",
    directions: [
      {
        id: "dir_004",
        title: "Elevated Basics",
        description:
          "Exceptional quality in foundational pieces that command respect through material excellence.",
        suggestedItems: ["item_002"],
      },
      {
        id: "dir_005",
        title: "Structured Authority",
        description: "Architectural pieces that convey presence in professional settings.",
        suggestedItems: ["item_001", "item_004"],
      },
    ],
    followUp:
      "What type of work environment should I consider? Creative, corporate, or client-facing?",
  },

  travel: {
    understanding:
      "Creating a travel capsule that maintains your aesthetic standards while being practical. Versatility without compromising on quality.",
    directions: [
      {
        id: "dir_006",
        title: "Wrinkle-Resistant Luxury",
        description: "High-quality pieces that travel well without sacrificing elegance.",
        suggestedItems: ["item_002"],
      },
      {
        id: "dir_007",
        title: "Day-to-Evening Transitions",
        description: "Pieces that adapt from exploration to dinner without changing.",
        suggestedItems: ["item_004", "item_005"],
      },
    ],
    followUp: "What's your destination? Climate and culture will inform my suggestions.",
  },

  wardrobe: {
    understanding:
      "Based on my analysis of your wardrobe, I've identified key gaps that would maximize versatility and complete your style vision.",
    directions: [
      {
        id: "dir_008",
        title: "Structured Outerwear",
        description:
          "A sculptural coat would unlock 12 new outfit combinations with your existing pieces.",
        suggestedItems: ["item_001"],
      },
      {
        id: "dir_009",
        title: "Neutral Knitwear",
        description:
          "A cream cashmere crewneck fills a layering gap in your wardrobe.",
        suggestedItems: ["item_002"],
      },
      {
        id: "dir_010",
        title: "Professional Accessories",
        description:
          "A structured tote would elevate your work wardrobe significantly.",
        suggestedItems: ["item_003"],
      },
    ],
    followUp: "Would you like to explore any of these gaps in more detail?",
  },

  evening: {
    understanding:
      "For evening occasions, you appreciate understated elegance that commands attention through quality and cut, not embellishment.",
    directions: [
      {
        id: "dir_011",
        title: "Quiet Drama",
        description:
          "Pieces that create presence through architectural silhouettes and luxe materials.",
        suggestedItems: ["item_001"],
      },
      {
        id: "dir_012",
        title: "Refined Accessories",
        description:
          "Statement through considered accessories in heritage brands.",
        suggestedItems: ["item_005", "item_003"],
      },
    ],
    followUp: "Is this for a specific event or building your evening wardrobe generally?",
  },

  "special occasions": {
    understanding:
      "Understood. For a special occasion, we want precision: silhouette, cultural appropriateness, comfort under time pressure, and a clear acquisition path if availability is uncertain.",
    directions: [
      {
        id: "dir_013",
        title: "Quiet Formal",
        description:
          "Elegant structure and refined materials that read formal without feeling costume-like.",
        suggestedItems: ["item_001", "item_004"],
      },
      {
        id: "dir_014",
        title: "Statement Through Craft",
        description:
          "A single heritage element (scarf/accessory) that elevates the entire look.",
        suggestedItems: ["item_005", "item_003"],
      },
    ],
    followUp:
      "What is the setting (wedding, gala, cultural evening) and what time window do you have for delivery?",
  },
};

export const defaultConversationResponse: ConversationResponse = {
  understanding:
    "I'm considering your style philosophy and wardrobe context to find the right direction for you.",
  directions: [
    {
      id: "dir_default",
      title: "Let me understand better",
      description:
        "Could you tell me more about the occasion, setting, or feeling you're looking for?",
      suggestedItems: [],
    },
  ],
  followUp:
    "What matters most to you for this — the occasion, the aesthetic, or filling a gap in your wardrobe?",
};
