import type { Destination } from '../../types';
import type { StyleProp, ViewStyle } from 'react-native';

export interface DestinationCardProps {
  /** The destination to display. */
  destination: Destination;
  /** Whether the destination is saved. */
  isFavorite: boolean;
  /** Called with the destination when the card is pressed. */
  onPress: (destination: Destination) => void;
  /** Called with the destination when the heart is pressed. */
  onToggleFavorite: (destination: Destination) => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const DestinationCardDefaultProps: Partial<DestinationCardProps> = {
  testID: 'destination-card'
} as const;
