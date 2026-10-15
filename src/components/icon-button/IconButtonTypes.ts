import type { Ionicons } from '@expo/vector-icons';
import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/** Any Ionicons glyph name. */
export type IconButtonIcon = React.ComponentProps<typeof Ionicons>['name'];

/** `overlay` is a translucent circle for use on images, `outlined` a bordered square for surfaces. */
export type IconButtonVariant = 'overlay' | 'outlined';

export interface IconButtonProps {
  /** Icon to render. */
  icon: IconButtonIcon;
  /** Called when the button is pressed. */
  onPress: () => void;
  /** Visual variant of the button. */
  variant?: IconButtonVariant;
  /** Width and height of the button. */
  size?: number;
  /** Size of the icon. */
  iconSize?: number;
  /** Icon color. Defaults to the variant's color. */
  iconColor?: string;
  /** Selected state, announced to screen readers (e.g. for toggles). */
  selected?: boolean;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
  /** Screen reader label describing the action. */
  accessibilityLabel: string;
}

export const IconButtonDefaultProps: Partial<IconButtonProps> = {
  variant: 'overlay',
  testID: 'icon-button'
} as const;
