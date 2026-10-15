import type { Experience } from '../../../../types';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ExperienceCardProps {
  /** The experience to display. */
  experience: Experience;
  /** Card frame styles (the screen sets the width). */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const ExperienceCardDefaultProps: Partial<ExperienceCardProps> = {
  testID: 'experience-card'
} as const;
