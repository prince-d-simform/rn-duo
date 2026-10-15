/**
 * The categories a destination can belong to.
 * `All` is a filter-only value that matches every destination.
 */
export enum DestinationCategory {
  All = 'all',
  Beaches = 'beaches',
  Mountains = 'mountains',
  Cities = 'cities',
  Islands = 'islands'
}

/**
 * A travel destination shown on the Explore screen.
 */
export interface Destination {
  /** Unique identifier of the destination. */
  id: string;
  /** Display name, e.g. "Santorini". */
  name: string;
  /** Country the destination is located in. */
  country: string;
  /** Average rating out of 5. */
  rating: number;
  /** Starting price in USD. */
  priceFrom: number;
  /** Remote image URL. */
  imageUrl: string;
  /** Categories used by the Explore filters. */
  categories: DestinationCategory[];
}

/**
 * A selectable category filter option.
 */
export interface CategoryOption {
  /** The category this option filters by. */
  id: DestinationCategory;
  /** Localized label for the option. */
  label: string;
}

/**
 * A bookable activity shown on the destination details screen.
 */
export interface Experience {
  /** Unique identifier of the experience. */
  id: string;
  /** Display name, e.g. "Caldera sailing". */
  title: string;
  /** Short supporting line, e.g. "Half day · $95". */
  meta: string;
  /** Remote image URL. */
  imageUrl: string;
}

/**
 * Extra information shown on the destination details screen.
 */
export interface DestinationDetails {
  /** Region within the country, e.g. "Cyclades". */
  region: string;
  /** Number of reviews behind the rating. */
  reviewCount: number;
  /** Best months to visit, e.g. "May–Oct". */
  bestSeason: string;
  /** Relative price level, e.g. "€€€". */
  priceLevel: string;
  /** Number of nights the starting price covers. */
  nights: number;
  /** Highlight tags. */
  tags: string[];
  /** Short description of the destination. */
  description: string;
  /** Top experiences at the destination. */
  experiences: Experience[];
}

/**
 * A user-named group of saved destinations, e.g. "Summer 2027".
 */
export interface SavedCollection {
  /** Unique identifier of the collection. */
  id: string;
  /** Display name of the collection. */
  name: string;
  /** Ids of the destinations in the collection. */
  destinationIds: string[];
}

/**
 * A planned trip to a destination.
 */
export interface Trip {
  /** Unique identifier of the trip. */
  id: string;
  /** Id of the destination the trip is to. */
  destinationId: string;
  /** Start date as an ISO date (YYYY-MM-DD). Undefined for undated trips. */
  startDate?: string;
  /** End date as an ISO date (YYYY-MM-DD). Undefined for undated trips. */
  endDate?: string;
}
