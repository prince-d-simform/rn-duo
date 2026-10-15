/**
 * The traveler profile shown on the Profile screen.
 */
export interface UserProfile {
  /** Full display name. */
  name: string;
  /** Year the user joined. */
  memberSince: number;
  /** Number of countries visited. */
  countriesVisited: number;
  /** Number of trips taken. */
  tripsTaken: number;
}

/**
 * App preferences shown on the Profile screen.
 */
export interface UserPreferences {
  /** Whether push notifications are enabled. */
  notificationsEnabled: boolean;
  /** Preferred currency code, e.g. "USD". */
  currency: string;
  /** Preferred distance unit. */
  distanceUnit: 'km' | 'mi';
}
