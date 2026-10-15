import type { Destination } from '../../../../types';
import type { StyleProp, ViewStyle } from 'react-native';

export interface DestinationListItemProps {
  /** The destination to display. */
  destination: Destination;
  /** Called with the destination when the row is pressed. */
  onPress: (destination: Destination) => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const DestinationListItemDefaultProps: Partial<DestinationListItemProps> = {
  testID: 'destination-list-item'
} as const;
