import type { TripListEntry } from '../../TripsTypes';
import type { StyleProp, ViewStyle } from 'react-native';

export interface TripListItemProps {
  /** The trip to display. */
  entry: TripListEntry;
  /** Whether this is the first row (rounds the top corners). */
  isFirst: boolean;
  /** Whether this is the last row (rounds the bottom corners). */
  isLast: boolean;
  /** Called with the entry when the row is pressed. */
  onPress: (entry: TripListEntry) => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const TripListItemDefaultProps: Partial<TripListItemProps> = {
  testID: 'trip-list-item'
} as const;
