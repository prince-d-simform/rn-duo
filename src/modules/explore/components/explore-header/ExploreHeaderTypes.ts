import type { StyleProp, ViewStyle } from 'react-native';

export interface ExploreHeaderProps {
  /** Formatted date shown above the title, e.g. "Thursday 15 Oct". */
  dateLabel: string;
  /** Headline text. */
  title: string;
  /** User initials for the avatar. */
  initials?: string;
  /** Called when the avatar is pressed. */
  onAvatarPress?: () => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const ExploreHeaderDefaultProps: Partial<ExploreHeaderProps> = {
  testID: 'explore-header'
} as const;
