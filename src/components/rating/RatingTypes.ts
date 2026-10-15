import type { StyleProp, ViewStyle } from 'react-native';

/** `badge` sits on top of images, `inline` sits on regular surfaces. */
export type RatingVariant = 'badge' | 'inline';

export interface RatingProps {
  /** Rating value out of 5. */
  value: number;
  /** Visual variant of the rating. */
  variant?: RatingVariant;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
  /** Screen reader label. Defaults to "Rated X out of 5". */
  accessibilityLabel?: string;
}

export const RatingDefaultProps: Partial<RatingProps> = {
  variant: 'inline',
  testID: 'rating'
} as const;
