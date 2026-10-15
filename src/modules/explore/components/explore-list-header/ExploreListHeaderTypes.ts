import type { Destination, DestinationCategory } from '../../../../types';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ExploreListHeaderProps {
  /** Today's date formatted for the header. */
  dateLabel: string;
  /** Initials of the signed-in user. */
  initials: string;
  /** Called when the avatar is pressed. */
  onAvatarPress: () => void;
  /** Current search text. */
  searchQuery: string;
  /** Called whenever the search text changes. */
  onChangeSearch: (text: string) => void;
  /** Called when the search is cleared. */
  onClearSearch: () => void;
  /** The selected category filter. */
  selectedCategory: DestinationCategory;
  /** Called with the category that was pressed. */
  onSelectCategory: (category: DestinationCategory) => void;
  /** Popular destinations shown in the carousel. Hidden when empty. */
  popularDestinations: Destination[];
  /** Whether to show the "Weekend escapes" section title. */
  showWeekendTitle: boolean;
  /** Whether a destination is saved. */
  isFavorite: (destinationId: string) => boolean;
  /** Toggles the saved state of a destination. */
  onToggleFavorite: (destination: Destination) => void;
  /** Called when a destination is pressed. */
  onDestinationPress: (destination: Destination) => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const ExploreListHeaderDefaultProps: Partial<ExploreListHeaderProps> = {
  testID: 'explore-list-header'
} as const;
