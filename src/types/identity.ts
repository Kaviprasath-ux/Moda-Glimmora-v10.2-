export interface IdentityStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface PhilosophyOption {
  id: string;
  name: string;
  description: string;
  image: string;
  keywords: string[];
}

export interface CultureOption {
  id: string;
  name: string;
  description: string;
  image: string;
  region: string;
}

export interface OccasionOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface IdentityProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
}

export const PHILOSOPHY_OPTIONS: PhilosophyOption[] = [
  {
    id: "quiet-luxury",
    name: "Quiet Luxury",
    description: "Understated elegance that speaks through quality and restraint",
    image: "/identity/quiet-luxury.jpg",
    keywords: ["understated", "quality", "restraint", "elegant"],
  },
  {
    id: "architectural-minimalism",
    name: "Architectural Minimalism",
    description: "Clean lines and sculptural forms that command presence",
    image: "/identity/architectural.jpg",
    keywords: ["clean", "sculptural", "structured", "geometric"],
  },
  {
    id: "romantic-heritage",
    name: "Romantic Heritage",
    description: "Timeless pieces with historical references and soft femininity",
    image: "/identity/romantic.jpg",
    keywords: ["timeless", "heritage", "feminine", "classic"],
  },
  {
    id: "avant-garde",
    name: "Avant-Garde",
    description: "Pushing boundaries with experimental forms and bold statements",
    image: "/identity/avant-garde.jpg",
    keywords: ["experimental", "bold", "unconventional", "artistic"],
  },
  {
    id: "effortless-chic",
    name: "Effortless Chic",
    description: "The art of looking put-together without trying too hard",
    image: "/identity/effortless.jpg",
    keywords: ["casual", "natural", "relaxed", "sophisticated"],
  },
  {
    id: "power-dressing",
    name: "Power Dressing",
    description: "Authority through intentional, commanding silhouettes",
    image: "/identity/power.jpg",
    keywords: ["authority", "commanding", "professional", "strong"],
  },
];

export const CULTURE_OPTIONS: CultureOption[] = [
  {
    id: "parisian-elegance",
    name: "Parisian Elegance",
    description: "The art of looking effortlessly polished with a rebellious edge",
    image: "/identity/paris.jpg",
    region: "France",
  },
  {
    id: "japanese-minimalism",
    name: "Japanese Minimalism",
    description: "The beauty of restraint and intentional imperfection",
    image: "/identity/japan.jpg",
    region: "Japan",
  },
  {
    id: "italian-craftsmanship",
    name: "Italian Craftsmanship",
    description: "Celebrating material excellence and artisanal tradition",
    image: "/identity/italy.jpg",
    region: "Italy",
  },
  {
    id: "scandinavian-function",
    name: "Scandinavian Function",
    description: "Where form follows function in perfect harmony",
    image: "/identity/scandinavia.jpg",
    region: "Scandinavia",
  },
  {
    id: "british-tailoring",
    name: "British Tailoring",
    description: "Centuries of sartorial excellence and precision",
    image: "/identity/british.jpg",
    region: "United Kingdom",
  },
  {
    id: "american-casual",
    name: "American Casual",
    description: "The democratization of style and accessible luxury",
    image: "/identity/american.jpg",
    region: "United States",
  },
];

export const OCCASION_OPTIONS: OccasionOption[] = [
  {
    id: "work-professional",
    name: "Work & Professional",
    description: "Office, meetings, and professional settings",
    icon: "briefcase",
  },
  {
    id: "evening-cultural",
    name: "Evening & Cultural",
    description: "Dinners, events, galleries, and performances",
    icon: "moon",
  },
  {
    id: "weekend-travel",
    name: "Weekend & Travel",
    description: "Leisure, exploration, and casual occasions",
    icon: "plane",
  },
  {
    id: "special-occasions",
    name: "Special Occasions",
    description: "Celebrations, weddings, and formal events",
    icon: "sparkles",
  },
];
