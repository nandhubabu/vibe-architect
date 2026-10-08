/**
 * Qloo Entity & Cultural Taste Graph Type Definitions
 */

export type QlooCategory =
  | 'music'
  | 'film'
  | 'dining'
  | 'fashion'
  | 'literature'
  | 'destinations'
  | 'atmosphere';

export interface QlooEntity {
  id: string;
  name: string;
  category: QlooCategory;
  subcategory?: string;
  type?: string;
  affinityScore?: number; // 0.0 - 1.0
  popularity?: number;
  tags?: string[];
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface QlooSearchResult {
  entities: QlooEntity[];
  query: string;
  count: number;
}

export interface QlooInsightsRequest {
  entityIds: string[];
  targetCategories?: QlooCategory[];
  location?: {
    city?: string;
    latitude?: number;
    longitude?: number;
    radiusMiles?: number;
  };
  demographics?: {
    ageRange?: string;
    gender?: string;
  };
  sampleSize?: number;
}

export interface QlooInsightsResponse {
  sourceEntities: QlooEntity[];
  recommendations: Record<QlooCategory, QlooEntity[]>;
  tasteAffinitySummary: {
    coherenceScore: number; // 0.0 - 100.0
    dominantVibe: string;
    culturalArchetype: string;
  };
}

export interface SensoryDetails {
  lightingKelvin: string;
  lightingDescription: string;
  aromaProfile: string;
  textureMaterials: string[];
  soundtrackPacing: string;
  conversationAnchors: string[];
}

export interface CulturalBlueprint {
  id: string;
  title: string;
  editorialSubtitle: string;
  narrativeOverview: string;
  curatorNotes: string;
  prompt: string;
  createdAt: string;
  categories: {
    soundtrack: {
      theme: string;
      entities: QlooEntity[];
      tempo: string;
    };
    gastronomy: {
      concept: string;
      entities: QlooEntity[];
      wineOrCocktailPairing: string;
    };
    cinema: {
      aestheticTone: string;
      entities: QlooEntity[];
      visualMotif: string;
    };
    sartorial: {
      dressCode: string;
      entities: QlooEntity[];
      materialsAndPalette: string[];
    };
    spaces: {
      architecturalAtmosphere: string;
      entities: QlooEntity[];
      ambientLighting: string;
    };
  };
  sensory: SensoryDetails;
  culturalDNA: {
    anchorEntities: string[];
    qlooAffinityScore: number;
    tasteSignature: string;
  };
}
