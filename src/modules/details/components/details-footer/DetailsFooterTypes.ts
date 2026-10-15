import type { StyleProp, ViewStyle } from 'react-native';

export interface DetailsFooterProps {
  /** Formatted starting price, e.g. "$890". */
  price: string;
  /** Duration label, e.g. "5 nights". */
  durationLabel: string;
  /** Whether the destination is saved. */
  isFavorite: boolean;
  /** Called when the save button is pressed. */
  onToggleFavorite: () => void;
  /** Called when the Plan trip button is pressed. */
  onPlanTrip: () => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const DetailsFooterDefaultProps: Partial<DetailsFooterProps> = {
  testID: 'details-footer'
} as const;
