import type { Ionicons } from '@expo/vector-icons';
import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/** Any Ionicons glyph name. */
export type EmptyStateIcon = React.ComponentProps<typeof Ionicons>['name'];

export interface EmptyStateProps {
  /** Icon shown above the title. */
  icon: EmptyStateIcon;
  /** Short headline. */
  title: string;
  /** Supporting message below the title. */
  message?: string;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const EmptyStateDefaultProps: Partial<EmptyStateProps> = {
  testID: 'empty-state'
} as const;
