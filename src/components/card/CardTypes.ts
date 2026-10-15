import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface CardProps {
  /** Card content. */
  children: React.ReactNode;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const CardDefaultProps: Partial<CardProps> = {
  testID: 'card'
} as const;
