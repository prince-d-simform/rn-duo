import type { Destination, Trip } from '../../types';

/**
 * A trip joined with its destination and a display-ready date label.
 */
export interface TripListEntry {
  /** The trip. */
  trip: Trip;
  /** The destination the trip is to. */
  destination: Destination;
  /** Date range, e.g. "12–17 Jun 2027", or "Someday" when undated. */
  dateLabel: string;
}

/**
 * Values and handlers returned by the useTrips hook.
 */
export interface TripsHookReturnType {
  /** Summary line, e.g. "2 planned trips". */
  summary: string;
  /** Planned trips with their destinations. */
  entries: TripListEntry[];
  /** Opens the trip's destination. */
  onTripPress: (entry: TripListEntry) => void;
}
