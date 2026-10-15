import type { StyleProp, ViewStyle } from 'react-native';

export interface SettingsRowProps {
  /** Setting name. */
  label: string;
  /** Current value shown before the chevron. */
  value?: string;
  /** Called when the row is pressed. The row is inert when omitted. */
  onPress?: () => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const SettingsRowDefaultProps: Partial<SettingsRowProps> = {
  testID: 'settings-row'
} as const;
