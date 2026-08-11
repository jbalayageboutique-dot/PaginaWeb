export type BalayageCategory = 
  | 'todos' 
  | 'balayage-rubio' 
  | 'morena-iluminada' 
  | 'cobrizo-warm' 
  | 'correccion-color' 
  | 'babylights-melt';

export interface BeforeAfterCase {
  id: string;
  title: string;
  category: BalayageCategory;
  categoryLabel: string;
  beforeImage?: string;
  afterImage: string;
  startingBase: string;
  techniqueUsed: string;
  finalTone: string;
  durationHours: string;
  maintenanceFrequency: string;
  hairTexture: string;
  description: string;
  clientName?: string;
  rating?: number;
  clientReview?: string;
  galleryImages?: {
    src: string;
    alt: string;
  }[];
  videos?: {
    src: string;
    poster?: string;
    title: string;
  }[];
  seoKeywords: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortSubtitle: string;
  description: string;
  includes: string[];
  duration: string;
  priceRange: string;
  recommendedFor: string;
  popularBadge?: boolean;
  seoTag: string;
  imageUrl?: string;
}

export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  relativeTime: string;
  text: string;
  serviceMentioned: string;
}

export interface GoogleBusinessInfo {
  name: string;
  headline: string;
  address: string;
  city: string;
  rating: number;
  totalReviews: number;
  googleProfileUrl: string;
  phone: string;
  whatsappNumber: string;
  whatsappFormatted: string;
  openingHours: {
    days: string;
    hours: string;
  }[];
  mapEmbedUrl: string;
}

export interface SeoSettings {
  pageTitle: string;
  metaDescription: string;
  targetKeywords: string[];
  canonicalUrl: string;
  businessName: string;
  geoRegion: string;
  placeAddress: string;
}

export interface HairQuizAnswer {
  currentColor: string;
  hairCondition: string;
  desiredGoal: string;
  length: string;
}
