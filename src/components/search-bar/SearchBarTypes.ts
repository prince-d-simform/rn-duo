import type { StyleProp, ViewStyle } from 'react-native';

export interface SearchBarProps {
  /** Current search text. */
  value: string;
  /** Called whenever the search text changes. */
  onChangeText: (text: string) => void;
  /** Placeholder shown when the input is empty. */
  placeholder?: string;
  /** Called when the clear button is pressed. Shows the button when provided and text is present. */
  onClear?: () => void;
  /** Accessibility label for the clear button. */
  clearAccessibilityLabel?: string;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
  /** Screen reader label. Defaults to the placeholder. */
  accessibilityLabel?: string;
}

export const SearchBarDefaultProps: Partial<SearchBarProps> = {
  placeholder: '',
  testID: 'search-bar'
} as const;
