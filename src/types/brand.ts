export interface Brand {
  id: string;
  name: string;
  tagline: string;
  founded: number;
  origin: string;
  logo: string;
  heroImage: string;
  officialSiteUrl: string;
  philosophy: string;
  alignmentReason: string;
  universe: BrandUniverse;
}

export interface BrandUniverse {
  heritage: HeritageSection;
  craftsmanship: CraftsmanshipItem[];
  culturalConnections: string[];
}

export interface HeritageSection {
  introduction: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image: string;
}

export interface CraftsmanshipItem {
  title: string;
  description: string;
  image: string;
}

export interface BrandRecommendation {
  brandId: string;
  reason: string;
  image: string;
  brand?: Brand;
}
