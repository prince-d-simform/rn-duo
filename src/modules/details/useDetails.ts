import { useRoute, type RouteProp } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { Share } from 'react-native';
import { sentryCaptureException } from '../../configs';
import { allDestinations, dummyDestinationDetails, ROUTES } from '../../constants';
import { SavedActions, SavedSelectors, useAppDispatch, useAppSelector } from '../../redux';
import { I18n } from '../../translations';
import { formatPrice, navigateBack, navigateWithParam } from '../../utils';
import type { DetailsHookReturnType } from './DetailsTypes';
import type { RootStackParamList } from '../../navigation/NavigationTypes';
import type { Destination } from '../../types';

/**
 * Finds a destination in the mock data by id.
 * @param {string} destinationId - The destination id.
 * @returns {Destination | undefined} The destination, if found.
 */
const findDestination = (destinationId: string): Destination | undefined =>
  allDestinations.find((destination: Destination) => destination.id === destinationId);

/**
 * Hook containing the Details screen's data and handlers.
 * @returns {DetailsHookReturnType} Values and handlers for the Details screen.
 */
export default function useDetails(): DetailsHookReturnType {
  const { params } = useRoute<RouteProp<RootStackParamList, ROUTES.Details>>();
  const destinationId = params?.destinationId ?? '';

  const destination = useMemo(() => findDestination(destinationId), [destinationId]);
  const details = dummyDestinationDetails[destinationId];
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(SavedSelectors.getSavedIdSet).has(destinationId);

  const location = [destination?.country, details?.region].filter(Boolean).join(' · ');
  const price = destination ? formatPrice(destination.priceFrom) : '';
  const durationLabel = details ? I18n.t('details:nights', { count: details.nights }) : '';

  const onToggleFavorite = useCallback(() => {
    dispatch(SavedActions.toggleSaved(destinationId));
  }, [dispatch, destinationId]);

  const onShare = useCallback(async () => {
    if (!destination) return;
    try {
      await Share.share({
        message: I18n.t('details:shareMessage', {
          name: destination.name,
          country: destination.country,
          description: details?.description ?? ''
        })
      });
    } catch (error) {
      sentryCaptureException(error as Error);
    }
  }, [destination, details]);

  const onPlanTrip = useCallback(() => {
    navigateWithParam(ROUTES.HomeTabs, { screen: ROUTES.Trips });
  }, []);

  return {
    destination,
    details,
    location,
    price,
    durationLabel,
    isFavorite,
    onToggleFavorite,
    onBack: navigateBack,
    onShare,
    onPlanTrip
  };
}
