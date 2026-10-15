import { useCallback, useMemo, useState } from 'react';
import { allDestinations, dummySavedCollections, ROUTES, Strings } from '../../constants';
import { SavedActions, SavedSelectors, useAppDispatch, useAppSelector } from '../../redux';
import { I18n } from '../../translations';
import { navigateWithParam } from '../../utils';
import { ALL_PLACES_FILTER, type SavedHookReturnType } from './SavedTypes';
import type { ChipOption } from '../../components';
import type { Destination, SavedCollection } from '../../types';

/**
 * Hook containing the Saved screen's data, filtering, and handlers.
 * @returns {SavedHookReturnType} Values and handlers for the Saved screen.
 */
export default function useSaved(): SavedHookReturnType {
  const dispatch = useAppDispatch();
  const savedIds = useAppSelector(SavedSelectors.getSavedIds);
  const [selectedFilter, setSelectedFilter] = useState<string>(ALL_PLACES_FILTER);

  const savedDestinations = useMemo<Destination[]>(
    () =>
      savedIds
        .map((id: string) => allDestinations.find((destination) => destination.id === id))
        .filter((destination): destination is Destination => Boolean(destination)),
    [savedIds]
  );

  const filterOptions = useMemo<ChipOption[]>(
    () => [
      { id: ALL_PLACES_FILTER, label: Strings.Saved.allPlaces },
      ...dummySavedCollections.map((collection: SavedCollection) => ({
        id: collection.id,
        label: collection.name
      }))
    ],
    []
  );

  const destinations = useMemo<Destination[]>(() => {
    const collection = dummySavedCollections.find(({ id }) => id === selectedFilter);
    return collection
      ? savedDestinations.filter(({ id }) => collection.destinationIds.includes(id))
      : savedDestinations;
  }, [savedDestinations, selectedFilter]);

  const summary = I18n.t('saved:summary', {
    places: I18n.t('saved:placeCount', { count: savedDestinations.length }),
    collections: I18n.t('saved:collectionCount', { count: dummySavedCollections.length })
  });

  const onToggleSaved = useCallback(
    (destination: Destination) => {
      dispatch(SavedActions.toggleSaved(destination.id));
    },
    [dispatch]
  );

  const onDestinationPress = useCallback((destination: Destination) => {
    navigateWithParam(ROUTES.Details, { destinationId: destination.id });
  }, []);

  return {
    summary,
    filterOptions,
    selectedFilter,
    onSelectFilter: setSelectedFilter,
    destinations,
    onToggleSaved,
    onDestinationPress
  };
}
