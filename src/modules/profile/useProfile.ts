import { useCallback, useMemo } from 'react';
import { dummyPreferences, dummyProfile, Strings } from '../../constants';
import {
  AuthActions,
  AuthSelectors,
  SavedSelectors,
  useAppDispatch,
  useAppSelector
} from '../../redux';
import { I18n } from '../../translations';
import { getInitials } from '../../utils';
import type { ProfileHookReturnType, ProfileSetting, ProfileStat } from './ProfileTypes';

/**
 * Hook containing the Profile screen's data and handlers.
 * @returns {ProfileHookReturnType} Values and handlers for the Profile screen.
 */
export default function useProfile(): ProfileHookReturnType {
  const dispatch = useAppDispatch();
  const user = useAppSelector(AuthSelectors.getUser);
  const savedCount = useAppSelector(SavedSelectors.getSavedCount);

  const name = user?.displayName ?? dummyProfile.name;

  const stats = useMemo<ProfileStat[]>(
    () => [
      {
        id: 'countries',
        value: dummyProfile.countriesVisited,
        label: I18n.t('profile:statCountries', { count: dummyProfile.countriesVisited })
      },
      {
        id: 'trips',
        value: dummyProfile.tripsTaken,
        label: I18n.t('profile:statTrips', { count: dummyProfile.tripsTaken })
      },
      { id: 'saved', value: savedCount, label: Strings.Profile.statSaved }
    ],
    [savedCount]
  );

  const settings = useMemo<ProfileSetting[]>(
    () => [
      { id: 'trip-preferences', label: Strings.Profile.tripPreferences },
      {
        id: 'notifications',
        label: Strings.Profile.notifications,
        value: dummyPreferences.notificationsEnabled ? Strings.Profile.valueOn : undefined
      },
      { id: 'currency', label: Strings.Profile.currency, value: dummyPreferences.currency },
      { id: 'units', label: Strings.Profile.units, value: dummyPreferences.distanceUnit },
      { id: 'help', label: Strings.Profile.helpAndFeedback }
    ],
    []
  );

  const onSignOut = useCallback(() => {
    dispatch(AuthActions.logout());
  }, [dispatch]);

  return {
    name,
    initials: getInitials(name),
    memberSinceLabel: I18n.t('profile:memberSince', { year: dummyProfile.memberSince }),
    stats,
    settings,
    onSignOut
  };
}
