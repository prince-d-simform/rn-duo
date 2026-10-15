import type { StyleProp, ViewStyle } from 'react-native';

export interface PageHeaderProps {
  /** Large page title. */
  title: string;
  /** Supporting line below the title. */
  subtitle?: string;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const PageHeaderDefaultProps: Partial<PageHeaderProps> = {
  testID: 'page-header'
} as const;
