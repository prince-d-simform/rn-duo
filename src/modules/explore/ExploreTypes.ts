import type { Destination, DestinationCategory } from '../../types';

/**
 * Values and handlers returned by the useExplore hook.
 */
export interface ExploreHookReturnType {
  /** Today's date formatted for the header. */
  dateLabel: string;
  /** Initials of the signed-in user, empty when unknown. */
  initials: string;
  /** Current search text. */
  searchQuery: string;
  /** Updates the search text. */
  onChangeSearch: (text: string) => void;
  /** Clears the search text. */
  onClearSearch: () => void;
  /** The selected category filter. */
  selectedCategory: DestinationCategory;
  /** Selects a category filter. */
  onSelectCategory: (category: DestinationCategory) => void;
  /** Popular destinations matching the current filters. */
  popularDestinations: Destination[];
  /** Weekend destinations matching the current filters. */
  weekendDestinations: Destination[];
  /** Whether any destination matches the current filters. */
  hasResults: boolean;
  /** Whether a destination is saved. */
  isFavorite: (destinationId: string) => boolean;
  /** Toggles the saved state of a destination. */
  onToggleFavorite: (destination: Destination) => void;
  /** Opens a destination. */
  onDestinationPress: (destination: Destination) => void;
  /** Opens the profile tab. */
  onAvatarPress: () => void;
}
