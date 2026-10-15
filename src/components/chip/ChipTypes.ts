import type { StyleProp, ViewStyle } from 'react-native';

export interface ChipProps {
  /** Text shown inside the chip. */
  label: string;
  /** Whether the chip is currently selected. */
  selected?: boolean;
  /** Called when the chip is pressed. */
  onPress?: () => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
  /** Screen reader label. Defaults to the label. */
  accessibilityLabel?: string;
}

export const ChipDefaultProps: Partial<ChipProps> = {
  selected: false,
  testID: 'chip'
} as const;
