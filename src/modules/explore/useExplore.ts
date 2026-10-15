import { useCallback, useMemo, useState } from 'react';
import {
  dummyPopularDestinations,
  dummyProfile,
  dummyWeekendDestinations,
  ROUTES
} from '../../constants';
import {
  AuthSelectors,
  SavedActions,
  SavedSelectors,
  useAppDispatch,
  useAppSelector
} from '../../redux';
import { DestinationCategory, type Destination } from '../../types';
import { formatHeaderDate, getInitials, navigateWithParam } from '../../utils';
import type { ExploreHookReturnType } from './ExploreTypes';

/**
 * Returns the destinations that match a category and a search query.
 * @param {Destination[]} destinations - The destinations to filter.
 * @param {DestinationCategory} category - The selected category.
 * @param {string} query - The normalized (trimmed, lower-case) search query.
 * @returns {Destination[]} The matching destinations.
 */
const filterDestinations = (
  destinations: Destination[],
  category: DestinationCategory,
  query: string
): Destination[] =>
  destinations.filter((destination: Destination) => {
    const matchesCategory =
      category === DestinationCategory.All || destination.categories.includes(category);
    const matchesQuery =
      !query ||
      destination.name.toLowerCase().includes(query) ||
      destination.country.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

/**
 * Hook containing the Explore screen's state, filtering, and navigation handlers.
 * @returns {ExploreHookReturnType} Values and handlers for the Explore screen.
 */
export default function useExplore(): ExploreHookReturnType {
  const dispatch = useAppDispatch();
  const user = useAppSelector(AuthSelectors.getUser);
  const savedIds = useAppSelector(SavedSelectors.getSavedIdSet);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>(
    DestinationCategory.All
  );

  const dateLabel = useMemo<string>(() => formatHeaderDate(), []);
  const initials = useMemo<string>(
    () => getInitials(user?.displayName ?? dummyProfile.name),
    [user?.displayName]
  );
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const popularDestinations = useMemo<Destination[]>(
    () => filterDestinations(dummyPopularDestinations, selectedCategory, normalizedQuery),
    [selectedCategory, normalizedQuery]
  );
  const weekendDestinations = useMemo<Destination[]>(
    () => filterDestinations(dummyWeekendDestinations, selectedCategory, normalizedQuery),
    [selectedCategory, normalizedQuery]
  );

  const onClearSearch = useCallback(() => setSearchQuery(''), []);

  const isFavorite = useCallback(
    (destinationId: string): boolean => savedIds.has(destinationId),
    [savedIds]
  );

  const onToggleFavorite = useCallback(
    (destination: Destination) => {
      dispatch(SavedActions.toggleSaved(destination.id));
    },
    [dispatch]
  );

  const onDestinationPress = useCallback((destination: Destination) => {
    navigateWithParam(ROUTES.Details, { destinationId: destination.id });
  }, []);

  const onAvatarPress = useCallback(() => {
    navigateWithParam(ROUTES.HomeTabs, { screen: ROUTES.Profile });
  }, []);

  return {
    dateLabel,
    initials,
    searchQuery,
    onChangeSearch: setSearchQuery,
    onClearSearch,
    selectedCategory,
    onSelectCategory: setSelectedCategory,
    popularDestinations,
    weekendDestinations,
    hasResults: popularDestinations.length > 0 || weekendDestinations.length > 0,
    isFavorite,
    onToggleFavorite,
    onDestinationPress,
    onAvatarPress
  };
}
