import type { ProfileStat } from '../../ProfileTypes';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ProfileStatsProps {
  /** Stats to show, in equal-width columns. */
  stats: ProfileStat[];
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const ProfileStatsDefaultProps: Partial<ProfileStatsProps> = {
  testID: 'profile-stats'
} as const;
