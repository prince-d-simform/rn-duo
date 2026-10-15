import React, { useCallback, useMemo } from 'react';
import { FlatList, View, type ListRenderItemInfo, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { TripListItem, TripsListHeader } from './components';
import styleSheet from './TripsStyles';
import useTrips from './useTrips';
import type { TripListEntry } from './TripsTypes';

/**
 * Returns the stable key for a trip entry.
 * @param {TripListEntry} item - The trip entry.
 * @returns {string} The trip id.
 */
const keyExtractor = (item: TripListEntry): string => item.trip.id;

/**
 * The TripsScreen component.
 * Lists the user's planned trips inside a single card, with the page title as the list header.
 * @returns {React.ReactElement} A React element.
 */
const TripsScreen: React.FC = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();
  const { summary, entries, onTripPress } = useTrips();

  const topInsetStyle = useMemo<ViewStyle>(() => ({ paddingTop: insets.top }), [insets.top]);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<TripListEntry>) => (
      <TripListItem
        entry={item}
        isFirst={index === 0}
        isLast={index === entries.length - 1}
        testID={`trip-list-item-${item.trip.id}`}
        onPress={onTripPress}
      />
    ),
    [entries.length, onTripPress]
  );

  const renderSeparator = useCallback(() => <View style={styles.separator} />, [styles.separator]);

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={<TripsListHeader summary={summary} />}
        ListEmptyComponent={
          <EmptyState
            icon="map-outline"
            title={Strings.Trips.emptyTitle}
            message={Strings.Trips.emptyMessage}
            testID="trips-empty"
          />
        }
        contentContainerStyle={[styles.listContent, topInsetStyle]}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        testID="trips-list"
      />
    </View>
  );
};

export default TripsScreen;
