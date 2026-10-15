import type { StyleProp, ViewStyle } from 'react-native';

export interface AvatarProps {
  /** Initials shown inside the avatar. A person icon is shown when empty. */
  initials?: string;
  /** Diameter of the avatar. */
  size?: number;
  /** Called when the avatar is pressed. */
  onPress?: () => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
  /** Screen reader label. */
  accessibilityLabel?: string;
}

export const AvatarDefaultProps: Partial<AvatarProps> = {
  initials: '',
  testID: 'avatar'
} as const;
