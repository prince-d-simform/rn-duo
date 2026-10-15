import type { StyleProp, ViewStyle } from 'react-native';

export interface FavoriteButtonProps {
  /** Whether the item is currently saved. */
  isFavorite: boolean;
  /** Called when the button is pressed. */
  onPress: () => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
  /** Screen reader label describing the action. */
  accessibilityLabel: string;
}

export const FavoriteButtonDefaultProps: Partial<FavoriteButtonProps> = {
  testID: 'favorite-button'
} as const;
