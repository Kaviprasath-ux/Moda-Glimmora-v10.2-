import { User, AgentInsight } from "@/types";

export const mockUser: User = {
  id: "user_001",
  email: "sarah@example.com",
  name: "Sarah Chen",
  avatar: "/avatars/sarah.jpg",
  createdAt: "2024-01-15",

  fashionIdentity: {
    philosophies: ["Quiet Luxury", "Architectural Minimalism"],
    culturalAffinities: ["Parisian Elegance", "Japanese Minimalism"],
    confidenceLevel: 65,
    brandAffinities: ["Celine", "The Row", "Loro Piana", "Jil Sander"],
    occasionPriorities: ["Work & Professional", "Evening & Cultural", "Weekend & Travel"],
    colorPreferences: {
      primary: ["Neutrals", "Earth Tones"],
      accent: ["Burgundy", "Forest Green"],
      avoid: ["Bright Colors", "Neons"],
    },
  },

  bodyIntelligence: {
    height: { value: 168, unit: "cm" },
    fitPreferences: {
      tops: "Fitted",
      bottoms: "Regular",
      dresses: "Fitted",
      outerwear: "Structured",
    },
    usualSizes: {
      top: "S",
      bottom: "M",
      dress: "S",
      shoe: "38",
    },
    fitConcerns: ["Sleeve Length"],
  },

  agentPreferences: {
    enabled: true,
    proactivityLevel: 60,
    silentSelectionsEnabled: false,
    availabilityAlerts: true,
    styleEvolutionInsights: true,
    communicationFrequency: "weekly",
  },
};

export const mockAgentInsight: AgentInsight = {
  greeting: "Good evening, Sarah.",
  insight:
    "Your style is evolving. Over the past month, I've noticed you're drawn to more structured silhouettes and earth tones. This suggests a shift toward architectural minimalism.",
  suggestion: "Shall I show you pieces that align with this direction?",
  timestamp: new Date().toISOString(),
};
