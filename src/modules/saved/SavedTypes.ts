import type { ChipOption } from '../../components';
import type { Destination } from '../../types';

/** Filter id that shows every saved place. */
export const ALL_PLACES_FILTER = 'all';

/**
 * Values and handlers returned by the useSaved hook.
 */
export interface SavedHookReturnType {
  /** Summary line, e.g. "5 places · 2 collections". */
  summary: string;
  /** Filter chips: all places followed by each collection. */
  filterOptions: ChipOption[];
  /** The selected filter id. */
  selectedFilter: string;
  /** Selects a filter. */
  onSelectFilter: (filterId: string) => void;
  /** Saved destinations matching the selected filter. */
  destinations: Destination[];
  /** Removes a destination from saved. */
  onToggleSaved: (destination: Destination) => void;
  /** Opens a destination. */
  onDestinationPress: (destination: Destination) => void;
}
