/**
 * ModaGlimmora API Service Layer
 *
 * All functions return mock data for UI development.
 * TODO comments indicate where real API calls will be integrated.
 *
 * This is Fashion Intelligence Infrastructure, not e-commerce.
 * Terminology matters.
 */

import { mockUser, mockAgentInsight } from "@/data/mockUser";
import { mockItems, mockDiscoveries } from "@/data/mockItems";
import { mockBrands, mockBrandRecommendations } from "@/data/mockBrands";
import { mockWardrobe, mockWardrobeGaps, mockWardrobeSummary } from "@/data/mockWardrobe";
import { mockAvailabilityAlerts, mockStyleEvolution } from "@/data/mockIntelligence";
import {
  mockConversationResponses,
  defaultConversationResponse,
} from "@/data/mockConversations";
import type {
  User,
  FashionIdentity,
  AgentInsight,
  AgentPreferences,
  Item,
  Discovery,
  Brand,
  BrandRecommendation,
  WardrobeItem,
  WardrobeGap,
  WardrobeSummary,
  AvailabilityAlert,
  StyleEvolution,
  ConversationResponse,
  AcquisitionData,
  CreateAccountData,
} from "@/types";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// AUTHENTICATION
// ============================================

export async function signIn(
  email: string,
  password: string
): Promise<{ success: boolean; user: User; token: string }> {
  // TODO: POST /api/auth/signin
  await delay(800);
  if (email && password) {
    return { success: true, user: mockUser, token: "mock_jwt_token" };
  }
  throw new Error("Invalid credentials");
}

export async function createAccount(
  data: CreateAccountData
): Promise<{ success: boolean; user: User }> {
  // TODO: POST /api/auth/create
  await delay(1000);
  return { success: true, user: { ...mockUser, ...data } };
}

export async function signOut(): Promise<{ success: boolean }> {
  // TODO: POST /api/auth/signout
  await delay(300);
  return { success: true };
}

// ============================================
// FASHION IDENTITY
// ============================================

export async function saveIdentityStep(
  step: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; step: string; data: Record<string, unknown> }> {
  // TODO: POST /api/identity/:step
  await delay(600);
  return { success: true, step, data };
}

export async function getFashionIdentity(): Promise<FashionIdentity> {
  // TODO: GET /api/identity
  await delay(500);
  return mockUser.fashionIdentity;
}

export async function updateFashionIdentity(
  data: Partial<FashionIdentity>
): Promise<FashionIdentity> {
  // TODO: PUT /api/identity
  await delay(600);
  return { ...mockUser.fashionIdentity, ...data };
}

// ============================================
// FASHION AGENT (AI Intelligence)
// ============================================

export async function getAgentInsight(): Promise<AgentInsight> {
  // TODO: GET /api/agent/insight
  await delay(700);
  return mockAgentInsight;
}

export async function getStyleEvolution(): Promise<StyleEvolution> {
  // TODO: GET /api/agent/evolution
  await delay(600);
  return mockStyleEvolution;
}

// ============================================
// CONVERSATIONAL DISCOVERY
// ============================================

export async function sendConversation(
  message: string
): Promise<ConversationResponse> {
  // TODO: POST /api/discover/conversation
  await delay(1500); // Simulate AI processing

  const normalizedMessage = message.toLowerCase();

  // If the UI prepends a constraints header, we can use it to bias routing.
  // Example: "[Constraints: occasion=Work & Professional, budget=800-2500, delivery=flexible] ..."
  const constraintsMatch = normalizedMessage.match(/\[constraints:\s*([^\]]+)\]/);
  const constraintsRaw = constraintsMatch?.[1] || "";
  const occasionMatch = constraintsRaw.match(/occasion\s*=\s*([^,]+)\s*(,|$)/);
  const occasion = occasionMatch?.[1]?.trim() || null;

  const occasionKey =
    occasion?.includes("work") ? "work"
      : occasion?.includes("evening") ? "evening"
        : occasion?.includes("travel") ? "travel"
          : occasion?.includes("special") ? "special occasions"
            : null;

  // Find matching response
  if (occasionKey && mockConversationResponses[occasionKey]) {
    const response = mockConversationResponses[occasionKey];
    const enrichedDirections = response.directions.map((dir) => ({
      ...dir,
      items: dir.suggestedItems
        .map((id) => mockItems.find((item) => item.id === id))
        .filter(Boolean),
    }));

    return {
      ...response,
      directions: enrichedDirections,
    };
  }

  for (const [key, response] of Object.entries(mockConversationResponses)) {
    if (normalizedMessage.includes(key)) {
      // Enrich directions with full item data
      const enrichedDirections = response.directions.map((dir) => ({
        ...dir,
        items: dir.suggestedItems
          .map((id) => mockItems.find((item) => item.id === id))
          .filter(Boolean),
      }));

      return {
        ...response,
        directions: enrichedDirections,
      };
    }
  }

  return defaultConversationResponse;
}

// ============================================
// ITEMS (Fashion Intelligence View)
// ============================================

export async function getItem(id: string): Promise<Item | null> {
  // TODO: GET /api/items/:id
  await delay(500);
  return mockItems.find((item) => item.id === id) || null;
}

export async function getItems(): Promise<Item[]> {
  // TODO: GET /api/items
  await delay(500);
  return mockItems;
}

export async function getItemAvailability(
  id: string
): Promise<Item["availabilityIntelligence"] | null> {
  // TODO: GET /api/items/:id/availability
  await delay(400);
  const item = mockItems.find((i) => i.id === id);
  return item?.availabilityIntelligence || null;
}

export async function getItemFitIntelligence(
  id: string
): Promise<Item["fitIntelligence"] | null> {
  // TODO: GET /api/items/:id/fit
  await delay(400);
  const item = mockItems.find((i) => i.id === id);
  return item?.fitIntelligence || null;
}

