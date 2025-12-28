export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  fashionIdentity: FashionIdentity;
  bodyIntelligence: BodyIntelligence;
  agentPreferences: AgentPreferences;
}

export interface FashionIdentity {
  philosophies: string[];
  culturalAffinities: string[];
  confidenceLevel: number; // 0-100, higher = more adventurous
  brandAffinities: string[];
  occasionPriorities: string[];
  colorPreferences: ColorPreferences;
}

export interface ColorPreferences {
  primary: string[];
  accent: string[];
  avoid: string[];
}

export interface BodyIntelligence {
  height: {
    value: number;
    unit: "cm" | "in";
  };
  fitPreferences: {
    tops: FitPreference;
    bottoms: FitPreference;
    dresses: FitPreference;
    outerwear: FitPreference;
  };
  usualSizes: {
    top: string;
    bottom: string;
    dress: string;
    shoe: string;
  };
  fitConcerns: string[];
}

export type FitPreference = "Fitted" | "Regular" | "Relaxed" | "Oversized" | "Structured";

export interface AgentPreferences {
  enabled: boolean;
  proactivityLevel: number; // 0-100
  silentSelectionsEnabled: boolean;
  availabilityAlerts: boolean;
  styleEvolutionInsights: boolean;
  communicationFrequency: "daily" | "weekly" | "monthly" | "as-needed";
}

export interface AgentInsight {
  greeting: string;
  insight: string;
  suggestion: string;
  timestamp: string;
}

export interface CreateAccountData {
  email: string;
  password: string;
  name: string;
}
