import type { StyleProp, ViewStyle } from 'react-native';

export interface TagProps {
  /** Text shown inside the tag. */
  label: string;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const TagDefaultProps: Partial<TagProps> = {
  testID: 'tag'
} as const;