export async function getStyleAlignedDiscoveries(): Promise<
  (Discovery & { item?: Item })[]
> {
  // TODO: GET /api/discover/aligned
  await delay(600);
  return mockDiscoveries.map((disc) => ({
    ...disc,
    item: mockItems.find((item) => item.id === disc.itemId),
  }));
}

// ============================================
// BRAND UNIVERSES
// ============================================

export async function getBrands(): Promise<Brand[]> {
  // TODO: GET /api/universes
  await delay(500);
  return mockBrands;
}

export async function getBrand(id: string): Promise<Brand | null> {
  // TODO: GET /api/universes/:id
  await delay(500);
  return mockBrands.find((b) => b.id === id) || null;
}

export async function getBrandRecommendations(): Promise<
  (BrandRecommendation & { brand?: Brand })[]
> {
  // TODO: GET /api/universes/recommendations
  await delay(500);
  return mockBrandRecommendations.map((rec) => ({
    ...rec,
    brand: mockBrands.find((b) => b.id === rec.brandId),
  }));
}

// ============================================
// WARDROBE INTELLIGENCE
// ============================================

export async function getWardrobe(): Promise<WardrobeItem[]> {
  // TODO: GET /api/wardrobe
  await delay(500);
  return mockWardrobe;
}

export async function getWardrobeSummary(): Promise<WardrobeSummary> {
  // TODO: GET /api/wardrobe/summary
  await delay(400);
  return mockWardrobeSummary;
}

export async function getWardrobeGaps(): Promise<
  (WardrobeGap & { suggestions?: Item[] })[]
> {
  // TODO: GET /api/wardrobe/gaps
  await delay(600);
  return mockWardrobeGaps.map((gap) => ({
    ...gap,
    suggestions: gap.suggestedItems
      .map((id) => mockItems.find((item) => item.id === id))
      .filter(Boolean) as Item[],
  }));
}

export async function addToWardrobe(
  item: WardrobeItem
): Promise<{ success: boolean; item: WardrobeItem }> {
  // TODO: POST /api/wardrobe
  await delay(400);
  return { success: true, item };
}

// ============================================
// AVAILABILITY INTELLIGENCE
// ============================================

export async function getAvailabilityAlerts(): Promise<AvailabilityAlert[]> {
  // TODO: GET /api/availability/alerts
  await delay(500);
  return mockAvailabilityAlerts;
}

export async function subscribeToAvailability(
  itemId: string
): Promise<{ success: boolean; itemId: string }> {
  // TODO: POST /api/availability/subscribe
  await delay(300);
  return { success: true, itemId };
}

// ============================================
// SELECTIONS (Silent Commerce)
// ============================================

export async function getConsiderations(): Promise<Item[]> {
  // TODO: GET /api/selections/considerations
  await delay(400);
  // Return items user has saved for consideration
  return [];
}

export async function addToConsiderations(
  itemId: string
): Promise<{ success: boolean; itemId: string }> {
  // TODO: POST /api/selections/considerations
  await delay(300);
  return { success: true, itemId };
}

export async function removeFromConsiderations(
  itemId: string
): Promise<{ success: boolean }> {
  // TODO: DELETE /api/selections/considerations/:id
  await delay(300);
  return { success: true };
}

export async function getSilentSuggestions(): Promise<
  { item?: Item; reason: string }[]
> {
  // TODO: GET /api/selections/silent
  // AI-prepared suggestions based on wardrobe gaps and availability
  await delay(700);
  return mockWardrobeGaps
    .slice(0, 2)
    .map((gap) => ({
      item: mockItems.find((item) => gap.suggestedItems.includes(item.id)),
      reason: gap.reasoning,
    }))
    .filter((s) => s.item);
}

// ============================================
// ACQUISITION (Replaces Checkout)
// ============================================

export async function checkAvailability(
  itemId: string,
  size: string,
  color: string
): Promise<{
  available: boolean;
  options: { location: string; probability: number; deliveryDays: string }[];
}> {
  // TODO: POST /api/acquire/check
  await delay(1200);
  const item = mockItems.find((i) => i.id === itemId);
  if (!item) throw new Error("Item not found");

  return {
    available: true,
    options: item.availabilityIntelligence.sources.filter((s) => s.probability > 70),
  };
}

export async function beginAcquisition(data: AcquisitionData): Promise<{
  success: boolean;
  acquisitionId: string;
  estimatedDelivery: string;
  source: string;
}> {
  // TODO: POST /api/acquire/begin
  await delay(1500);
  return {
    success: true,
    acquisitionId: `ACQ_${Date.now()}`,
    estimatedDelivery: "5-7 business days",
    source: data.source,
  };
}

// ============================================
// AGENT PREFERENCES
// ============================================

export async function getAgentPreferences(): Promise<AgentPreferences> {
  // TODO: GET /api/agent/preferences
  await delay(400);
  return mockUser.agentPreferences;
}

export async function updateAgentPreferences(
  data: Partial<AgentPreferences>
): Promise<AgentPreferences> {
  // TODO: PUT /api/agent/preferences
  await delay(500);
  return { ...mockUser.agentPreferences, ...data };
}

export async function resetAgentMemory(): Promise<{
  success: boolean;
  message: string;
}> {
  // TODO: POST /api/agent/reset
  await delay(800);
  return { success: true, message: "Agent memory has been reset" };
}

// ============================================
// USER
// ============================================

export async function getCurrentUser(): Promise<User | null> {
  // TODO: GET /api/user/me
  await delay(300);
  return mockUser;
}

export async function updateUser(data: Partial<User>): Promise<User> {
  // TODO: PUT /api/user/me
  await delay(500);
  return { ...mockUser, ...data };
}
