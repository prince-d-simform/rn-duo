import { useCallback, useMemo } from 'react';
import { allDestinations, dummyTrips, ROUTES, Strings } from '../../constants';
import { I18n } from '../../translations';
import { formatDateRange, navigateWithParam } from '../../utils';
import type { TripListEntry, TripsHookReturnType } from './TripsTypes';
import type { Trip } from '../../types';

/**
 * Hook containing the Trips screen's data and handlers.
 * @returns {TripsHookReturnType} Values and handlers for the Trips screen.
 */
export default function useTrips(): TripsHookReturnType {
  const entries = useMemo<TripListEntry[]>(
    () =>
      dummyTrips.reduce<TripListEntry[]>((list, trip: Trip) => {
        const destination = allDestinations.find(({ id }) => id === trip.destinationId);
        if (!destination) return list;
        const dateLabel =
          trip.startDate && trip.endDate
            ? formatDateRange(trip.startDate, trip.endDate)
            : Strings.Trips.someday;
        return [...list, { trip, destination, dateLabel }];
      }, []),
    []
  );

  const onTripPress = useCallback((entry: TripListEntry) => {
    navigateWithParam(ROUTES.Details, { destinationId: entry.destination.id });
  }, []);

  return {
    summary: I18n.t('trips:plannedCount', { count: entries.length }),
    entries,
    onTripPress
  };
}
