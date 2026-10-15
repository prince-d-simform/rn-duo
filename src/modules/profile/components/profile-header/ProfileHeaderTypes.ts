import type { StyleProp, ViewStyle } from 'react-native';

export interface ProfileHeaderProps {
  /** The user's display name. */
  name: string;
  /** Initials for the avatar. */
  initials: string;
  /** Supporting line below the name, e.g. "Exploring since 2021". */
  subtitle: string;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const ProfileHeaderDefaultProps: Partial<ProfileHeaderProps> = {
  testID: 'profile-header'
} as const;
