import type { StyleProp, ViewStyle } from 'react-native';

export interface DetailsMetaRowProps {
  /** Average rating out of 5. */
  rating: number;
  /** Number of reviews behind the rating. */
  reviewCount: number;
  /** Best months to visit, e.g. "May–Oct". */
  bestSeason: string;
  /** Relative price level, e.g. "€€€". */
  priceLevel: string;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const DetailsMetaRowDefaultProps: Partial<DetailsMetaRowProps> = {
  testID: 'details-meta-row'
} as const;
