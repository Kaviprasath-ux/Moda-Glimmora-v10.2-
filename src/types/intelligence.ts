export interface AvailabilityAlert {
  id: string;
  itemId: string;
  itemName: string;
  previousProbability: number;
  currentProbability: number;
  bestSource: {
    location: string;
    probability: number;
    deliveryDays: string;
  };
  timestamp: string;
  userInterest: "expressed" | "saved" | "viewed";
}

export interface StyleEvolution {
  currentPhase: string;
  evolutionPath: EvolutionPeriod[];
  emergingInterests: string[];
  insights: string[];
}

export interface EvolutionPeriod {
  period: string;
  description: string;
  dominantElements: string[];
}

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  directions?: Direction[];
}

export interface ConversationResponse {
  understanding: string;
  directions: Direction[];
  followUp: string;
}

export interface Direction {
  id: string;
  title: string;
  description: string;
  suggestedItems: string[];
  items?: any[];
}

export interface AcquisitionData {
  itemId: string;
  size: string;
  color: string;
  source: string;
}

export interface AcquisitionResult {
  success: boolean;
  acquisitionId: string;
  estimatedDelivery: string;
  source: string;
}
