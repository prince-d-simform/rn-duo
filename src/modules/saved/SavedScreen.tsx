import React, { useCallback, useMemo } from 'react';
import { FlatList, View, type ListRenderItemInfo, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DestinationCard, EmptyState } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { SavedListHeader } from './components';
import styleSheet from './SavedStyles';
import useSaved from './useSaved';
import type { Destination } from '../../types';

/**
 * Returns the stable key for a destination.
 * @param {Destination} item - The destination.
 * @returns {string} The destination id.
 */
const keyExtractor = (item: Destination): string => item.id;

/**
 * The SavedScreen component.
 * A two-column grid of saved destinations with collection filters in the list header.
 * @returns {React.ReactElement} A React element.
 */
const SavedScreen: React.FC = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();
  const {
    summary,
    filterOptions,
    selectedFilter,
    onSelectFilter,
    destinations,
    onToggleSaved,
    onDestinationPress
  } = useSaved();

  const topInsetStyle = useMemo<ViewStyle>(() => ({ paddingTop: insets.top }), [insets.top]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Destination>) => (
      <DestinationCard
        isFavorite
        destination={item}
        customStyle={styles.card}
        testID={`saved-card-${item.id}`}
        onPress={onDestinationPress}
        onToggleFavorite={onToggleSaved}
      />
    ),
    [styles.card, onDestinationPress, onToggleSaved]
  );

  const renderRowSeparator = useCallback(
    () => <View style={styles.rowSeparator} />,
    [styles.rowSeparator]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={destinations}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.column}
        ItemSeparatorComponent={renderRowSeparator}
        ListHeaderComponent={
          <SavedListHeader
            summary={summary}
            filterOptions={filterOptions}
            selectedFilter={selectedFilter}
            onSelectFilter={onSelectFilter}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            title={Strings.Saved.emptyTitle}
            message={Strings.Saved.emptyMessage}
            testID="saved-empty"
          />
        }
        contentContainerStyle={[styles.listContent, topInsetStyle]}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        testID="saved-list"
      />
    </View>
  );
};

export default SavedScreen;
