import type { StyleProp, ViewStyle } from 'react-native';

export interface DetailsHeroProps {
  /** Remote image URL for the hero. */
  imageUrl: string;
  /** Destination name shown as the headline. */
  name: string;
  /** Location line shown above the name, e.g. "Greece · Cyclades". */
  location: string;
  /** Called when the back button is pressed. */
  onBack: () => void;
  /** Called when the share button is pressed. */
  onShare: () => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const DetailsHeroDefaultProps: Partial<DetailsHeroProps> = {
  testID: 'details-hero'
} as const;
