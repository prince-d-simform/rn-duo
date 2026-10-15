import type { ChipOption } from '../../../../components';
import type { StyleProp, ViewStyle } from 'react-native';

export interface SavedListHeaderProps {
  /** Summary line below the title, e.g. "5 places · 2 collections". */
  summary: string;
  /** Filter chips to render. */
  filterOptions: ChipOption[];
  /** The selected filter id. */
  selectedFilter: string;
  /** Called with the filter id that was pressed. */
  onSelectFilter: (filterId: string) => void;
  /** Additional container styles. */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

export const SavedListHeaderDefaultProps: Partial<SavedListHeaderProps> = {
  testID: 'saved-list-header'
} as const;
