import type { Destination, DestinationDetails } from '../../types';

/**
 * Values and handlers returned by the useDetails hook.
 */
export interface DetailsHookReturnType {
  /** The destination being shown, undefined when the id is unknown. */
  destination?: Destination;
  /** Extra details for the destination, undefined when unavailable. */
  details?: DestinationDetails;
  /** Location line, e.g. "Greece · Cyclades". */
  location: string;
  /** Formatted starting price, e.g. "$890". */
  price: string;
  /** Duration label, e.g. "5 nights". */
  durationLabel: string;
  /** Whether the destination is saved. */
  isFavorite: boolean;
  /** Toggles the saved state. */
  onToggleFavorite: () => void;
  /** Goes back to the previous screen. */
  onBack: () => void;
  /** Opens the system share sheet for the destination. */
  onShare: () => void;
  /** Starts planning a trip to the destination. */
  onPlanTrip: () => void;
}
