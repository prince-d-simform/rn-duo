import type { StyleProp, ViewStyle } from 'react-native';

/**
 * A selectable option rendered as a chip.
 */
export interface ChipOption<T extends string = string> {
  /** Value identifying the option. */
  id: T;
  /** Localized label for the option. */
  label: string;
}

export interface ChipGroupProps<T extends string = string> {
  /** Options to render. */
  options: ChipOption<T>[];
  /** The currently selected option id. */
  selectedId: T;
  /** Called with the id of the option that was pressed. */
  onSelect: (id: T) => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. Each chip gets `${testID}-${id}`. */
  testID?: string;
}

export const ChipGroupDefaultProps: Partial<ChipGroupProps> = {
  testID: 'chip-group'
} as const;
