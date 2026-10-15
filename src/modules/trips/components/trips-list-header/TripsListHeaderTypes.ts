import type { StyleProp, ViewStyle } from 'react-native';

export interface TripsListHeaderProps {
  /** Summary line below the title, e.g. "2 planned trips". */
  summary: string;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const TripsListHeaderDefaultProps: Partial<TripsListHeaderProps> = {
  testID: 'trips-list-header'
} as const;
