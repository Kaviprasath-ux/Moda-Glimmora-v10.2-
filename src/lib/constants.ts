export const SITE_NAME = "ModaGlimmora";
export const SITE_TAGLINE = "Fashion Intelligence Platform";
export const SITE_DESCRIPTION =
  "ModaGlimmora is a Fashion Intelligence Platform. Culture-first, commerce-silent. We don't sell fashion — we understand it.";

export const NAVIGATION = {
  main: [
    { name: "Home", href: "/intelligence" },
    { name: "Discover", href: "/discover" },
    { name: "Universes", href: "/universes" },
    { name: "Wardrobe", href: "/wardrobe" },
  ],
  account: [
    { name: "Account", href: "/account" },
    { name: "Fashion Identity", href: "/account/identity" },
    { name: "AI Agent", href: "/account/agent" },
    { name: "Privacy", href: "/account/privacy" },
  ],
  footer: [
    { name: "Trust Principles", href: "/trust" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export const IDENTITY_STEPS = [
  { id: "philosophy", title: "Style Philosophy", path: "/identity/philosophy" },
  { id: "culture", title: "Cultural Affinity", path: "/identity/culture" },
  { id: "body", title: "Body Intelligence", path: "/identity/body" },
  { id: "wardrobe", title: "Wardrobe Context", path: "/identity/wardrobe" },
  { id: "preferences", title: "AI Preferences", path: "/identity/preferences" },
  { id: "agent", title: "Meet Your Agent", path: "/identity/agent" },
];

export const TRUST_PRINCIPLES = [
  {
    icon: "lock",
    title: "Your data stays yours",
    description: "Full control over your fashion intelligence data",
  },
  {
    icon: "brain",
    title: "AI you control",
    description: "Adjust proactivity, reset memory, set boundaries",
  },
  {
    icon: "sparkles",
    title: "No dark patterns",
    description: "No urgency tricks, no artificial scarcity",
  },
  {
    icon: "chart",
    title: "Explainable intelligence",
    description: "Understand why every recommendation is made",
  },
  {
    icon: "refresh",
    title: "Reversible always",
    description: "Undo any action, remove any data",
  },
  {
    icon: "users",
    title: "Human-in-the-loop",
    description: "AI proposes, you decide",
  },
];

export const COLOR_PALETTE_OPTIONS = [
  "Neutrals",
  "Earth Tones",
  "Cool Tones",
  "Warm Tones",
  "Pastels",
  "Jewel Tones",
  "Burgundy",
  "Forest Green",
  "Navy",
  "Black",
  "White",
  "Camel",
];

export const FIT_PREFERENCE_OPTIONS = ["Fitted", "Regular", "Relaxed", "Oversized", "Structured"];

export const SIZE_OPTIONS = {
  top: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
  bottom: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
  dress: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
  shoe: ["35", "36", "37", "38", "39", "40", "41", "42"],
};

export const CATEGORIES = [
  "Outerwear",
  "Tops",
  "Bottoms",
  "Dresses",
  "Knitwear",
  "Accessories",
  "Shoes",
];

export const PROACTIVITY_LABELS: Record<number, string> = {
  0: "Minimal",
  25: "Occasional",
  50: "Balanced",
  75: "Proactive",
  100: "Very Proactive",
};
